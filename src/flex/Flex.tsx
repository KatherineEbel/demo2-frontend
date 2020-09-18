import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { HTMLSelect, InputGroup } from '@blueprintjs/core'

interface IStyledFlexProps {
  containerWidth: string
  flexDirection: string
  flexWrap: string
  itemWidth: string
}
const StyledFlex = styled.div<IStyledFlexProps>`
  .container-one {
    position: relative;
    margin: 0 auto;
    width: ${({ containerWidth }) => containerWidth};

    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection};
    border: 1px dashed #cc3300;
    flex-wrap: ${({ flexWrap }) => flexWrap};

    pre {
      overflow-x: auto;
      word-wrap: break-word;
    }
    .item {
      width: ${({ itemWidth }) => itemWidth};
      border: 2px solid #000;
    }
  }
`

const Flex: FunctionComponent = () => {
  const [flexWrap, setFlexWrap] = useState('wrap')
  const [flexDirection, setFlexDirection] = useState('row')
  const [itemWidth, setItemWidth] = useState('100px')
  const [containerWidth, setContainerWidth] = useState('600px')
  return (
    <StyledFlex
      flexDirection={flexDirection}
      containerWidth={containerWidth}
      itemWidth={itemWidth}
      flexWrap={flexWrap}
    >
      <pre>{`
    flex notes:
      flex-flow: row; main axis is horizontal cross is vertical
      flex-flow: column; main axis is vertical cross is horizontal
      
      It is a shorthand for flex-direction and flex-wrap.
      Affects Both:
        - justify-content: space-between;
        
    `}</pre>
      <div className="container-one">
        <div className="item">ONE</div>
        <div className="item">TWO</div>
        <div className="item">THREE</div>
        <div className="item">FOUR</div>
        <div className="item">FIVE</div>
      </div>
      <InputGroup
        type="text"
        placeholder={`item width ${itemWidth}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setItemWidth(e.target.value)
        }
      />
      <InputGroup
        type="text"
        placeholder={`container width ${containerWidth}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setContainerWidth(e.target.value)
        }
      />
      <HTMLSelect
        options={['row', 'row-reverse', 'column', 'column-reverse']}
        onChange={event => setFlexDirection(event.target.value)}
      />
      <HTMLSelect
        options={['wrap', 'nowrap', 'wrap-reverse']}
        onChange={event => setFlexWrap(event.target.value)}
      />
    </StyledFlex>
  )
}

export default Flex
