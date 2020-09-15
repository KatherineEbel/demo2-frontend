import styled from 'styled-components'
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from 'react'
import { Button, InputGroup, Switch } from '@blueprintjs/core'
import HaloScene from './HaloScene'
import { HaloContext } from '../../providers/HaloProvider'

const StyledHalo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-right: 2rem;
  .inputs {
    display: flex;
    width: 50%;
    align-self: center;
    flex-grow: 0;
  }

  .halo {
    position: relative;
    overflow: hidden;
    min-height: 30rem;
  }

  .bp3-input-group:last-of-type {
    margin-left: 1rem;
    margin-right: 1rem;
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
  } = useContext(HaloContext)

  const [z, setZ] = useState(zoom)
  const [c, setC] = useState(count)
  const [cValid, setCValid] = useState(true)
  const [zValid, setZValid] = useState(true)

  useEffect(() => {
    setCValid(c >= 0 && c <= 37)
    setZValid(z >= 0 && z <= 500)
  }, [c, z])

  const setHaloCount = () => {
    cValid && setCount(c)
  }

  const setHaloZoom = () => {
    console.log('Setting halo zoom: ', z)
    zValid && setZoom(z)
  }

  return (
    <StyledHalo>
      <div className="inputs">
        <InputGroup
          name="count"
          type="number"
          placeholder={`Halo Count ${count}`}
          onChange={e => setC(+e.target.value)}
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
          onChange={e => setZ(+e.target.value)}
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
      <div className="halo">
        <HaloScene />
      </div>
    </StyledHalo>
  )
}

export default Halo
