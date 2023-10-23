import {
  PayloadLexicalReactRenderer,
  PayloadLexicalReactRendererContent,
} from ".";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

const content: PayloadLexicalReactRendererContent = {
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text: "Lorem ipsum",
        type: "text",
        version: 1,
      },
    ],
    direction: "ltr",
  },
};

describe("Simple working test", () => {
  it("Should render the page correctly", async () => {
    await render(<PayloadLexicalReactRenderer content={content} />);

    const text = await screen.queryByText("Lorem ipsum");

    // Post Expectations
    expect(text).toBeInTheDocument();
  });
});
