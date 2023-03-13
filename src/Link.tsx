import { mergeDataIntoQueryString, router, shouldIntercept } from "@inertiajs/core";
import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

type Props = any;

const noop = () => undefined;

const defaults = {
  as: "a",
  data: {},
  method: "get",
  preserveScroll: false,
  preserveState: null,
  replace: false,
  only: [],
  headers: {},
  queryStringArrayFormat: "brackets",
  onClick: noop,
  onCancelToken: noop,
  onBefore: noop,
  onStart: noop,
  onProgress: noop,
  onFinish: noop,
  onCancel: noop,
  onSuccess: noop,
  onError: noop,
};

export function Link(props: Props) {
  const merged = mergeProps(defaults, props);
  const [local, rest] = splitProps(merged, [...Object.keys(defaults), "href"]);

  const as = () => local.as.toLowerCase();
  const method = () => local.method.toLowerCase();
  const qs = () =>
    mergeDataIntoQueryString(
      method(),
      local.href || "",
      local.data,
      local.queryStringArrayFormat,
    );
  const href = () => qs()[0];
  const data = () => qs()[1];

  const visit = (event) => {
    local.onClick(event);

    if (shouldIntercept(event)) {
      event.preventDefault();

      router.visit(local.href, {
        data: data(),
        method: method(),
        preserveState: local.preserveState ?? local.method !== "get",
        replace: local.replace,
        only: local.only,
        headers: local.headers,
        onCancelToken: local.onCancelToken,
        onBefore: local.onBefore,
        onStart: local.onStart,
        onProgress: local.onProgress,
        onFinish: local.onFinish,
        onCancel: local.onCancel,
        onSuccess: local.onSuccess,
        onError: local.onError,
      });
    }
  };

  if (as() === "a" && method() !== "get") {
    console.warn(`Creating POST/PUT/PATCH/DELETE <a> links`);
  }

  return (
    <Dynamic
      component={as()}
      {...rest}
      {...(as() === "a" ? { href: href() } : {})}
      onClick={visit}
    />
  );
}
