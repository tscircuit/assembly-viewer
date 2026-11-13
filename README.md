# @tscircuit/assembly-viewer

React component for viewing [Circuit JSON](https://github.com/tscircuit/circuit-json) or tscircuit as an assembly or pinout diagram.

## Assembly View

```tsx
import { AssemblyViewer } from "@tscircuit/assembly-viewer"

export default () => (
  <AssemblyViewer
    circuitJson={renderToCircuitJson(
      <board width="10mm" height="10mm">
        <resistor name="R1" resistance={1000} schX={-2} />
        <capacitor name="C1" capacitance="1uF" schX={2} />
        <trace from=".R1 .pin2" to=".C1 .pin1" />
      </board>
    )}
  />
)
```

## Pinout View (`showPinout`)

Pass `showPinout` to `<AssemblyViewer />` to render a board pinout diagram instead of the assembly diagram:

```tsx
import { AssemblyViewer } from "@tscircuit/assembly-viewer"

export default () => (
  <AssemblyViewer
    showPinout
    circuitJson={renderToCircuitJson(
      <board width="14mm" height="14mm">
        <chip
          name="U1"
          footprint="soic8"
          pinLabels={{
            pin1: ["VCC"],
            pin2: ["SDA"],
            pin3: ["SCL"],
            pin4: ["GND"],
          }}
          pcbPinLabels={{
            pin1: "VCC",
            pin2: "SDA",
            pin3: "SCL",
            pin4: "GND",
          }}
        />
      </board>
    )}
  />
)
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `circuitJson` | `AnyCircuitElement[]` | required | The Circuit JSON array to render |
| `showPinout` | `boolean` | `false` | When `true`, renders the pinout diagram instead of the assembly view |
| `containerStyle` | `React.CSSProperties` | `undefined` | Custom CSS styles applied to the outer container |
| `defaultEditMode` | `boolean` | `false` | Start the viewer in edit mode |
| `editingEnabled` | `boolean` | `false` | Enable interactive editing controls |
| `debugGrid` | `boolean` | `false` | Show debug coordinate grid |
| `debug` | `boolean` | `false` | Enable debug logging |

## References

- This repo is heavily based on the [schematic-viewer](https://github.com/tscircuit/schematic-viewer) repo, if you're trying to add functionality you may
  want to reference that repo which is a bit more advanced
