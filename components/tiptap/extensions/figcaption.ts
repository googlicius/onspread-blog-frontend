import { Node } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';

export interface FigcaptionOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figcaption: {
      /**
       * Exit image caption.
       */
      exitImageCaption: () => ReturnType;
    };
  }
}

const Figcaption = Node.create<FigcaptionOptions>({
  name: 'figcaption',
  content: 'inline*',

  parseHTML() {
    return [{ tag: 'figcaption' }];
  },

  renderHTML() {
    return ['figcaption', { class: 'figure-caption' }, 0];
  },

  addCommands() {
    return {
      exitImageCaption: () => ({ state, dispatch }) => {
        const { $from } = state.selection;
        const selectedNode = $from.parent;

        if (
          selectedNode.type.name === 'figcaption' &&
          selectedNode.eq($from.node(-1).lastChild)
        ) {
          const { tr } = state;
          const pos = $from.end() + 2;
          tr.replaceRangeWith(pos, pos, state.schema.nodes.paragraph.create());
          tr.setSelection(TextSelection.create(tr.doc, pos + 1));
          dispatch(tr.scrollIntoView());
          return true;
        }
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      /**
       * Exit figcaption when hit enter.
       */
      Enter: () => this.editor.commands.exitImageCaption(),
    };
  },
});

export default Figcaption;
