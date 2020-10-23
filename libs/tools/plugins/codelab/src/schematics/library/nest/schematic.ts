import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics'
import {
  ProjectType,
  names,
  offsetFromRoot,
  projectRootDir,
  toFileName,
} from '@nrwl/workspace'
import { NestSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Library

interface NormalizedSchema extends NestSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
}

const normalizeOptions = (options: NestSchematicSchema): NormalizedSchema => {
  const name = toFileName(options.name)
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

/**
 * We use `.eslintrc.js` instead of `.eslintrc`, so need to remove generated files
 */
const removeFiles = (options: NormalizedSchema): Rule => {
  const { projectRoot } = options
  const filesToRemove = ['.eslintrc.json', `${projectRoot}/.eslintrc.json`]

  return (tree: Tree, context: SchematicContext) => {
    filesToRemove.forEach((file: any) => {
      tree.delete(file)
    })
  }
}

const addFiles = (options: NormalizedSchema): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    return mergeWith(
      apply(url(`./files`), [
        applyTemplates({
          ...options,
          ...names(options.name),
          offsetFromRoot: offsetFromRoot(options.projectRoot),
        }),
        move(options.projectRoot),
      ]),
      MergeStrategy.Overwrite,
    )
  }
}

export const createNestjsLibrary = (options: NormalizedSchema): Rule => {
  return (_: Tree, context: SchematicContext) => {
    return externalSchematic('@nrwl/nest', 'library', {
      name: options.name,
      directory: options.directory,
    })
  }
}

export default function (options: NestSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options)

  return chain([
    createNestjsLibrary(normalizedOptions),
    addFiles(normalizedOptions),
    removeFiles(normalizedOptions),
  ])
}