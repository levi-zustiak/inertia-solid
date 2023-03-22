import { Page, PageProps } from "@inertiajs/core";
import { Component, JSXElement } from "solid-js";

export type Key = number | string | null;
type ComponentResolver = (name: string) => Promise<Component>;
export type InertiaComponent<P extends PageProps = PageProps> = Component<P> & { layout?: (page: JSXElement) => JSXElement; };

export interface AppProps {
  initialPage: Page;
  initialComponent: InertiaComponent;
  resolveComponent: ComponentResolver;
}

export interface SetupOptions {
  el: HTMLElement;
  App: Component<AppProps>;
  props: {
    initialPage: Page;
    initialComponent: InertiaComponent;
    resolveComponent: ComponentResolver;
  };
};

export interface InertiaAppOptions {
  resolveComponent: ComponentResolver;
  setup: (options: SetupOptions) => void;
  id?: string;
  title?: (title: string) => string;
  progress?:
    | false
    | {
        delay?: number;
        color?: string;
        includeCSS?: boolean;
        showSpinner?: boolean;
    };
}
