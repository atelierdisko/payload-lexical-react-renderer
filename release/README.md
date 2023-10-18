# @atelierdisko/payload-lexical-react-renderer

A react component for rendering the lexical editor state to jsx.

## Usage

```js
import {
  PayloadLexicalReactRenderer,
  PayloadLexicalReactRendererProps,
} from "./payloadLexicalReactRenderer";

function MyBlog() {

const content: PayloadLexicalReactRendererProps = fetchLexicalRichTextData();

return (
    <div>
    <PayloadLexicalReactRenderer content={content} />
    </div>
 );
}

```

Get started by passing your Lexical rich text data to the component. It ships with default renderers that will only apply the most basic styling.

In order to customize the result, use the following props to pass your own renderer functions as an object:

### elementRenderers

```js
<PayloadLexicalReactRenderer /* ... */ elementRenderers={/* Your custom renderers */} />
```

To control how your frontend will render elements from your Payload CMS like headings, paragraphs or lists etc., pass your custom renderers to the elementRenderers prop like so:

```js
export const customElementRenderers: PayloadLexicalReactRendererProps["elementRenderers"] =
  {
    heading: (element) => <CustomText as={element.tag}>{element.children}</CustomText>,
    /* Or like so: */
    paragraph: (element) => return (
        <p className={/* Your style */}>{element.children}</p>
      );
    /* ... */
  }
```

**Note**: Make sure to assign a renderer for each element type being used in your editor.

### renderMarks

```js
<PayloadLexicalReactRenderer /* ... */ renderMarks={/* Your custom renderers */} />
```

To control how your frontend will render text marks like bold, italic etc., add your own renderers:

```js
export const customRenderMarks: PayloadLexicalReactRendererProps["renderMark"] =
  (mark) => {
    const style: CSSProperties = {};

    if (mark.bold) {
      style.fontWeight = /* Your own style */;
      /* Add more styles if needed */
    }

    /* ... */

    return <span style={style}>{mark.text}</span>;
  };
```

### blockRenderers

Payload allows you to re-use your custom blocks in its Lexical rich text editor. If your CMS is not using the BlocksFeature inside the editor, you don't need to pass anything here. If you do, make sure to pass a renderer for each block you integrated into your editor.

```js
<PayloadLexicalReactRenderer
      /* ... */
      blockRenderers={{
        someBlock: (props: BlockNode<SomeBlock>) => <SomeBlockRenderer content={props.fields.data.content}/>
        /* ... */
      }}
    />
```
