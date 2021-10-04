import {
  Node,
  nodeInputRule,
  findChildrenInRange,
  Tracker,
} from '@tiptap/core';
import { JSONContent } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state';

export interface FigureOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: {
        src: string;
        alt?: string;
        title?: string;
        caption?: string;
      }) => ReturnType;

      /**
       * Converts an image to a figure
       */
      imageToFigure: () => ReturnType;

      /**
       * Converts a figure to an image
       */
      figureToImage: () => ReturnType;

      /**
       * Move cursor to caption (only applied when figure is selected).
       */
      moveCursorToCaption: () => ReturnType;
    };
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

const Figure = Node.create<FigureOptions>({
  name: 'figure',
  defaultOptions: {
    HTMLAttributes: {},
  },
  group: 'block',
  content: 'image?figcaption?',
  draggable: true,
  inline: false,
  defining: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector('img')?.getAttribute('src'),
      },
      alt: {
        default: null,
        parseHTML: (element) =>
          element.querySelector('img')?.getAttribute('alt'),
      },
      title: {
        default: null,
        parseHTML: (element) =>
          element.querySelector('img')?.getAttribute('title'),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'figure' }];
  },

  renderHTML() {
    return ['figure', { class: 'figure' }, 0];
  },

  addCommands() {
    return {
      setFigure: ({ caption, ...attrs }) => ({ chain }) => {
        const content: JSONContent[] = [{ type: 'image', attrs }];

        if (caption) {
          content.push({ type: 'figcaption', text: caption });
        }

        return (
          chain()
            // Delete current empty node.
            .command(({ commands, state }) => {
              return !state.selection.$from.parent.textContent
                ? commands.keyboardShortcut('Backspace')
                : true;
            })
            .insertContent({
              type: this.name,
              attrs,
              content,
            })
            // set cursor at end of caption field
            .command(({ tr, commands }) => {
              const { doc, selection } = tr;
              const position = doc.resolve(selection.to - 2).end();

              return commands.setTextSelection(position);
            })
            .run()
        );
      },

      imageToFigure: () => ({ tr, commands }) => {
        const { doc, selection } = tr;
        const { from, to } = selection;
        const images = findChildrenInRange(
          doc,
          { from, to },
          (node) => node.type.name === 'image',
        );

        if (!images.length) {
          return false;
        }

        const tracker = new Tracker(tr);

        return commands.forEach(images, ({ node, pos }) => {
          const mapResult = tracker.map(pos);

          if (mapResult.deleted) {
            return false;
          }

          const range = {
            from: mapResult.position,
            to: mapResult.position + node.nodeSize,
          };

          return commands.insertContentAt(range, {
            type: this.name,
            attrs: {
              src: node.attrs.src,
            },
          });
        });
      },

      figureToImage: () => ({ tr, commands }) => {
        const { doc, selection } = tr;
        const { from, to } = selection;
        const figures = findChildrenInRange(
          doc,
          { from, to },
          (node) => node.type.name === this.name,
        );

        if (!figures.length) {
          return false;
        }

        const tracker = new Tracker(tr);

        return commands.forEach(figures, ({ node, pos }) => {
          const mapResult = tracker.map(pos);

          if (mapResult.deleted) {
            return false;
          }

          const range = {
            from: mapResult.position,
            to: mapResult.position + node.nodeSize,
          };

          return commands.insertContentAt(range, {
            type: 'image',
            attrs: {
              src: node.attrs.src,
            },
          });
        });
      },

      moveCursorToCaption: () => ({ state, chain }) => {
        const { anchor } = state.selection;

        return (
          chain()
            // Go through the image.
            .setTextSelection(anchor + 2)
            .scrollIntoView()
            .run()
        );
      },
    };
  },

  addInputRules() {
    return [
      nodeInputRule(inputRegex, this.type, (match) => {
        const [, alt, src, title] = match;

        return { src, alt, title };
      }),
    ];
  },

  addKeyboardShortcuts() {
    const replaceFigureWithParagraph = () => {
      const { $from, from, anchor } = this.editor.state.selection;
      const selectedNode = $from.parent;

      if (selectedNode.type.name === 'figure') {
        const { tr } = this.editor.state;

        tr.replaceRangeWith(
          from - 1,
          from + selectedNode.nodeSize - 1,
          this.editor.state.schema.nodes.paragraph.create(),
        )
          .setSelection(TextSelection.create(tr.doc, anchor))
          .scrollIntoView();
        this.editor.view.dispatch(tr);

        return true;
      }
    };

    const moveCursorToCaption = () => {
      const { $from } = this.editor.state.selection;
      const selectedNode = $from.parent;

      if (selectedNode.type.name === 'figure' && selectedNode.maybeChild(1)) {
        return this.editor.commands.moveCursorToCaption();
      }
    };

    return {
      Enter: moveCursorToCaption,
      Backspace: replaceFigureWithParagraph,
      Delete: replaceFigureWithParagraph,
    };
  },
});

export default Figure;
