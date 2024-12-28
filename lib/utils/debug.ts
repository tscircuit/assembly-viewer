import Debug from "debug"

export const debug = Debug("assembly-viewer")

export const enableDebug = () => {
  Debug.enable("assembly-viewer*")
}

export default debug
