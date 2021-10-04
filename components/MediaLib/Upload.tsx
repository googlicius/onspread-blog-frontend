import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import ArrowBackSvg from '@/components/svgs/ArrowBackSvg';
import CloseSvg from '@/components/svgs/CloseSvg';
import cs from 'classnames';
import UploadUrl, { UploadUrlRef } from './UploadUrl';
import UploadDropZone from './UploadDropZone';
import { useTranslation } from 'react-i18next';

interface Props {
  toggle: () => void;
  onBack: () => void;
  onFilesChange: (files: File[]) => void;
}

const Upload = ({ toggle, onBack, onFilesChange }: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { t } = useTranslation();
  const uploadUrlRef = useRef<UploadUrlRef>(null);

  useEffect(() => {
    // Tab 2 (From URL) autofocus on textarea.
    if (activeTab === 2) {
      uploadUrlRef.current.textArea.focus();
    }
  }, [activeTab]);

  return (
    <>
      <div className="modal-header d-flex align-items-center">
        <button className="btn shadow-none" onClick={onBack}>
          <ArrowBackSvg />
        </button>

        <h5 className="modal-title">{t('mediaLib:Upload images')}</h5>

        <button type="button" className="close" onClick={toggle}>
          <CloseSvg />
        </button>
      </div>

      <div className="modal-body">
        <Nav tabs className="mb-3">
          <NavItem onClick={() => setActiveTab(1)}>
            <NavLink className={cs({ active: activeTab === 1 })}>
              {t('mediaLib:From computer')}
            </NavLink>
          </NavItem>

          <NavItem onClick={() => setActiveTab(2)}>
            <NavLink className={cs({ active: activeTab === 2 })}>
              {t('mediaLib:From URL')}
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <UploadDropZone onDrop={onFilesChange} />
          </TabPane>

          <TabPane tabId={2}>
            <UploadUrl ref={uploadUrlRef} onFilesChange={onFilesChange} />
          </TabPane>
        </TabContent>
      </div>

      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-outline" onClick={onBack}>
          {t('Cancel')}
        </button>

        {activeTab === 2 && (
          <button
            className="btn btn-success"
            onClick={uploadUrlRef.current.submit}
          >
            {t('Next')}
          </button>
        )}
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
