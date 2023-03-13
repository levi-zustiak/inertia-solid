import { Page, PageProps } from "@inertiajs/core";
import { Component } from "solid-js";

type PageResolver = (name: string) => Promise<unknown>;

type TApp = Component<SetupOptions<PageProps>["props"]>;

export type SetupOptions<SharedProps extends PageProps> = {
  el: HTMLElement;
  App: TApp;
  props: {
    initialPage: Page<SharedProps>;
    initialComponent: any;
    resolveComponent: PageResolver;
  };
};

export type InertiaAppOptions<SharedProps extends PageProps> = {
  resolveComponent: PageResolver;
  setup: (options: SetupOptions<SharedProps>) => void;
  id?: string;
  progress?:
  | false
  | {
    delay?: number;
    color?: string;
    includeCSS?: boolean;
    showSpinner?: boolean;
  };
  title?: (title: string) => string;
};
