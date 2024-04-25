import cssText from "data-text:~/styles/pukiwiki.scss"
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoGetStyle,
  PlasmoRender
} from "plasmo"
import type { FC } from "react"
import React from "react"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
  // https://docs.plasmo.com/framework/env#in-content-scripts-config
  matches: ["$PLASMO_PUBLIC_SITE_URL"]
}

// export const getStyle: PlasmoGetStyle = () => {
//   const style = document.createElement("style")
//   console.log(cssText)
//   // style.textContent = cssText
//   style.textContent = `
//     body {
//       background-color: yellow;
//     }
//   `
//   return style
// }

window.addEventListener("load", () => {
  console.log("LOADING")
  const style = document.createElement("style")
  style.textContent = cssText
  document.head.appendChild(style)
})

export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainerParent = document.querySelector(`[href="/docs"]`)
      if (rootContainerParent) {
        clearInterval(checkInterval)
        const rootContainer = document.createElement("div")
        rootContainerParent.appendChild(rootContainer)
        resolve(rootContainer)
      }
    }, 137)
  })

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  return (
    <span
      style={{
        borderRadius: 4,
        background: "yellow",
        padding: 4,
        position: "absolute",
        top: 0,
        left: 0,
        transform: "translateY(-24px) translateX(42px)"
      }}>
      CSUI ROOT CONTAINER
    </span>
  )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer
}) => {
  console.log("RENDERING", process.env.PLASMO_PUBLIC_PUKIWIKI_URL)
  const rootContainer = await createRootContainer()
  const root = createRoot(rootContainer)
  root.render(<PlasmoOverlay />)
}

export default PlasmoOverlay
