import { setupProgress } from "@inertiajs/core";
import { App } from "./App";
import type { InertiaAppOptions } from "./types";

export async function createInertiaApp({
  id = "app",
  resolve,
  setup,
  progress = {},
}: InertiaAppOptions): Promise<void> {
  const el = document.getElementById(id)!;
  const initialPage = JSON.parse(el?.dataset.page ?? "null");

  if (!initialPage) throw new Error("Inertia initialPage was not found");

  const resolveComponent = (name) => Promise.resolve(resolve(name)).then((module: any) => module.default || module);

  const initialComponent = await resolveComponent(initialPage.component);

  setup({
    el,
    App,
    props: {
      initialPage,
      initialComponent,
      resolveComponent,
    },
  });

  if (progress) {
    setupProgress(progress);
  }
}
