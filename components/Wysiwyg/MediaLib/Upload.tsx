import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import ArrowBack from '@/components/svgs/ArrowBack';
import CloseSvg from '@/components/svgs/CloseSvg';
import cs from 'classnames';
import styles from './styles.module.scss';

interface Props {
  toggle: () => void;
  onBack: () => void;
  onFilesChange: (files: File[]) => void;
}

const Upload = ({ toggle, onBack, onFilesChange }: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: onFilesChange,
  });

  useEffect(() => {
    // Tab 2 (From URL) autofocus on textarea.
    if (activeTab === 2) {
      textareaRef.current.focus();
    }
  }, [activeTab]);

  return (
    <>
      <div className="modal-header d-flex align-items-center">
        <button className="btn shadow-none" onClick={onBack}>
          <ArrowBack />
        </button>

        <h5 className="modal-title">Upload assets</h5>

        <button type="button" className="close" onClick={toggle}>
          <CloseSvg />
        </button>
      </div>

      <div className="modal-body">
        <Nav tabs className="mb-3">
          <NavItem onClick={() => setActiveTab(1)}>
            <NavLink className={cs({ active: activeTab === 1 })}>
              From computer
            </NavLink>
          </NavItem>

          <NavItem onClick={() => setActiveTab(2)}>
            <NavLink className={cs({ active: activeTab === 2 })}>
              From URL
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop some files here, or click to select files</p>
              )}
            </div>
          </TabPane>

          <TabPane tabId={2}>
            <div className="form-group">
              <label>URL</label>
              <textarea
                ref={textareaRef}
                className="form-control shadow-none"
              ></textarea>
              <small className="form-text text-muted">
                Separate your URL links by a carriage return.
              </small>
            </div>
          </TabPane>
        </TabContent>
      </div>

      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-outline" onClick={onBack}>
          Cancel
        </button>

        {activeTab === 2 && <button className="btn btn-success">Next</button>}
      </div>
    </>
  );
};

Upload.propTypes = {
  toggle: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onFilesChange: PropTypes.func.isRequired,
};

export default Upload;
