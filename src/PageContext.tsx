import { Page } from "@inertiajs/core";
import { createContext, JSXElement, useContext } from "solid-js";

const PageContext = createContext<Page | undefined>(undefined);

type Props = {
  value: Page;
  children: JSXElement;
};

export function PageContextProvider(props: Props) {
  return (
    <PageContext.Provider value={props.value}>
      {props.children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const page = useContext(PageContext);

  if (!page) {
    throw new Error("usePage must be used within the Inertia PageContext");
  }

  return page;
}
