import type { CircuitJson } from "circuit-json"
import {
  convertCircuitJsonToAssemblySvg,
  convertCircuitJsonToPinoutSvg,
} from "circuit-to-svg"
import { enableDebug } from "lib/utils/debug"
import { useMemo, useRef, useState } from "react"
import {
  fromString,
  identity,
  toString as transformToString,
} from "transformation-matrix"
import { useMouseMatrixTransform } from "use-mouse-matrix-transform"
import { useResizeHandling } from "../hooks/use-resize-handling"

interface Props {
  circuitJson: any[]
  containerStyle?: React.CSSProperties
  defaultEditMode?: boolean
  debugGrid?: boolean
  editingEnabled?: boolean
  debug?: boolean
  showPinout?: boolean
}

export const AssemblyViewer = ({
  circuitJson,
  containerStyle,
  debugGrid = false,
  debug = false,
  showPinout = false,
}: Props) => {
  if (debug) {
    enableDebug()
  }
  const svgDivRef = useRef<HTMLDivElement>(null)

  const {
    ref: containerRef,
    cancelDrag,
    transform: svgToScreenProjection,
  } = useMouseMatrixTransform({
    onSetTransform(transform) {
      if (!svgDivRef.current) return
      svgDivRef.current.style.transform = transformToString(transform)
    },
  })

  const { containerWidth, containerHeight } = useResizeHandling(containerRef)
  const svgString = useMemo(() => {
    if (!containerWidth || !containerHeight) return ""

    const convertCircuitJsonToSvg = showPinout
      ? convertCircuitJsonToPinoutSvg
      : convertCircuitJsonToAssemblySvg

    return convertCircuitJsonToSvg(circuitJson as any, {
      width: containerWidth,
      height: containerHeight || 720,
    })
  }, [circuitJson, containerWidth, containerHeight, showPinout])

  const realToSvgProjection = useMemo(() => {
    if (!svgString) return identity()
    const transformString = svgString.match(
      /data-real-to-screen-transform="([^"]+)"/,
    )?.[1]!

    try {
      return fromString(transformString)
    } catch (e) {
      console.error(e)
      return identity()
    }
  }, [svgString])

  const svgDiv = useMemo(
    () => (
      <div
        ref={svgDivRef}
        style={{
          pointerEvents: "auto",
          transformOrigin: "0 0",
        }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    ),
    [svgString],
  )

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        minHeight: "300px",
        ...containerStyle,
      }}
    >
      {svgDiv}
    </div>
  )
}
