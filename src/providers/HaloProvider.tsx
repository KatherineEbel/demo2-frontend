import React, { createContext, useState } from 'react'
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
}

export const HaloContext = createContext<HaloContextType>(null)

const HaloProvider = ({ children }: Props) => {
  const [count, setCount] = useState<number>(0)
  const [cells, setCells] = useState<any[]>([])
  const [index, setIndex] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(0)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [angleCSS, setAngleCSS] = useState<string>('rotateY(0deg)')
  const [zoomCSS, setZoomCSS] = useState<string>('translateZ(0)')
  const [useArraySlice, setUseArraySlice] = useState<boolean>(false)
  const [radius, setRadius] = useState<any>(null)
  const [theta, setTheta] = useState<any>(null)
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
        setTheta
      }}
    >
      {children}
    </HaloContext.Provider>
  )
}

export default HaloProvider
