import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import * as requireFromString from 'require-from-string'
import { ReactSchematicSchema } from './schema'

const SCHEMATIC_NAME = 'react-lib'

describe('@codelab/schematics:react-lib', () => {
  let appTree: Tree
  const options: ReactSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync(SCHEMATIC_NAME, options, appTree)
        .toPromise(),
    ).resolves.not.toThrowError()
  })

  describe('Files removed', () => {
    it('should remove root .eslintrc generated by @nrwl/react:library', async () => {
      appTree = await testRunner
        .runSchematicAsync(SCHEMATIC_NAME, options, appTree)
        .toPromise()
      const eslintrc = appTree.exists('/.eslintrc')

      expect(eslintrc).toBeFalsy()
    })
  })

  describe('Files created in lib folder', () => {
    it('should generate config files under project folder', async () => {
      appTree = await testRunner
        .runSchematicAsync(SCHEMATIC_NAME, options, appTree)
        .toPromise()

      const file = appTree.read('/libs/test/.eslintrc.js')?.toString() ?? ''
      const eslintrcContents = requireFromString(file)
      const eslintrcJs = appTree.exists('/libs/test/.eslintrc.js')
      const tsconfigEslintJson = appTree.exists(
        '/libs/test/tsconfig.eslint.json',
      )
      const babelrc = appTree.exists('/libs/test/.babelrc')

      expect(eslintrcJs).toBeTruthy()
      expect(eslintrcContents.extends).toBe('../../.eslintrc.js')
      expect(tsconfigEslintJson).toBeTruthy()
      expect(babelrc).toBeTruthy()

      // Shouldn't generate storybook
      const storybookFolder = appTree.exists('/libs/test/.storybook')

      expect(storybookFolder).toBeFalsy()
    })

    it('should generate .storybook configs', async () => {
      appTree = await testRunner
        .runSchematicAsync(
          SCHEMATIC_NAME,
          { storybook: true, ...options },
          appTree,
        )
        .toPromise()

      const mainJs = appTree.exists('/libs/test/.storybook/main.js')
      const previewJs = appTree.exists('/libs/test/.storybook/preview.js')
      const webpackConfigJs = appTree.exists(
        '/libs/test/.storybook/webpack.config.js',
      )
      const tsconfigJson = appTree.exists('/libs/test/.storybook/tsconfig.json')

      expect(mainJs).toBeTruthy()
      expect(previewJs).toBeTruthy()
      expect(webpackConfigJs).toBeTruthy()
      expect(tsconfigJson).toBeTruthy()
    })
  })
})
