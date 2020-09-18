import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { FormGroup, HTMLSelect, NumericInput } from '@blueprintjs/core'

type StyledAnimationType = {
  target: string
  operation: string
  timingFunction: string
  duration: string
  amount: string
  transformOrigin: string
}

const StyledAnimations = styled.div<StyledAnimationType>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .animations-group {
    border: 1px solid #000;
    padding: 1rem;
    border-radius: 2px;
    &:not(:first-child) {
      margin-top: 1rem;
    }

    .actions {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        justify-content: space-between;
        .bp3-form-group:first-of-type {
          margin-right: 1rem;
        }
      }
    }
  }

  .animation {
    width: 100px;
    height: 100px;
    text-align: center;
    align-self: center;
    line-height: 6rem;
    border: 1px solid #05050f;
    border-right: 0.2rem;
    font-weight: bold;
    color: #fff;
    background: #1A80BF;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: ${({ duration }) => `all ${duration}`};
    transition-timing-function: ${({ timingFunction }) => timingFunction};
    &.scale:hover {
      ${({ target, amount }) =>
        target === 'x & y' &&
        `
            transform: scale(${amount}, ${amount});
      `}
      ${({ target, amount }) =>
        target === 'x only' &&
        `
            transform: scaleX(${amount});
      `}
      ${({ target, amount }) =>
        target === 'y only' &&
        `
            transform: scaleY(${amount});
      `}
    }
    &.translate:hover {
      ${({ target, amount }) =>
        target === 'x & y' &&
        `
            transform: translate(${amount}px, ${amount}px);
      `}
      ${({ target, amount }) =>
        target === 'x only' &&
        `
            transform: translateX(${amount}px);
      `}
      ${({ target, amount }) =>
        target === 'y only' &&
        `
            transform: translateY(${amount}px);
      `}
    }
    &.rotate {
      transform-origin: ${({ transformOrigin }) => transformOrigin};
      &:hover {
        transform: rotate(${({ amount }) => amount}deg);
      }
    }
    &.skew:hover {
      ${({ target, amount }) =>
        target === 'x & y' &&
        `
        transform: skew(${amount}deg, ${amount}deg);
      `}
    }
  }
`
const Animations = () => {
  const [target, setTarget] = useState('x & y')
  const [operation, setOperation] = useState('scale')
  const [timingFunction, setTimingFunction] = useState('ease')
  const [duration, setDuration] = useState('1s')
  const [amount, setAmount] = useState('.5')
  const [transformOrigin, setTransformOrigin] = useState('center')
  return (
    <StyledAnimations
      target={target}
      operation={operation}
      timingFunction={timingFunction}
      duration={duration}
      amount={amount}
      transformOrigin={transformOrigin}
    >
      <div className={`animation ${operation}`}>
        <span>Animate Me</span>
      </div>
      <div className="animations-group">
        <div className="actions">
          <div>
            <FormGroup label="Operation" labelFor="operation">
              <HTMLSelect
                name="operation"
                value={operation}
                onChange={e => setOperation(e.target.value)}
                options={['scale', 'translate', 'rotate', 'skew']}
              />
            </FormGroup>
            <FormGroup label="Target" labelFor="target">
              <HTMLSelect
                name="target"
                value={target}
                onChange={e => setTarget(e.target.value)}
                options={['x & y', 'x only', 'y only']}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              style={{ marginRight: '1rem' }}
              label="Duration"
              labelFor="duration"
            >
              <NumericInput
                allowNumericCharactersOnly
                stepSize={0.5}
                minorStepSize={0.1}
                placeholder={duration}
                onValueChange={(num, str) => {
                  console.log('num', num, 'str', str)
                  setDuration(str + 's')
                }}
              />
            </FormGroup>
            <FormGroup label="Amount" labelFor="amount">
              <NumericInput
                name="amount"
                stepSize={0.5}
                minorStepSize={0.1}
                allowNumericCharactersOnly
                placeholder={amount}
                onValueChange={(num, str) => {
                  console.log('num', num, 'str', str)
                  setAmount(str)
                }}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup label="Timing Function" labelFor="timingFunction">
              <HTMLSelect
                name="timingFunction"
                value={timingFunction}
                onChange={e => setTimingFunction(e.target.value)}
                options={['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out']}
              />
            </FormGroup>
            <FormGroup label="Transform origin (% % or px px)" labelFor="origin">
              <HTMLSelect
                name="origin"
                value={transformOrigin}
                onChange={e => setTransformOrigin(e.target.value)}
                options={[
                  'center',
                  'top',
                  'right',
                  'bottom',
                  'left',
                  'top left',
                  'top right',
                  'bottom left',
                  'bottom right',
                  '25px 25px',
                  '25% 25%',
                  '25px 30%'
                ]}
              />
            </FormGroup>
          </div>
        </div>
>

      </div>
    </StyledAnimations>
  )
}

export default Animations
