import { Page, PageProps } from "@inertiajs/core";
import { createSignal } from "solid-js";
import { InertiaComponent, Key } from "./types";

interface InertiaContext {
  component: InertiaComponent;
  page: Page;
  key: Key;
}

export const [inertiaCtx, setInertiaCtx] = createSignal<InertiaContext | undefined>(undefined);

export const usePage = <TPageProps extends PageProps = PageProps>(): Page<TPageProps> => {
  if (inertiaCtx() === undefined) {
    throw new Error("usePage was used outside of the InertiaContext");
  }

  return inertiaCtx()!.page as Page<TPageProps>;
}
