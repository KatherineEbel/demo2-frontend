import styled from 'styled-components'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Button, InputGroup, Switch } from '@blueprintjs/core'
import HaloScene from './HaloScene'
import { useHalo } from '../../providers/HaloProvider'

const StyledHalo = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-gap: 2px;
  .left {
    display: flex;
    flex-direction: column;
  }

  .right {
    position: relative;
    overflow: hidden;
    min-height: 30rem;
  }

  .bp3-input-group:last-of-type {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const Halo: FunctionComponent = () => {
  const {
    zoom,
    setZoom,
    count,
    setCount,
    useArraySlice,
    setUseArraySlice
  } = useHalo()

  const [z, setZ] = useState(zoom)
  const [c, setC] = useState(count)
  const [cValid, setCValid] = useState(true)
  const [zValid, setZValid] = useState(true)

  useEffect(() => {
    debugger
    setCValid(String(c).match(/[0-9]+/) !== null && c >= 0 && c <= 37)
    setZValid(String(z).match(/[0-9]+/) !== null && z >= 0 && z <= 500)
  }, [c, z])

  const setHaloCount = () => {
    cValid && setCount(c)
  }

  const setHaloZoom = () => {
    zValid && setZoom(c)
  }

  return (
    <StyledHalo>
      <div className="left">
        <InputGroup
          name="count"
          type="number"
          placeholder={`Halo Count ${count}`}
          onChange={e => setC(e.target.value)}
          rightElement={
            <Button
              disabled={!cValid}
              icon="confirm"
              type="button"
              intent={cValid ? 'success' : 'danger'}
              onClick={setHaloCount}
            />
          }
        />
        <InputGroup
          name="zoom"
          type="number"
          placeholder={`Applied Zoom ${zoom}`}
          onChange={e => setZ(e.target.value)}
          rightElement={
            <Button
              disabled={!zValid}
              icon="confirm"
              type="button"
              intent={zValid ? 'success' : 'danger'}
              onClick={setHaloZoom}
            />
          }
        />
        <Switch
          label="Use Array Slice"
          large
          checked={useArraySlice}
          onChange={() => setUseArraySlice(!useArraySlice)}
        />
      </div>
      <div className="right">
        <HaloScene />
      </div>
    </StyledHalo>
  )
}

export default Halo
