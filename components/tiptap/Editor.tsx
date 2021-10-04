import PropTypes from 'prop-types';
import { useEditor, FloatingMenu, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import applyDevTools from 'prosemirror-dev-tools';
import cs from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';
import BiggerHeadingSvg from '../svgs/editor/BiggerHeadingSvg';
import BlockquoteSvg from '../svgs/editor/BlockquoteSvg';
import CodeSvg from '../svgs/editor/CodeSvg';
import ImageSvg from '../svgs/editor/ImageSvg';
import ItalicSvg from '../svgs/editor/ItalicSvg';
import LinkSvg from '../svgs/editor/LinkSvg';
import RedoSvg from '../svgs/editor/RedoSvg';
import UndoSvg from '../svgs/editor/UndoSvg';
import SmallerHeadingSvg from '../svgs/editor/SmallerHeadingSvg';
import StrongSvg from '../svgs/editor/StrongSvg';
import BubbleMenu, { BubbleMenuRef } from './BubbleMenu';
import styles from './styles.module.scss';
import Figure from './extensions/figure';
import Figcaption from './extensions/figcaption';
import Placeholder from './extensions/placeholder';
import ImageLeftSvg from '../svgs/editor/ImageLeftSvg';
import ImageWideSvg from '../svgs/editor/ImageWideSvg';
import ImageCenterSvg from '../svgs/editor/ImageCenterSvg';
import ImageCaptionSvg from '../svgs/editor/ImageCaptionSvg';
import MediaLib, { MediaLibRef } from '../MediaLib/MediaLib';
import { UploadFile } from '@/graphql/generated';
import LinkInput from './LinkInput';
import Link from '@tiptap/extension-link';

interface Props {
  onChange: (input) => void;
  name: string;
  value?: string;
  autofocus?: boolean;
  placeholder?: string;
}

const Editor = forwardRef<any, Props>(
  ({ name, value, autofocus = false, placeholder, onChange }, ref) => {
    const [linkInputOpen, setlLinkInputOpen] = useState(false);
    const mediaLibRef = useRef<MediaLibRef>(null);
    const inlineMenuRef = useRef<BubbleMenuRef>(null);

    const editor = useEditor({
      extensions: [
        StarterKit,
        Figure,
        Figcaption,
        Image.extend({
          draggable: false,
        }),
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder: placeholder || 'Nhập nội dung...',
          imageCaption: 'Thêm ghi chú cho ảnh...',
        }),
      ],
      content: value,
      onUpdate(props) {
        onChange({ target: { name, value: props.editor.getHTML() } });
      },
      autofocus,
    });

    useEffect(() => {
      if (process.env.NODE_ENV === 'development' && editor) {
        applyDevTools(editor.view);
      }
    }, [editor]);

    function handleMediaLibToggle() {
      mediaLibRef.current.toggleOpen();
    }

    function handleInsertImage(data: UploadFile) {
      if (data.mime.includes('image')) {
        editor
          .chain()
          .focus()
          .setFigure({
            src: data.url,
            alt: data.alternativeText,
          })
          .run();
      }
    }

    function handleLinkMenu() {
      if (editor.isActive('link')) {
        editor.chain().focus().unsetLink().run();
        return;
      }

      inlineMenuRef.current.element.style.width =
        inlineMenuRef.current.element.clientWidth + 'px';

      inlineMenuRef.current.element.style.height =
        inlineMenuRef.current.element.clientHeight + 'px';

      setlLinkInputOpen(true);
    }

    function handleAddLink(href: string) {
      editor.chain().toggleLink({ href }).run();
      setlLinkInputOpen(false);
    }

    return (
      <>
        {editor && (
          <>
            <BubbleMenu
              className={styles['bubble-menu']}
              editor={editor}
              allowNodeTypes={['figure']}
              pluginKey={'imageBubbleMenu'}
            >
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="mx-1"
              >
                <ImageLeftSvg />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="px-2"
              >
                <ImageCenterSvg />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="px-2"
              >
                <ImageWideSvg />
              </button>

              <div className={styles.separetor} />

              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().enter().moveCursorToCaption().run()
                }
                className="px-2"
              >
                <ImageCaptionSvg />
              </button>
            </BubbleMenu>

            <BubbleMenu
              ref={inlineMenuRef}
              className={styles['bubble-menu']}
              editor={editor}
              allowNodeTypes={['paragraph', 'heading']}
            >
              {linkInputOpen ? (
                <LinkInput
                  onSubmit={handleAddLink}
                  onClose={() => setlLinkInputOpen(false)}
                />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cs(
                      editor.isActive('bold') && 'is-active',
                      'px-2',
                    )}
                  >
                    <StrongSvg />
                  </button>

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cs(
                      editor.isActive('italic') && 'is-active',
                      'px-2',
                    )}
                  >
                    <ItalicSvg />
                  </button>

                  <button
                    type="button"
                    onClick={handleLinkMenu}
                    className={cs(
                      editor.isActive('link') && 'is-active',
                      'px-2',
                    )}
                  >
                    <LinkSvg />
                  </button>

                  <div className={styles.separetor} />

                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={cs(
                      editor.isActive('heading', { level: 3 }) && 'is-active',
                      'px-2',
                    )}
                    disabled={!editor.can().toggleHeading({ level: 3 })}
                  >
                    <BiggerHeadingSvg />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    className={cs(
                      editor.isActive('heading', { level: 4 }) && 'is-active',
                      'px-2',
                    )}
                    disabled={!editor.can().toggleHeading({ level: 4 })}
                  >
                    <SmallerHeadingSvg />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    className={cs(
                      editor.isActive('blockquote') && 'is-active',
                      'px-2',
                    )}
                    disabled={!editor.can().toggleBlockquote()}
                  >
                    <BlockquoteSvg />
                  </button>

                  <div className={styles.separetor} />

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className={cs(
                      editor.isActive('undo') && 'is-active',
                      'px-2',
                    )}
                    disabled={!editor.can().undo()}
                  >
                    <UndoSvg />
                  </button>

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className={cs(
                      editor.isActive('redo') && 'is-active',
                      'px-2',
                    )}
                    disabled={!editor.can().redo()}
                  >
                    <RedoSvg />
                  </button>
                </>
              )}
            </BubbleMenu>

            <FloatingMenu
              className={styles['floating-menu']}
              tippyOptions={{
                duration: 200,
                animation: 'shift-away',
                zIndex: 1000,
              }}
              editor={editor}
            >
              <button
                type="button"
                onClick={handleMediaLibToggle}
                className="px-2"
              >
                <ImageSvg />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={'px-2'}
              >
                <CodeSvg />
              </button>
            </FloatingMenu>
          </>
        )}

        <EditorContent ref={ref} className={styles.editor} editor={editor} />

        <MediaLib ref={mediaLibRef} onChange={handleInsertImage} />
      </>
    );
  },
);

Editor.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Editor;
