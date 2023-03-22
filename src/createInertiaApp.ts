import { setupProgress } from "@inertiajs/core";
import { App } from "./App";
import type { InertiaAppOptions } from "./types";

export async function createInertiaApp({
  id = "app",
  resolveComponent,
  setup,
  progress = {},
}: InertiaAppOptions): Promise<void> {
  const el = document.getElementById(id)!;
  const initialPage = JSON.parse(el?.dataset.page ?? "null");

  if (!initialPage) throw new Error("Inertia initialPage was not found");

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
