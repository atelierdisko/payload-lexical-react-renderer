import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PayloadLexicalReactRenderer,
  PayloadLexicalReactRendererContent,
  defaultElementRenderers,
} from "../..";

const content: PayloadLexicalReactRendererContent = {
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "This is a quote",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 1,
        type: "quote",
        version: 1,
      },
    ],
  },
};

describe("Testing custom quote renderers", async () => {
  render(
    <PayloadLexicalReactRenderer
      elementRenderers={{
        ...defaultElementRenderers,
        quote: (element) => (
          <div data-testid="parent" className="parentClassName">
            <blockquote className="childClassName">
              {element.children}
            </blockquote>
          </div>
        ),
      }}
      content={content}
    />
  );

  const text = await screen.queryByText("This is a quote");
  const parent = await screen.queryByTestId("parent");

  await screen.debug();

  // Post Expectations
  it("Should render the string input inside a <blockquote>", () => {
    expect(text).toBeInTheDocument();
  });
  it("Should render the parent div", () => {
    expect(parent).toBeTruthy();
  });
  it("Should assign a className to the blockquote element", () => {
    expect(text).toHaveClass("childClassName");
  });
  it("Should assign a className to the parent div", () => {
    expect(parent).toHaveClass("parentClassName");
  });
});
