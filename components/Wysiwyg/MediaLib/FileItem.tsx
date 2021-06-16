import PropTypes from 'prop-types';
import cs from 'classnames';
import { UploadFile } from '@/graphql/generated';
import styles from './styles.module.scss';
import ImageCard from './ImageCard';
import formatBytes from '@/utils/format-bytes';
import getMimeType from '@/utils/get-mime-type';
import getFileExtension from '@/utils/get-file-extension';
import upperCase from 'lodash/upperCase';
import FileCard from './FileCard';
import TrashSvg from '@/components/svgs/TrashSvg';
import PencilSvg from '@/components/svgs/PencilSvg';

interface Props {
  file: UploadFile;
  selected?: boolean;
  onSelect?: (file: UploadFile) => void;
  onDelete?: (file: UploadFile) => void;
}

const FileItem = ({ file, selected, onSelect, onDelete }: Props) => {
  const { mime, ext, name, width, height, size } = file;

  const extension = upperCase(getFileExtension(ext));

  const metadata = `${extension ? extension + ' — ' : ''}${
    width && height ? width + 'x' + height + ' — ' : ''
  }${formatBytes(size)}`;

  const handleFileSelect = () => {
    if (onSelect) {
      onSelect(file);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(file);
    }
  };

  return (
    <div
      className={cs(styles['media-lib__file-item'], 'col-md-3', 'mb-4')}
      onClick={handleFileSelect}
    >
      <div
        role="button"
        className={cs(styles['file-card'], {
          [styles.selected]: selected,
        })}
      >
        <div
          className={cs(
            styles['file-card__wrapper'],
            'd-flex',
            'justify-content-center',
            'align-items-center',
          )}
        >
          {
            {
              image: <ImageCard file={file} />,
              file: <FileCard extension={getFileExtension(ext)} />,
            }[getMimeType(mime)]
          }
        </div>

        {file.id.includes('temp_') && (
          <div className={styles['file-card__buttons']}>
            <button
              className="btn btn-light btn-sm mr-2"
              onClick={handleDelete}
            >
              <TrashSvg width={20} height={20} />
            </button>

            <button className="btn btn-light btn-sm">
              <PencilSvg width={20} height={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles['media-lib__file-item__name']}>
        <small title={name}>
          <strong>{name}</strong>
        </small>
      </div>

      <div className={styles['media-lib__file-item__metadata']}>
        <small title={metadata}>{metadata}</small>
      </div>
    </div>
  );
};

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

export default FileItem;
