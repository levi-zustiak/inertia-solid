import { createContext } from "solid-js";

const PageContext = createContext(undefined);

export function PageContextProvider(props) {
  return (
    <PageContext.Provider value={props.value}>
      {props.children}
    </PageContext.Provider>
  );
}
