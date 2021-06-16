import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';

interface Props {
  onFilesChange: (files: File[]) => void;
}

const UploadDropZone = ({ onFilesChange }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: onFilesChange,
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
