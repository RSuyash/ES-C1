import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import App from "./App";

test("Wagholi app renders the shared thank-you route", () => {
  const markup = renderToStaticMarkup(<App initialPath="/thank-you" />);

  assert.match(markup, /Thank You/i);
  assert.match(markup, /Back to Wagholi Highstreet/i);
  assert.doesNotMatch(markup, /Give Your Business a/i);
});
