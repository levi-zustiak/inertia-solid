import { router } from "@inertiajs/core";
import {createComponent, createEffect, mergeProps, Show} from "solid-js";
import { AppProps } from "./types";
import {createStore, reconcile} from "solid-js/store";
import PageContext from "./PageContext";

function extractLayouts(component) {
  if (!component) {
    return [];
  }

  if (typeof component.layout === 'function') {
    return [component.layout];
  }

  if (Array.isArray(component.layou)) {
    return component.layout;
  }

  return [];
}

export function App(props: AppProps) {
  const [context, setContext] = createStore({
    component: props.initialComponent,
    page: props.initialPage,
    layouts: extractLayouts(props.initialComponent || null),
    key: null,
  })

  const swapComponent = async ({ component, page, preserveState }) => {
    setContext(reconcile({
      component,
      page,
      layouts: extractLayouts(props.initialComponent || null),
      key: preserveState ? context.key : Date.now(),
    }))
  };

  createEffect(() => {
    router.init({
      initialPage: props.initialPage,
      resolveComponent: props.resolveComponent,
      swapComponent,
    });
  });


  const children = (i = 0) => {
    const layout = context.layouts[i];

    if (!layout) {
      return createComponent(context.component, mergeProps(
          { key: context.key },
          () => context.page.props
      ));
    }

    return createComponent(
        layout,
        mergeProps(
            () => context.page.props,
            {
              get children() {
                return children(i + 1)
              },
            }
        ),
    )
  }

  return createComponent(PageContext.Provider, {
    get value() {
      return context.page
    },
    get children() {
      return children();
    }
  })
}