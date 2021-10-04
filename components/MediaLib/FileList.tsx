import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { FilesConnectionQuery, UploadFile } from '@/graphql/generated';
import SearchSvg from '@/components/svgs/SearchSvg';
import CloseSvg from '@/components/svgs/CloseSvg';
import FileItem from './FileItem';
import styles from './styles.module.scss';
import Pagination from '@/components/Pagination';
import { perPage } from './constants';
import { useTranslation } from 'react-i18next';

interface Props {
  data: FilesConnectionQuery;
  page: number;
  selectedFiles: string[];
  toggle: () => void;
  onAddMoreAssetsClick: () => void;
  onNavigate: (page: number) => void;
  onFileSelect: (file: UploadFile) => void;
  onFinishClick: () => void;
  onSearch: (searchStr: string) => void;
}

interface SearchForm {
  q: string;
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
  onSearch,
}: Props) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<SearchForm>();

  useEffect(() => {
    // Scroll to top after navigate to another page.
    modalBodyRef.current.scrollTo({
      top: 0,
    });
  }, [data]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent submitting parent form.
    if (e) {
      e.preventDefault();
      if (typeof e.stopPropagation === 'function') {
        e.stopPropagation();
      }
    }

    return handleSubmit((formData: SearchForm) => {
      onSearch(formData.q);
    })(e);
  };

  return (
    <>
      <div className="modal-header d-flex align-items-center py-0">
        <form className="flex-grow-1" onSubmit={onSubmit}>
          <InputGroup className={styles['media-lib__input-group-search']}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <SearchSvg />
              </InputGroupText>
            </InputGroupAddon>

            <input
              {...register('q')}
              className="form-control shadow-none"
              placeholder={t('mediaLib:Search images...')}
            />
          </InputGroup>
        </form>

        <button type="button" className="close" onClick={toggle}>
          <CloseSvg />
        </button>
      </div>

      <div
        ref={modalBodyRef}
        className={cs('modal-body', styles['media-lib__file-list'])}
        style={{ maxHeight: `${window.innerHeight - 200}px` }}
      >
        <div className="d-flex flex-column align-items-end mb-3">
          <button className="btn btn-primary" onClick={onAddMoreAssetsClick}>
            {t('mediaLib:Add more images')}
          </button>
        </div>

        {/* Display files and images */}
        <Row>
          {data.filesConnection.values.map((file, index) => {
            return (
              <Col md={3} xs={6} key={index} className="mb-4">
                <FileItem
                  file={file as UploadFile}
                  selected={
                    !!selectedFiles.find(
                      (selectedFile) => selectedFile === file.id,
                    )
                  }
                  onSelect={onFileSelect}
                />
              </Col>
            );
          })}
        </Row>

        {/* Pagination */}
        <Pagination
          className="mt-2"
          currentPage={page}
          perPage={perPage}
          totalCount={data.filesConnection.aggregate.count}
          listPath="images"
          onNavigate={onNavigate}
        />
      </div>

      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-outline" onClick={toggle}>
          {t('Cancel')}
        </button>

        <button className="btn btn-success" onClick={onFinishClick}>
          {t('Finish')}
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
  onSearch: PropTypes.func.isRequired,
};

export default FileList;
