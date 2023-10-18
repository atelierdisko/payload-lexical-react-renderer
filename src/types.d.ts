export type AbstractNode<Type extends string> = {
  type: Type;
  version: number;
};

export type AbstractElementNode<Type extends string> = {
  direction: "ltr" | "rtl" | null;
  format: "" | "center" | "right";
  indent: number;
} & AbstractNode<Type>;

export type BlockNode<BlockType = unknown> = {
  fields: {
    data: {
      id: string;
      blockName: string;
      blockType: string;
    } & BlockType;
  };
} & AbstractElementNode<"block">;

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

export type TextNode = {
  detail: number; // what is this
  format: number;
  mode: "normal"; // what is this
  style: string;
  text: string;
} & AbstractNode<"text">;

export type Linebreak = AbstractNode<"linebreak">;

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

export type HeadingNode = {
  tag: string;
  children: TextNode[];
} & AbstractElementNode<"heading">;

export type ParagraphNode = {
  children: (TextNode | Linebreak)[];
} & AbstractElementNode<"paragraph">;

export type ListItemNode = {
  children: (TextNode | ListNode)[];
  value: number;
} & AbstractElementNode<"listitem">;

export type ListNode = {
  tag: string;
  listType: "number" | "bullet";
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
  | BlockNode
  | UploadNode
  | TextNode
  | LinkNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | Linebreak;

export type PayloadLexicalReactRendererProps = {
  content: {
    root: Root;
  };
  elementRenderers?: {
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
    linebreak: () => React.ReactNode;
    upload: (props: UploadNode) => React.ReactNode;
  };
  renderMark?: (mark: Mark) => React.ReactNode;
  blockRenderers?: {
    [key: string]: (props: BlockNode) => React.ReactNode;
  };
};
