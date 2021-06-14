import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { FilesConnectionQuery, UploadFile } from '@/graphql/generated';
import SearchSvg from '@/components/svgs/SearchSvg';
import CloseSvg from '@/components/svgs/CloseSvg';
import FileItem from './FileItem';
import styles from './styles.module.scss';
import Pagination from '@/components/Pagination';
import { perPage } from './constants';

interface Props {
  data: FilesConnectionQuery;
  page: number;
  selectedFiles: string[];
  toggle: () => void;
  onAddMoreAssetsClick: () => void;
  onNavigate: (page: number) => void;
  onFileSelect: (file: UploadFile) => void;
  onFinishClick: () => void;
}

const FileList = ({
  data,
  page = 1,
  selectedFiles = [],
  toggle,
  onAddMoreAssetsClick,
  onNavigate,
  onFileSelect,
  onFinishClick,
}: Props) => {
  return (
    <>
      <div className="modal-header d-flex align-items-center py-0">
        <form className="flex-grow-1">
          <InputGroup className={styles['media-lib__input-group-search']}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <SearchSvg />
              </InputGroupText>
            </InputGroupAddon>

            <Input className="shadow-none" placeholder="Search images..." />
          </InputGroup>
        </form>

        <button type="button" className="close" onClick={toggle}>
          <CloseSvg />
        </button>
      </div>

      <div
        className={cs('modal-body', styles['media-lib__file-list'])}
        style={{ maxHeight: `${window.innerHeight - 200}px` }}
      >
        <div className="d-flex flex-column align-items-end mb-3">
          <button className="btn btn-primary" onClick={onAddMoreAssetsClick}>
            Add more images
          </button>
        </div>

        {/* Display files and images */}
        <div className="row">
          {data.filesConnection.values.map((file, index) => {
            return (
              <FileItem
                file={file as UploadFile}
                selected={
                  !!selectedFiles.find(
                    (selectedFile) => selectedFile === file.id,
                  )
                }
                key={index}
                onSelect={onFileSelect}
              />
            );
          })}
        </div>

        {/* Pagination */}
        <Pagination
          className="mt-2"
          currentPage={page}
          perPage={perPage}
          totalCount={data.filesConnection.aggregate.totalCount}
          listPath="images"
          onNavigate={onNavigate}
        />
      </div>

      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-outline" onClick={toggle}>
          Cancel
        </button>

        <button className="btn btn-success" onClick={onFinishClick}>
          Finish
        </button>
      </div>
    </>
  );
};

FileList.propTypes = {
  data: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  selectedFiles: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  onAddMoreAssetsClick: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  onFinishClick: PropTypes.func.isRequired,
};

export default FileList;
