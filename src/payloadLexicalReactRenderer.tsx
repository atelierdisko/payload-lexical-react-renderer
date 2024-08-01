import React, {CSSProperties} from "react";

export type AbstractNode<Type extends string> = {
  format?: "" | "start" | "center" | "right" | "justify" | number;
  type: Type;
  version: number;
};

export type AbstractElementNode<Type extends string> = {
  direction: "ltr" | "rtl" | null;
  indent: number;
} & AbstractNode<Type>;

export type AbstractTextNode<Type extends string> = {
  detail: number; // what is this
  format: "" | number;
  mode: "normal"; // what is this
  style: string;
  text: string;
} & AbstractNode<Type>;

export type BlockNode<
  BlockData extends Record<string, unknown>,
  BlockType extends string,
> = {
  fields: {
    id: string;
    blockName: string;
    blockType: BlockType;
  } & BlockData;
} & AbstractElementNode<"block">;

type UnknownBlockNode = {
  fields: {
    id: string;
    blockName: string;
    blockType: string;
    [key: string]: unknown;
  };
} & AbstractNode<"block">;

export type Root = {
  children: Node[];
} & AbstractElementNode<"root">;

export type Mark = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  highlight?: boolean;
};

export type TextNode = AbstractTextNode<"text">;
export type Linebreak = AbstractNode<"linebreak">;
export type Tab = AbstractTextNode<"tab">;
export type HorizontalRule = AbstractNode<"horizontalrule">;

export type LinkNode = {
  children: TextNode[];
  fields:
    | {
        linkType: "custom";
        newTab: boolean;
        url: string;
      }
    | {
        doc: {
          relationTo: string;
          value: unknown;
        };
        linkType: "internal";
        newTab: boolean;
        url: string;
      };
} & AbstractElementNode<"link">;

export type AutoLinkNode = {
  children: TextNode[];
  fields: {
    linkType: "custom";
    newTab?: boolean;
    url: string;
  };
} & AbstractElementNode<"autolink">;

export type HeadingNode = {
  tag: string;
  children: TextNode[];
} & AbstractElementNode<"heading">;

export type ParagraphNode = {
  children: (
    | TextNode
    | Linebreak
    | Tab
    | LinkNode
    | AutoLinkNode
    | HorizontalRule
  )[];
} & AbstractElementNode<"paragraph">;

export type ListItemNode = {
  children: (TextNode | ListNode)[];
  value: number;
} & AbstractElementNode<"listitem">;

export type ListNode = {
  tag: string;
  listType: "number" | "bullet" | "check";
  start: number;
  children: ListItemNode[];
} & AbstractElementNode<"list">;

export type QuoteNode = {
  children: TextNode[];
} & AbstractElementNode<"quote">;

export type UploadNode<
  MediaType = {
    id: string;
    alt: string;
    updatedAt: string;
    createdAt: string;
    url?: string;
    filename?: string;
    mimeType?: string;
    filesize?: number;
    width?: number;
    height?: number;
  },
> = {
  fields: null;
  relationTo: "media";
  value: MediaType;
} & AbstractElementNode<"upload">;

export type Node =
  | HeadingNode
  | ParagraphNode
  | UploadNode
  | TextNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | Linebreak
  | Tab
  | HorizontalRule
  | LinkNode
  | UnknownBlockNode
  | AutoLinkNode;

export type ElementRenderers = {
  heading: (
    props: { children: React.ReactNode } & Omit<HeadingNode, "children">
  ) => React.ReactNode;
  list: (
    props: { children: React.ReactNode } & Omit<ListNode, "children">
  ) => React.ReactNode;
  listItem: (
    props: { children: React.ReactNode } & Omit<ListItemNode, "children">
  ) => React.ReactNode;
  paragraph: (
    props: { children: React.ReactNode } & Omit<ParagraphNode, "children">
  ) => React.ReactNode;
  quote: (
    props: { children: React.ReactNode } & Omit<QuoteNode, "children">
  ) => React.ReactNode;
  link: (
    props: { children: React.ReactNode } & Omit<LinkNode, "children">
  ) => React.ReactNode;
  autolink: (
    props: { children: React.ReactNode } & Omit<AutoLinkNode, "children">
  ) => React.ReactNode;
  linebreak: () => React.ReactNode;
  tab: () => React.ReactNode;
  horizontalRule: () => React.ReactNode;
  upload: (props: UploadNode) => React.ReactNode;
};

