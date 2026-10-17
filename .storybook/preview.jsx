import { createRenderer, Config, loadFonts } from "@solidtv/solid";
import { Inspector } from "@solidtv/renderer/inspector";
import fonts from "../src/fonts";
import { useFocusManager } from "@solidtv/solid/primitives";
import { createSignal, Show } from "solid-js";
import {
  Rounded,
  RoundedWithBorder,
  RoundedWithShadow,
  RoundedWithBorderAndShadow,
  RadialGradient,
  LinearGradient,
  HolePunch,
} from "@solidtv/renderer/shaders";

Config.rendererOptions = {
  appWidth: 1920,
  appHeight: 1080,
  deviceLogicalPixelRatio: 2 / 3,
  inspector: Inspector,
  devicePhysicalPixelRatio: 1,
};

Config.fontSettings.fontFamily = "Roboto";

let startRenderer = true;
const solidRoot = document.createElement("div");
let toRender, setToRender;

const preview = {
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "dark" },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: "360px",
      },
      source: {
        type: "code",
        language: "jsx",
      },
    },
  },
  decorators: [
    (Story, _context) => {
      if (setToRender) {
        setToRender(Story);
      }

      if (startRenderer) {
        startRenderer = false;
        const { render, renderer } = createRenderer(undefined, solidRoot);
        renderer.registerShaderType("rounded", Rounded);
        renderer.registerShaderType("roundedWithBorder", RoundedWithBorder);
        renderer.registerShaderType("roundedWithShadow", RoundedWithShadow);
        renderer.registerShaderType("roundedWithBorderWithShadow", RoundedWithBorderAndShadow);
        renderer.registerShaderType("radialGradient", RadialGradient);
        renderer.registerShaderType("linearGradient", LinearGradient);
        renderer.registerShaderType("holePunch", HolePunch);
        loadFonts(fonts);

        render(() => {
          useFocusManager();
          [toRender, setToRender] = createSignal(Story);
          return (
            <Show when={toRender()}>
              {
                <view x={20} y={20}>
                  {toRender()}
                </view>
              }
            </Show>
          );
        });
      }

      return solidRoot;
    },
  ],
};

export default preview;
