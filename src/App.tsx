import { router } from "@inertiajs/core";
import { createComponent, createEffect, Show } from "solid-js";
import { inertiaCtx, setInertiaCtx } from "./InertiaContext";
import { AppProps } from "./types";

export function App(props: AppProps) {
  setInertiaCtx({
    component: props.initialComponent,
    page: props.initialPage,
    key: null,
  });

  const swapComponent = async ({ component, page, preserveState }) => {
    setInertiaCtx((prev) => ({
      component,
      page,
      key: preserveState ? prev.key : Date.now(),
    }));
  };

  createEffect(() => {
    router.init({
      initialPage: props.initialPage,
      resolveComponent: props.resolveComponent,
      swapComponent,
    });
  });

  const renderPage = ({ Component, props, key }) => {
    const page = createComponent(Component, { key, ...props });

    if (typeof Component.layout === "function") {
      return Component.layout(page);
    }

    if (Array.isArray(Component.layout)) {
      return Component.layout
        .concat(page)
        .reverse()
        .reduce((children, Layout) =>
          createComponent(Layout, { children, ...props }),
        );
    }

    return page;
  };

  return (
    <Show when={!!inertiaCtx().component}>
      {renderPage({
        Component: inertiaCtx().component,
        key: inertiaCtx().key,
        props: inertiaCtx().page.props,
      })}
    </Show>
  );
}
