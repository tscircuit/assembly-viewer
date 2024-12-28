# @tscircuit/assembly-viewer

React component for viewing [Circuit JSON](https://github.com/tscircuit/circuit-json) or tscircuit as a assembly diagram

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

## References

- This repo is heavily based on the [schematic-viewer](https://github.com/tscircuit/schematic-viewer) repo, if you're trying to add functionality you may
  want to reference that repo which is a bit more advanced
