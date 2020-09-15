import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonGroup,
  getKeyCombo,
  Hotkey,
  Hotkeys,
  HotkeysTarget,
  IKeyCombo,
  InputGroup,
  Intent,
  KeyCombo
} from '@blueprintjs/core'
import { HaloContext } from '../providers/HaloProvider'

const StyledCommandInterpreter = styled.div`
  width: 100vw;
  border: 1px dashed #ccc;
  border-radius: 2px;
  min-height: 1.5rem;
  max-height: 3rem;
  display: flex;
  flex-direction: row;
  padding: 5px;
  justify-content: space-between;
  align-items: center;

  .bp3-input-group {
    margin-right: 10px;
    width: 80%;
  }
`

interface ICommandInterpreterState {
  combo: IKeyCombo
}

@HotkeysTarget
export class CommandInterpreter extends React.Component<
  any,
  ICommandInterpreterState
> {
  public state: ICommandInterpreterState = {
    combo: null
  }
  static contextType = HaloContext
  declare context: React.ContextType<typeof HaloContext>

  public render() {
    return (
      <StyledCommandInterpreter>
        <InputGroup leftIcon="code" placeholder="Enter a command..." />
        {this.renderKeyCombo()}
        <ButtonGroup>
          <Button icon="key-shift" intent={this.getIntent('shift')} />
          <Button icon="arrow-left" intent={this.getIntent('left')} />
          <Button icon="arrow-right" intent={this.getIntent('right')} />
          <Button icon="key-enter" intent={this.getIntent('enter')} />
        </ButtonGroup>
      </StyledCommandInterpreter>
    )
  }

  private getIntent = (key: string): Intent => {
    const { combo } = this.state
    if (combo === null) return 'none'
    if (key === 'shift') {
      return combo.modifiers === 8 ? 'primary' : 'none'
    }
    return combo.key === key ? 'primary' : 'none'
  }
  public renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="left"
          label="Left"
          onKeyDown={this.handleKeyDown}
        />
        <Hotkey
          global={true}
          combo="right"
          label="Right"
          onKeyUp={this.handleKeyDown}
        />
        <Hotkey
          global={true}
          combo="enter"
          label="Enter"
          onKeyDown={this.handleKeyDown}
        />
        <Hotkey
          global={true}
          combo="shift + right"
          label="Shift Right"
          onKeyDown={this.handleKeyDown}
        />
        <Hotkey
          global={true}
          combo="shift + left"
          label="Shift Left"
          onKeyDown={this.handleKeyDown}
        />
        <Hotkey
          global={true}
          combo="shift"
          label="Shift"
          onKeyDown={this.handleKeyDown}
        />
      </Hotkeys>
    )
  }

  private processCombo = (combo: IKeyCombo) => {
    const {
      currentZoom,
      zoom,
      setZoomCSS,
      zoomCSS,
      performRotation
    } = this.context
    const { key, modifiers } = combo
    let newZoomVal: number
    if (modifiers) {
      if (modifiers && !key) {
        newZoomVal = currentZoom + zoom
        setZoomCSS(`translateZ(${newZoomVal}px)`)
        console.log('Zoom CSS', zoomCSS)
      }
      key === 'right' && performRotation(1)
      key === 'left' && performRotation(-1)
    }
  }

  private clearCombo = () => {
    setTimeout(() => {
      this.setState({ combo: null })
    }, 1000)
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const combo = getKeyCombo(e)
    this.setState({ combo })
    this.processCombo(combo)
    this.clearCombo()
  }

  private renderKeyCombo(): React.ReactNode | null {
    const { combo } = this.state
    if (combo === null) {
      return null
    } else {
      let key: string
      if (combo.modifiers) {
        key = 'shift' + (combo.key ? `+ ${combo.key}` : '')
      } else {
        key = combo.key
      }
      console.log(key)
      return <KeyCombo combo={key} />
    }
  }
}
