import React, { useEffect, useRef, useState } from 'react';
import styles from './Wysiwyg.module.scss';
import { UploadFile } from '@/graphql/generated';
import MediaLib from './MediaLib/MediaLib';

interface Props {
  onChange: (input) => void;
  name: string;
  value?: string;
  placeholder?: string;
  [x: string]: any;
}

const Wysiwyg = React.forwardRef<any, Props>(
  ({ name, value, placeholder, onChange }, ref) => {
    const editorRef = useRef<any>();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, StrapiAdminEditor } = editorRef.current || {};

    const [ckEditor, setCkEditor] = useState(null);
    const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);

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
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        StrapiAdminEditor: require('./ckeditor5-build-strapi-admin'),
      };
      setEditorLoaded(true);
    }, []);

    const handleMediaLibToggle = () => {
      setIsMediaLibOpen((prev) => !prev);
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

    if (!editorLoaded) {
      return <div>Loading editor...</div>;
    }

    return (
      <>
        <div className={styles['my-editor']}>
          <CKEditor
            ref={ref}
            editor={StrapiAdminEditor}
            config={{
              blockToolbar: [
                'heading',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertImage',
                '|',
                'undo',
                'redo',
              ],
              insertImage: {
                openStrapiMediaLib: handleMediaLibToggle,
              },
              placeholder,
            }}
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

        <MediaLib
          isOpen={isMediaLibOpen}
          toggle={handleMediaLibToggle}
          onChange={handleInsertImage}
        />
      </>
    );
  },
);

Wysiwyg.displayName = 'Wysiwyg';

export default Wysiwyg;
