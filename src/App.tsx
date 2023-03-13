import { createHeadManager, PageProps, router } from "@inertiajs/core";
import {
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  Show,
} from "solid-js";
import { HeadContextProvider } from "./HeadContext";
import { PageContextProvider } from "./PageContext";
import { SetupOptions } from "./types";

export function App(props: SetupOptions<PageProps>["props"]) {
  const [inertiaCtx, setInertiaCtx] = createSignal({
    component: props.initialComponent || null,
    page: props.initialPage,
    key: null,
  });

  const headManager = createMemo(() =>
    createHeadManager(
      typeof window === "undefined",
      (title) => title,
      () => { },
    ),
  );

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

  const renderChildren = ({ Component, props, key }) => {
    const child = createComponent(Component, { key, ...props });

    if (typeof Component.layout === "function") {
      return Component.layout(child);
    }

    if (Array.isArray(Component.layout)) {
      return Component.layout
        .concat(child)
        .reverse()
        .reduce((children, Layout) =>
          createComponent(Layout, { children, ...props }),
        );
    }

    return child;
  };

  return (
    <HeadContextProvider value={headManager}>
      <PageContextProvider value={inertiaCtx().page}>
        <Show when={!!inertiaCtx().component}>
          {renderChildren({
            Component: inertiaCtx().component,
            key: inertiaCtx().key,
            props: inertiaCtx().page.props,
          })}
        </Show>
      </PageContextProvider>
    </HeadContextProvider>
  );
}
