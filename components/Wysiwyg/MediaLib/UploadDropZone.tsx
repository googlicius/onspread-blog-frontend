import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';

interface Props {
  onDrop: (files: File[]) => void;
}

const UploadDropZone = ({ onDrop }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div {...getRootProps({ className: styles.dropzone })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

UploadDropZone.propTypes = {
  onFilesChange: PropTypes.func.isRequired,
};

export default UploadDropZone;
