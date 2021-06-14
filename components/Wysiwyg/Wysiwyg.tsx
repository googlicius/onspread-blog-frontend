import React, { useEffect, useRef, useState } from 'react';
import styles from './Wysiwyg.module.scss';
import MediaLib from './MediaLib/MediaLib';
import { UploadFile } from '@/graphql/generated';

interface Props {
  onChange: (input) => void;
  name: string;
  value?: string;
  placeholder?: string;
  [x: string]: any;
}

const Wysiwyg = React.forwardRef<any, Props>(
  ({ onChange, name, value, placeholder }, ref) => {
    const editorRef = useRef<any>();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, StrapiAdminEditor } = editorRef.current || {};

    const [ckEditor, setCkEditor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleEditorReady = (editor) => {
      setCkEditor(editor);

      if (value) {
        editor.setData(value);
      }
    };

    const handleToggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        StrapiAdminEditor: require('./ckeditor5-build-strapi-admin'),
      };
      setEditorLoaded(true);
    }, []);

    const handleChange = (data: UploadFile) => {
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
                openStrapiMediaLib: handleToggle,
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
          isOpen={isOpen}
          toggle={handleToggle}
          onChange={handleChange}
        />
      </>
    );
  },
);

Wysiwyg.displayName = 'Wysiwyg';

export default Wysiwyg;
