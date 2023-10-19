# @atelierdisko/payload-lexical-react-renderer

A react component for rendering the lexical editor state to jsx.

## Usage

```js
import {
  PayloadLexicalReactRenderer,
  PayloadLexicalReactRendererProps,
  PayloadLexicalReactRendererContent
} from "@atelier-disko/payload-lexical-react-renderer";

function MyBlog() {
  const content: PayloadLexicalReactRendererContent = await fetchLexicalEditorState();

  return (
    <div>
      <PayloadLexicalReactRenderer content={content} />
    </div>
  );
}
```

Get started by passing your Lexical rich text data to the component. It ships with default renderers that will only apply the most basic styling.

### elementRenderers

In order to customize the rendered result, use the `elementRenderers` prop to override the default renderers:

```js
import {
  PayloadLexicalReactRenderer,
  defaultElementRenderers,
} from "@atelier-disko/payload-lexical-react-renderer";

<PayloadLexicalReactRenderer
  content={content}
  elementRenderers={{
    ...defaultElementRenderers,
    heading: (props) => {
      const Component = props.tag;

      return (
        <Component style={{ color: "#0d26fc" }}>{props.children}</Component>
      );
    },
    paragraph: (props) => (
      <p className={/* Your style */}>{props.children}</p>
    );
  }}
/>;
```

**Note**: Make sure to assign a renderer for each element type being used in your editor.

### renderMarks

To customize rendering of text marks like bold, italic etc., add your own `renderMark` function:

```js
import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer";

<PayloadLexicalReactRenderer
  content={content}
  renderMark={(mark) => {
    if (mark.bold) {
      return <strong>{mark.text}</strong>;
    }

    if (mark.italic) {
      return <em>{mark.text}</em>;
    }

    // implement all other mark types

    return <>{mark.text}</>;
  }}
/>;
```

### blockRenderers

Payload allows you to re-use your custom blocks in its Lexical rich text editor. If your CMS is not using the BlocksFeature inside the editor, you don't need to pass anything here. If you do, make sure to pass a renderer for each block you integrated into your editor.

```js
import {
  BlockNode,
  PayloadLexicalReactRenderer,
} from "@atelier-disko/payload-lexical-react-renderer";

type Intro = {
  text: string;
  position: "left" | "right";
};

 <PayloadLexicalReactRenderer<{
    intro: Intro;
  }>
  content={content}
  blockRenderers={{
    intro: (props) => (
      <div
        style={{
          display: "flex",
          alignSelf:
            props.fields.data.position === "left"
              ? "flex-start"
              : "flex-end",
        }}
      >
        {props.fields.data.text}
      </div>
    ),
  }}
/>
```
