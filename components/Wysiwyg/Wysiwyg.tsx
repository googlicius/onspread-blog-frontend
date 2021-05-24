import React, { useEffect, useRef, useState } from 'react';
import styles from './Wysiwyg.module.scss';

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

    if (!editorLoaded) {
      return null;
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
      </>
    );
  },
);

Wysiwyg.displayName = 'Wysiwyg';

export default Wysiwyg;