export type RenderMark = (mark: Mark) => React.ReactNode;

export type PayloadLexicalReactRendererContent = {
  root: Root;
};

export type PayloadLexicalReactRendererProps<
  Blocks extends { [key: string]: any },
> = {
  content: PayloadLexicalReactRendererContent;
  elementRenderers?: ElementRenderers;
  renderMark?: RenderMark;
  blockRenderers?: {
    [BlockName in Extract<keyof Blocks, string>]?: (
      props: BlockNode<Blocks[BlockName], BlockName>
    ) => React.ReactNode;
  };
};

// This copy-and-pasted from somewhere in lexical here: https://github.com/facebook/lexical/blob/c2ceee223f46543d12c574e62155e619f9a18a5d/packages/lexical/src/LexicalConstants.ts
const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_STRIKETHROUGH = 1 << 2;
const IS_UNDERLINE = 1 << 3;
const IS_CODE = 1 << 4;
const IS_SUBSCRIPT = 1 << 5;
const IS_SUPERSCRIPT = 1 << 6;
const IS_HIGHLIGHT = 1 << 7;

function getElementStyle<Type extends string>({
  indent,
  format,
}: AbstractElementNode<Type>): CSSProperties {
  const style: CSSProperties = {};

  if (indent > 0) {
    style.marginLeft = `${indent * 20}px`;
  }

  if (format === "right" || format === "center" || format === "justify") {
    style.textAlign = format;
  }

  return style;
}

export const defaultElementRenderers: ElementRenderers = {
  heading: (element) => {
    return React.createElement(
      element.tag,
      {
        style: getElementStyle<"heading">(element),
      },
      element.children
    );
  },
  list: (element) => {
    return React.createElement(
      element.tag,
      {
        style: getElementStyle<"list">(element),
      },
      element.children
    );
  },
  listItem: (element) => {
    return (
      <li style={getElementStyle<"listitem">(element)}>{element.children}</li>
    );
  },
  paragraph: (element) => {
    return (
      <p style={getElementStyle<"paragraph">(element)}>{element.children}</p>
    );
  },
  link: (element) => (
    <a
      href={element.fields.url}
      target={element.fields.newTab ? "_blank" : "_self"}
      style={getElementStyle<"link">(element)}
    >
      {element.children}
    </a>
  ),
  autolink: (element) => (
    <a
      href={element.fields.url}
      target={element.fields.newTab ? "_blank" : "_self"}
      style={getElementStyle<"autolink">(element)}
    >
      {element.children}
    </a>
  ),
  quote: (element) => (
    <blockquote style={getElementStyle<"quote">(element)}>
      {element.children}
    </blockquote>
  ),
  horizontalRule: () => <hr/>,
  linebreak: () => <br/>,
  tab: () => <br/>,
  upload: (element) => {
    if (element.value.mimeType?.includes("image")) {
            return <img src={element.value.url} alt={element.value.alt}/>;
    }
  },
};

export const defaultRenderMark: RenderMark = (mark) => {
  const style: CSSProperties = {};

  if (mark.bold) {
    style.fontWeight = "bold";
  }

  if (mark.italic) {
    style.fontStyle = "italic";
  }

  if (mark.underline) {
    style.textDecoration = "underline";
  }

  if (mark.strikethrough) {
    style.textDecoration = "line-through";
  }

  if (mark.code) {
    return <code>{mark.text}</code>;
  }

  if (mark.highlight) {
    return <mark style={style}>{mark.text}</mark>;
  }

  if (mark.subscript) {
    return <sub style={style}>{mark.text}</sub>;
  }

  if (mark.superscript) {
    return <sup style={style}>{mark.text}</sup>;
  }

  if (Object.keys(style).length === 0) {
    return <>{mark.text}</>;
  }

  return <span style={style}>{mark.text}</span>;
};

