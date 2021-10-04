import PropTypes from 'prop-types';
import ArrowBackSvg from '@/components/svgs/ArrowBackSvg';
import CloseSvg from '@/components/svgs/CloseSvg';
import { UploadFile } from '@/graphql/generated';
import FileItem from './FileItem';
import { Col, Row } from 'reactstrap';

interface Props {
  uploadFiles: Partial<UploadFile>[];
  toggle: () => void;
  onBack: () => void;
  onUpload: () => void;
  onDelete?: (file: UploadFile) => void;
}

const UploadList = ({
  uploadFiles,
  toggle,
  onBack,
  onUpload,
  onDelete,
}: Props) => {
  const handleBack = () => {
    if (
      confirm(
        'Are you sure? You have some files that have not been uploaded yet.',
      )
    ) {
      onBack();
    }
  };

  return (
    <>
      <div className="modal-header d-flex align-items-center">
        <button className="btn shadow-none" onClick={handleBack}>
          <ArrowBackSvg />
        </button>

        <h5 className="modal-title">Selected files</h5>

        <button type="button" className="close" onClick={toggle}>
          <CloseSvg />
        </button>
      </div>

      <div className="modal-body">
        <Row>
          {uploadFiles.map((file, index) => {
            return (
              <Col md={3} xs={6} key={index} className="mb-4">
                <FileItem
                  file={file as UploadFile}
                  selected
                  onDelete={onDelete}
                />
              </Col>
            );
          })}
        </Row>
      </div>

      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-outline" onClick={handleBack}>
          Cancel
        </button>

        <button className="btn btn-success" onClick={onUpload}>
          Upload {uploadFiles.length} image(s) to the library
        </button>
      </div>
    </>
  );
};

UploadList.propTypes = {
  uploadFiles: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default UploadList;
