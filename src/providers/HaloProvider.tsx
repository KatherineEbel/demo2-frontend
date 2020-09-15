import React, { createContext, useEffect, useState } from 'react'
import { Props } from '../types'

type HaloContextType = {
  zoom: number
  setZoom: (number) => void
  currentZoom: number
  setCurrentZoom: (value: number) => void
  count: number
  setCount: (number) => void
  cells: any[]
  setCells: (cells: any[]) => void
  index: number
  setIndex: (idx: number) => void
  angleCSS: string
  setAngleCSS: (css: string) => void
  zoomCSS: string
  setZoomCSS: (css: string) => void
  useArraySlice: boolean
  setUseArraySlice: (value: boolean) => void
  radius: number
  setRadius: (value: number) => void
  theta: number
  setTheta: (value: number) => void
  performRotation: (direction: 1 | -1) => void
}

export const HaloContext = createContext<HaloContextType>(null)

const HaloProvider = ({ children }: Props) => {
  const [count, setCount] = useState<number>(6)
  const [cells, setCells] = useState<any[]>([])
  const [index, setIndex] = useState<number>(0)
  const [microIndex, setMicroIndex] = useState(0)
  const [zoom, setZoom] = useState<number>(0)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [angleCSS, setAngleCSS] = useState<string>('rotateY(0deg)')
  const [zoomCSS, setZoomCSS] = useState<string>('translateZ(0px)')
  const [useArraySlice, setUseArraySlice] = useState<boolean>(false)
  const [radius, setRadius] = useState<any>(null)
  const [theta, setTheta] = useState<any>(0)

  useEffect(() => {
    const angle = theta * index * -1
    setAngleCSS(`rotateY(${angle}deg)`)
  }, [index])

  useEffect(() => {
    const _theta = 360 / count
    setTheta(_theta)
    const _currentZoom = 200 // normally window.innerWidth
    const r = Math.round(_currentZoom / 2 / Math.tan(Math.PI / count))
    setRadius(r)
    const newCells = []
    for (let i = 0; i < count; i++) {
      let cellAngle = _theta * i
      newCells[i] = `rotateY(${cellAngle}deg) translateZ(${r}px)`
    }
    console.log(newCells)
    setCells(newCells)
    setCurrentZoom(-r)
    setZoomCSS(`translateZ(${-r}px)`)
  }, [count])

  function rotate<T extends any[]>(array: T, reverse = false): T {
    if (reverse) array.unshift(array.pop())
    else array.push(array.shift())
    return array
  }

  const performRotation = (direction: 1 | -1) => {
    if (useArraySlice) {
      let cellCpy = [...cells]
      if (direction === -1) {
        // left
        microIndex + 1 === 9 ? setMicroIndex(0) : setMicroIndex(microIndex + 1)
        cellCpy = rotate(cellCpy, true)
      }
      if (direction === 1) {
        microIndex - 1 === -1 ? setMicroIndex(8) : setMicroIndex(microIndex - 1)
        cellCpy = rotate(cellCpy)
      }
      setCells(cellCpy)
    } else {
      setIndex(index + direction)
    }
  }

  return (
    <HaloContext.Provider
      value={{
        count,
        setCount,
        cells,
        setCells,
        index,
        setIndex,
        zoom,
        setZoom,
        currentZoom,
        setCurrentZoom,
        angleCSS,
        setAngleCSS,
        zoomCSS,
        setZoomCSS,
        useArraySlice,
        setUseArraySlice,
        radius,
        setRadius,
        theta,
        setTheta,
        performRotation
      }}
    >
      {children}
    </HaloContext.Provider>
  )
}

export default HaloProvider