export function PayloadLexicalReactRenderer<
  Blocks extends { [key: string]: any },
>({
  content,
  elementRenderers = defaultElementRenderers,
  renderMark = defaultRenderMark,
  blockRenderers = {},
}: PayloadLexicalReactRendererProps<Blocks>) {
  const renderElement = React.useCallback(
    (node: Node, children?: React.ReactNode) => {
      if (!elementRenderers) {
        throw new Error("'elementRenderers' prop not provided.");
      }

      if (node.type === "link" && node.fields) {
        return elementRenderers.link({
          ...node,
          children,
        });
      }

      if (node.type === "autolink" && node.fields) {
        return elementRenderers.autolink({
          ...node,
          children,
        });
      }

      if (node.type === "heading") {
        return elementRenderers.heading({
          ...node,
          children,
        });
      }

      if (node.type === "paragraph") {
        return elementRenderers.paragraph({
          ...node,
          children,
        });
      }

      if (node.type === "list") {
        return elementRenderers.list({
          ...node,
          children,
        });
      }

      if (node.type === "listitem") {
        return elementRenderers.listItem({
          ...node,
          children,
        });
      }

      if (node.type === "quote") {
        return elementRenderers.quote({
          ...node,
          children,
        });
      }
      if (node.type === "horizontalrule") {
        return elementRenderers.horizontalRule();
      }

      if (node.type === "linebreak") {
        return elementRenderers.linebreak();
      }

      if (node.type === "tab") {
        return elementRenderers.tab();
      }

      if (node.type === "upload") {
        return elementRenderers.upload(node);
      }

      throw new Error(`Missing element renderer for node type '${node.type}'`);
    },
    [elementRenderers]
  );

  const renderText = React.useCallback(
    (node: TextNode): React.ReactNode | null => {
      if (!renderMark) {
        throw new Error("'renderMark' prop not provided.");
      }

      if (!node.format) {
        return renderMark({
          text: node.text,
        });
      }

      return renderMark({
        text: node.text,
        bold: (node.format & IS_BOLD) > 0,
        italic: (node.format & IS_ITALIC) > 0,
        underline: (node.format & IS_UNDERLINE) > 0,
        strikethrough: (node.format & IS_STRIKETHROUGH) > 0,
        code: (node.format & IS_CODE) > 0,
        subscript: (node.format & IS_SUBSCRIPT) > 0,
        superscript: (node.format & IS_SUPERSCRIPT) > 0,
        highlight: (node.format & IS_HIGHLIGHT) > 0,
      });
    },
    [renderMark]
  );

  const serialize = React.useCallback(
    (children: Node[]): React.ReactNode[] | null =>
      children.map((node, index) => {
        if (node.type === "text") {
          return (
            <React.Fragment key={index}>{renderText(node)}</React.Fragment>
          );
        }

        if (node.type === "block") {
          const renderer = blockRenderers[node.fields.blockType] as (
            props: unknown
          ) => React.ReactNode;

          if (typeof renderer !== "function") {
            throw new Error(
              `Missing block renderer for block type '${node.fields.blockType}'`
            );
          }

          return <React.Fragment key={index}>{renderer(node)}</React.Fragment>;
        }

        if (
          node.type === "linebreak" ||
          node.type === "tab" ||
          node.type === "upload" ||
          node.type === "horizontalrule"
        ) {
          return (
            <React.Fragment key={index}>{renderElement(node)}</React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {renderElement(node, serialize(node.children))}
          </React.Fragment>
        );
      }),
    [renderElement, renderText, blockRenderers]
  );

  return <>{serialize(content.root.children)}</>;
}
