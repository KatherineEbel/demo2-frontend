import { Icon, ITreeNode, Tree } from '@blueprintjs/core'
import React, { Component } from 'react'

interface INavTreeState {
  nodes: ITreeNode[]
}

interface INavTreeProps {
  setRoute: (route: string) => void
  handleSelect: (value: boolean) => void
}
class NavTree extends Component<INavTreeProps, INavTreeState> {
  public state: INavTreeState = {
    nodes: null
  }
  componentDidMount() {
    const { setRoute } = this.props
    this.setState({ nodes: createTree(setRoute) })
  }

  public render() {
    const { nodes } = this.state
    return (
      <Tree
        contents={nodes}
        onNodeClick={this.handleNodeClick}
        onNodeCollapse={this.handleNodeCollapse}
        onNodeExpand={this.handleNodeExpand}
      />
    )
  }

  private handleNodeExpand = (nodeData: ITreeNode) => {
    const { nodes } = this.state
    nodeData.isExpanded = true
    this.setState({ nodes })
  }

  private handleNodeCollapse = (nodeData: ITreeNode) => {
    const { nodes } = this.state
    nodeData.isExpanded = false
    this.setState({ nodes })
  }

  private handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const { nodes } = this.state
    const originallySelected = nodeData.isSelected
    if (!e.shiftKey) {
      nodes.forEach(n => (n.isSelected = false))
    }
    nodeData.isSelected =
      originallySelected === null ? true : !originallySelected
    this.setState({ nodes })
    this.props.handleSelect(false)
  }
}

const createTree = (handleRoute: (route: string) => void): ITreeNode[] => [
  {
    id: 0,
    hasCaret: false,
    label: <Icon onClick={() => handleRoute('/')} icon="home" />
  },
  {
    id: 1,
    hasCaret: true,
    label: 'React',
    childNodes: [
      {
        id: 1,
        label: <div onClick={() => handleRoute('/halo')}>React</div>
      },
      {
        id: 2,
        label: <div onClick={() => handleRoute('/filepond')}>File Pond</div>
      },
      {
        id: 3,
        label: (
          <div onClick={() => handleRoute('/admin-panel')}>Admin Panel</div>
        )
      }
    ]
  },
  {
    id: 2,
    hasCaret: true,
    label: 'CSS',
    childNodes: [
      {
        id: 1,
        label: <div onClick={() => handleRoute('/flex')}>React</div>
      }
    ]
  },
  {
    id: 3,
    hasCaret: true,
    label: 'Auth'
  },
  {
    id: 4,
    hasCaret: true,
    label: 'OS'
  },
  {
    id: 5,
    hasCaret: true,
    label: 'Network'
  },
  {
    id: 6,
    hasCaret: true,
    label: 'Defensive'
  },
  {
    id: 7,
    hasCaret: true,
    label: 'Offensive'
  },
  {
    id: 8,
    hasCaret: true,
    label: 'Microservices'
  },
  {
    id: 9,
    hasCaret: true,
    label: 'Go Concurrency'
  }
]

export default NavTree
