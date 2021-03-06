import { buttonDelete } from './Table-button--delete'
import { buttonEdit } from './Table-button--edit'
import { TagChildren } from './Table-tag--children'
import { TagParent } from './Table-tag--parent'
import { Renderer } from '@codelab/alpha/core/renderer'
import {
  NodeReactI,
  NodeType,
  nodeTypeLiterals,
} from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

const propsTable: NodeReactI = {
  type: NodeType.React_Table,
  props: {
    showHeader: false,
    pagination: false,
    locale: { emptyText: ' ' },
    dataSource: {
      __type: [PropType.Eval],
      value: 'return this.record.props',
    },
    columns: [
      { title: 'Key', dataIndex: 'key', key: 'key', width: '50%' },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: '50%',
      },
    ],
  },
}

const filters = nodeTypeLiterals.map((type) => {
  return { text: type, value: type }
})

const onTypeFilter = (value: any, record: any) => record.type === value

export const tableData: NodeReactI = {
  type: NodeType.React_Table,
  props: {
    // handleEdit: {
    //   __type: [PropType.Eval],
    //   value: 'return this.handleedit',
    // },
    // handleDelete: {
    //   __type: [PropType.Eval],
    //   value: 'return this.handledelete',
    // },
    // selectNode: { __type: [PropType.Eval], value: 'return this.selectnode' },
    dataSource: {
      __type: [PropType.Eval],
      value: 'return this.data',
    },
    columns: [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters,
        onFilter: onTypeFilter,
      },
      {
        title: 'Props',
        dataIndex: 'props',
        key: 'props',
        render: propsTable,
      },
      {
        title: 'Parent',
        dataIndex: 'parent',
        key: 'parent',
        render: TagParent,
      },
      {
        title: 'Children',
        dataIndex: 'children',
        key: 'children',
        render: TagChildren,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: {
          type: 'React.Space',
          children: [buttonEdit, buttonDelete],
        },
      },
    ],
  },
}

export type TableProps = {
  data: any
  selectnode: Function
  handleedit: Function
  handledelete: Function
}

export const Table = Renderer.components<TableProps>(tableData)
