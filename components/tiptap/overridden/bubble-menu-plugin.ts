import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  BubbleMenuView,
  BubbleMenuPluginProps,
} from '@tiptap/extension-bubble-menu';

interface BubbleMenuPlugin2Props extends BubbleMenuPluginProps {
  allowNodeTypes: string[];
}

/**
 * Fix bubble-menu behavior, only show when mouseup.
 *
 * @extends BubbleMenuView
 */
class BubbleMenuView2 extends BubbleMenuView {
  private mousedown = false;

  private allowNodeTypes: string[];

  private prevState: EditorState;

  constructor(viewProps: BubbleMenuPlugin2Props & { view: EditorView }) {
    super(viewProps);

    this.allowNodeTypes = viewProps.allowNodeTypes;

    // Why this intialized twice?
    // So need to destroy events first.
    this.customDestroy();

    this.view.dom.addEventListener('mousedown', this.viewMouseDownHandler);
    // Listen mouseup from document instead of view.dom, because when event mouseup triggered outsize the content boundary, `view.dom` cannot catch it.
    document.addEventListener('mouseup', this.mouseupHandler);
    document.addEventListener('keydown', this.handleEscape);
  }

  viewMouseDownHandler = () => {
    this.mousedown = true;
    this.prevState = this.view.state;
  };

  mouseupHandler = () => {
    if (this.mousedown) {
      this.mousedown = false;
      // Manual update with nearest state, otherwise `isSame` check (In BubbleMenuView class) won't allow to update the bubble-menu.
      this.update(this.view, this.prevState);
      this.prevState = null;
    }
  };

  handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.hide();
    }
  };

  /**
   * @override
   */
  update(view: EditorView, oldState?: EditorState) {
    const { $from } = this.editor.state.selection;

    const allowNodeType = () =>
      this.allowNodeTypes.find((type) => type === $from.parent.type.name);

    if (this.mousedown || !allowNodeType()) {
      this.hide();
      return;
    }

    super.update(view, oldState);
  }

  customDestroy() {
    this.view.dom.removeEventListener('mousedown', this.viewMouseDownHandler);
    document.removeEventListener('mouseup', this.mouseupHandler);
    document.removeEventListener('keydown', this.handleEscape);
  }

  /**
   * @override
   */
  destroy() {
    this.customDestroy();
    super.destroy();
  }
}

export const BubbleMenuPlugin = (options: BubbleMenuPlugin2Props) => {
  return new Plugin({
    key:
      typeof options.pluginKey === 'string'
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: (view) => new BubbleMenuView2({ view, ...options }),
  });
};
