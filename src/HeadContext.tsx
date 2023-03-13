import { createContext } from "solid-js";

const HeadContext = createContext(undefined);

export function HeadContextProvider(props) {
  return (
    <HeadContext.Provider value={props.value}>
      {props.children}
    </HeadContext.Provider>
  );
}
