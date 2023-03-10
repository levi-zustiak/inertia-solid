import { createHeadManager, router } from "@inertiajs/core";
import { createMemo, createSignal } from "solid-js";
import { HeadContextProvider } from "./HeadContextProvider";
import { PageContextProvider } from "./PageContextProvider";

export function App(props) {
  const [current, setCurrent] = createSignal({
    component: props.initialComponent || null,
    page: props.initialPage,
    key: null,
  });

  const headManager = createMemo(() =>
    createHeadManager(
      typeof window === "undefined",
      props.titleCallback || ((title) => title),
      props.onHeadUpdate || (() => { }),
    ),
  );

  const swapComponent = async ({ component, page, preserveState }) => {
    setCurrent((prev) => ({
      component,
      page,
      key: preserveState ? prev.key : Date.now(),
    }));
  };

  router.init({
    initialPage: props.initialPage,
    resolveComponent: props.resolveComponent,
    swapComponent,
  });

  if (!current().component) {
    return (
      <HeadContextProvider value={headManager}>
        <PageContextProvider value={current().page}>{null}</PageContextProvider>
      </HeadContextProvider>
    );
  }

  const renderChildren =
    props.children ||
    (({ Component, props, key }) => {
      return typeof Component.layout === "function" ? (
        Component.layout(<Component key={key} {...props} />)
      ) : (
        <Component key={key} {...props} />
      );
    });

  return (
    <HeadContextProvider value={headManager}>
      <PageContextProvider value={current().page}>
        {renderChildren({
          Component: current().component,
          key: current().key,
          props: current().page.props,
        })}
      </PageContextProvider>
    </HeadContextProvider>
  );
}
