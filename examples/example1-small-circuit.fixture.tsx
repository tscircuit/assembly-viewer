import { AssemblyViewer } from "lib/components/AssemblyViewer"
import { renderToCircuitJson } from "lib/dev/render-to-circuit-json"

export default () => (
  <AssemblyViewer
    circuitJson={renderToCircuitJson(
      <board width="20mm" height="20mm">
        <resistor name="R1" resistance={1000} pcbX={-6}  footprint={"0402"} />
        <capacitor name="C1" capacitance="1uF" pcbX={3} pcbY={5}  footprint={"0402"}/>
        <capacitor
          name="C2"
          pcbRotation={90}
          capacitance="1uF"
          pcbX={0}
          pcbY={-40}
          footprint={"0402"}
        />
        <chip
          name="U1"
          pinLabels={{
            pin1: "D0",
            pin2: "D1",
            pin3: "D2",
            pin4: "GND",
            pin5: "D3",
            pin6: "EN",
            pin7: "D4",
            pin8: "VCC",
          }}
          footprint="soic8"
        />

        <trace from=".R1 .pin2" to=".C1 .pin1" />
        <trace from=".C1 .pin2" to=".U1 .pin4" />
        <trace from=".U1 .pin8" to=".C2 .pin1" />
        <trace from=".C2 .pin2" to=".R1 .pin1" />
        <trace from=".U1 .pin1" to=".U1 .pin5" />
      </board>,
    )}
    editingEnabled
    containerStyle={{ height: "100%" }}
    debugGrid
    debug
  />
)
