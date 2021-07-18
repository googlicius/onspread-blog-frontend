import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Wysiwyg.module.scss';
import { UploadFile } from '@/graphql/generated';
import MediaLib, { MediaLibRef } from './MediaLib/MediaLib';

interface Props {
  onChange: (input) => void;
  name: string;
  value?: string;
  config?: {
    [x: string]: any;
  };
  [x: string]: any;
}

const Wysiwyg = React.forwardRef<any, Props>(
  ({ config, name, value, onChange }, ref) => {
    const editorRef = useRef<any>();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, OnspreadEditor } = editorRef.current || {};
    const mediaLibRef = useRef<MediaLibRef>(null);

    const [ckEditor, setCkEditor] = useState(null);

    const handleEditorReady = (editor) => {
      if (!editor) {
        return;
      }

      setCkEditor(editor);

      if (value) {
        editor.setData(value);
      }
    };

    useEffect(() => {
      // Only load the editor on client side.
      async function loadEditor() {
        editorRef.current = {
          CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
          OnspreadEditor: require('./ckeditor5-build-onspread'),
        };
        setEditorLoaded(true);
      }
      loadEditor();
    }, []);

    const handleMediaLibToggle = () => {
      mediaLibRef.current?.toggleOpen();
    };

    const handleInsertImage = (data: UploadFile) => {
      if (data.mime.includes('image')) {
        ckEditor.model.change((writer) => {
          const imageElement = writer.createElement('image', {
            src: data.url,
            alt: data.alternativeText,
          });

          ckEditor.model.insertContent(
            imageElement,
            ckEditor.model.document.selection,
          );
        });
      }

      // Handle videos and other type of files by adding some code
    };

    const combinedConfig = useMemo(() => {
      const defaultConfig = {
        blockToolbar: [
          'paragraph',
          'heading1',
          'heading2',
          'heading3',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'codeBlock',
          'insertImage',
          '|',
          'undo',
          'redo',
        ],
        insertImage: {
          openMediaLib: handleMediaLibToggle,
        },
      };

      return Object.assign({}, defaultConfig, config);
    }, [config]);

    if (!editorLoaded) {
      return <div>Loading editor...</div>;
    }

    return (
      <>
        <div className={styles['my-editor']}>
          <CKEditor
            ref={ref}
            editor={OnspreadEditor}
            config={combinedConfig}
            onReady={handleEditorReady}
            onChange={(_, editor) => {
              const newData = editor.getData();

              if (onChange) {
                onChange({ target: { name, value: newData } });
              }
            }}
            data={value}
          />
        </div>

        <MediaLib ref={mediaLibRef} onChange={handleInsertImage} />
      </>
    );
  },
);

Wysiwyg.displayName = 'Wysiwyg';

export default Wysiwyg;
