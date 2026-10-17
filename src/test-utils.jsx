import { createRenderer } from "@solidtv/solid";

const { render: solidRender } = createRenderer(undefined, document.createElement("div"));

export function render(Component) {
  return solidRender(() => <Component />);
}
