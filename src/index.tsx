import { createRenderer, Config as LightningConfig, loadFonts } from "@solidtv/solid";
import { Route } from "@solidjs/router";
import { useFocusManager } from "@solidtv/solid/primitives";
import { HashRouter } from "@solidtv/solid/primitives/router";
import type { RendererMain } from "@solidtv/renderer";
import App from "./pages/App";
import HelloWorld from "./pages/HelloWorld";
import TextPage from "./pages/Text";
import NotFound from "./pages/NotFound";
import fonts from "./fonts";
import { merge } from "lodash-es";
import { config } from "#devices/common";
import {
  Rounded,
  RoundedWithShadow,
  RoundedWithBorder,
  RoundedWithBorderAndShadow,
  RadialGradient,
  LinearGradient,
  HolePunch,
} from "@solidtv/renderer/shaders";

merge(LightningConfig, config.lightning);

const { render, renderer } = createRenderer();

// Shaders are WebGL-only; the DOM renderer is never enabled here.
const shaders = renderer as RendererMain;
shaders.registerShaderType("rounded", Rounded);
shaders.registerShaderType("roundedWithBorder", RoundedWithBorder);
shaders.registerShaderType("roundedWithShadow", RoundedWithShadow);
shaders.registerShaderType("roundedWithBorderWithShadow", RoundedWithBorderAndShadow);
shaders.registerShaderType("radialGradient", RadialGradient);
shaders.registerShaderType("linearGradient", LinearGradient);
shaders.registerShaderType("holePunch", HolePunch);

loadFonts(fonts);
render(() => {
  useFocusManager(config.keys);
  return (
    <HashRouter root={App}>
      <Route path="/" component={HelloWorld} />
      <Route path="/text" component={TextPage} />
      <Route path="/*all" component={NotFound} />
    </HashRouter>
  );
});
