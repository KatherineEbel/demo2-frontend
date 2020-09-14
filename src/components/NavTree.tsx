import { Button, Classes, ITreeNode, Tree } from '@blueprintjs/core'
import React, { Component } from 'react'

interface INavTreeState {
  nodes: ITreeNode[]
}

interface INavTreeProps {
  setRoute: (route: string) => void
  handleSelect: (value: boolean) => void
}
class NavTree extends Component<INavTreeProps, INavTreeState> {
  constructor(props) {
    super(props)
    const nodes = createTreeState(this.handleRoute.bind(this))
    this.state = { nodes }
  }

  public render() {
    const { nodes } = this.state
    return (
      <Tree
        contents={nodes}
        onNodeClick={this.handleNodeClick}
        onNodeCollapse={this.handleNodeCollapse}
        onNodeExpand={this.handleNodeExpand}
        className={Classes.ELEVATION_1}
      />
    )
  }

  private handleRoute = (route: string) => {
    const { setRoute } = this.props
    setRoute(route)
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

const createTreeState = (handleRoute: (route: string) => void): ITreeNode[] => [
  {
    id: 0,
    hasCaret: true,
    icon: 'folder-close',
    label: 'React',
    childNodes: [
      {
        id: 1,
        label: (
          <Button
            type="button"
            text="Halo"
            onClick={() => handleRoute('/halo')}
          />
        )
      }
    ]
  },
  {
    id: 1,
    hasCaret: true,
    icon: 'folder-close',
    label: 'CSS'
  },
  {
    id: 2,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Auth'
  },
  {
    id: 3,
    hasCaret: true,
    icon: 'folder-close',
    label: 'OS'
  },
  {
    id: 4,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Network'
  },
  {
    id: 5,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Defensive'
  },
  {
    id: 6,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Offensive'
  },
  {
    id: 7,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Microservices'
  },
  {
    id: 8,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Go Concurrency'
  }
]

export default NavTree
