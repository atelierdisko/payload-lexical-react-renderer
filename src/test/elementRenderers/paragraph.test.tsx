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
            text: "This is a paragraph",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 1,
        type: "paragraph",
        version: 1,
      },
    ],
  },
};

describe("Testing custom heading renderers", async () => {
  render(
    <PayloadLexicalReactRenderer
      elementRenderers={{
        ...defaultElementRenderers,
        paragraph: (element) => (
          <div data-testid="parent" className="parentClassName">
            <p className="childClassName">{element.children}</p>
          </div>
        ),
      }}
      content={content}
    />
  );

  const text = await screen.queryByText("This is a paragraph");
  const parent = await screen.queryByTestId("parent");

  await screen.debug();

  // Post Expectations
  it("Should display the string input", () => {
    expect(text).toBeInTheDocument();
  });
  it("Should render the parent div", () => {
    expect(parent).toBeTruthy();
  });
  it("Should assign a className to the p element", () => {
    expect(text).toHaveClass("childClassName");
  });
  it("Should assign a className to the parent div", () => {
    expect(parent).toHaveClass("parentClassName");
  });
  it("Should nest correctly", () => {
    expect(parent?.tagName).not.toBe(/span/i);
  });
});
