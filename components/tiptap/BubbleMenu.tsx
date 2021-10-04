import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
import { BubbleMenuPlugin } from '@/components/tiptap/overridden/bubble-menu-plugin';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Props = Omit<Optional<BubbleMenuPluginProps, 'pluginKey'>, 'element'> & {
  style?: CSSProperties;
  className?: string;
  allowNodeTypes?: string[];
  children: any;
};

export interface BubbleMenuRef {
  element: HTMLElement;
}

const BubbleMenu = forwardRef<BubbleMenuRef, Props>((props, ref) => {
  const element = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    element: element.current,
  }));

  useEffect(() => {
    const {
      editor,
      pluginKey = 'bubbleMenu',
      tippyOptions = {
        duration: 200,
        animation: 'shift-away',
        zIndex: 1000,
      },
      shouldShow = null,
      allowNodeTypes = ['paragraph'],
    } = props;

    editor.registerPlugin(
      BubbleMenuPlugin({
        pluginKey,
        editor,
        element: element.current as HTMLElement,
        tippyOptions,
        shouldShow,
        allowNodeTypes,
      }),
    );

    return () => {
      editor.unregisterPlugin(pluginKey);
    };
  }, []);

  return (
    <div
      ref={element}
      style={{ visibility: 'hidden', ...props.style }}
      className={props.className}
    >
      {props.children}
    </div>
  );
});

BubbleMenu.displayName = 'BubbleMenu';

export default BubbleMenu;
