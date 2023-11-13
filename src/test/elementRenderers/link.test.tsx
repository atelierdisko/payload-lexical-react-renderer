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
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "External",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "link",
            version: 1,
            fields: {
              url: "https://payloadcms.com/",
              newTab: true,
              linkType: "custom",
            },
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Autolink",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "autolink",
            version: 1,
            fields: {
              linkType: "custom",
              url: "https://payloadcms.com/docs/getting-started/what-is-payload",
            },
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
  },
};

describe("Testing custom link renderers", () => {
  render(
    <PayloadLexicalReactRenderer
      content={content}
      elementRenderers={{
        ...defaultElementRenderers,
        link: (element) => (
          <a
            href={element.fields.url}
            target={element.fields.newTab ? "_blank" : "_self"}
            className="linkElement"
          >
            {element.children}
          </a>
        ),
        autolink: (element) => (
          <a
            href={element.fields.url}
            target={element.fields.newTab ? "_blank" : "_self"}
            className="autoLinkElement"
          >
            {element.children}
          </a>
        ),
      }}
    />
  );

  screen.logTestingPlaygroundURL();

  describe("Link renderer", () => {
    const link = screen.getByRole("link", { name: "External" });

    it("Should be a link with href value 'https://payloadcms.com/'", () => {
      expect(link.getAttribute("href")).toBe("https://payloadcms.com/");
    });

    it("Should have a target attribute with value '_blank'", () => {
      expect(link.getAttribute("target")).toBe("_blank");
    });

    it("Should have a className 'linkElement'", () => {
      expect(link).toHaveClass("linkElement");
    });

    it("Should render 'External' as anchor text", () => {
      expect(link).toHaveTextContent("External");
    });
  });

  describe("Autolink renderer", () => {
    const autoLink = screen.getByRole("link", { name: "Autolink" });

    it("Should render a link with href value 'https://payloadcms.com/docs/getting-started/what-is-payload'", () => {
      expect(autoLink.getAttribute("href")).toBe(
        "https://payloadcms.com/docs/getting-started/what-is-payload"
      );
    });

    it("Should have a target attribute with value '_self'", () => {
      expect(autoLink.getAttribute("target")).toBe("_self");
    });

    it("Should have a className 'autoLinkElement'", () => {
      expect(autoLink).toHaveClass("autoLinkElement");
    });

    it("Should render 'Autolink' as anchor text", () => {
      expect(autoLink).toHaveTextContent("Autolink");
    });
  });
});
