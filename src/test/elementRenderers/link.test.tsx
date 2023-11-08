import { render} from "@testing-library/react";
import { describe } from "vitest";
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
                text: "This",
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
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " is an external link, and ",
            type: "text",
            version: 1,
          },

          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "this",
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
              url: "https://",

              doc: {
                value: {
                  id: "652808c5ce40f919f2cdadd1",
                  firstName: "First",
                  lastName: "Person",
                  slug: "first-person",
                  position: "CEO",
                  email: "ceo@company.com",
                  portrait: "65280888ce40f919f2cdadca",

                  content: {
                    root: {
                      type: "root",
                      format: "",
                      indent: 0,
                      version: 1,

                      children: [
                        {
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
                          format: "",
                          indent: 0,
                          type: "heading",
                          version: 1,
                          tag: "h2",
                        },

                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "foo bar foo bar bar bar bar –– bar-bar-bar. ",
                              type: "text",
                              version: 1,
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
                  },
                  _status: "published",
                  createdAt: "2023-10-12T14:55:01.823Z",
                  updatedAt: "2023-10-12T14:55:01.823Z",
                  fullName: "First Person",
                },
                relationTo: "people",
              },
              newTab: false,
              linkType: "internal",
            },
          },

          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " is an internal one. ",
            type: "text",
            version: 1,
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

/** TODO: Extend link renderer (current is the default one) */

describe("Testing custom heading renderers", async () => {
  render(
    <PayloadLexicalReactRenderer
      content={content}
      elementRenderers={{
        ...defaultElementRenderers,
        link: (element) => (
          <a
            href={element.fields.url}
            target={element.fields.newTab ? "_blank" : "_self"}
          >
            {element.children}
          </a>
        ),
      }}
    />
  );
});
