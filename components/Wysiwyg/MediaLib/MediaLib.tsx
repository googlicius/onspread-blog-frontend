import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import {
  UploadFile,
  useFilesConnectionQuery,
  useMutipleUploadMutation,
} from '@/graphql/generated';
import styles from './styles.module.scss';
import FileList from './FileList';
import Upload from './Upload';
import UploadList from './UploadList';
import { perPage } from './constants';
import ID from '@/utils/random-id';

interface Props {
  mutiple?: boolean;
  onChange: (file: UploadFile | UploadFile[]) => void;
}

export interface MediaLibRef {
  isOpen: boolean;
  toggleOpen: () => void;
}

interface TempFile {
  file: File;
  tmpId: string;
}

type Screen = 'fileList' | 'upload' | 'uploadList';

const MediaLib = forwardRef<MediaLibRef, Props>(
  ({ mutiple = false, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [screen, setScreen] = useState<Screen>('fileList');
    const [files, setFiles] = useState<TempFile[]>([]);
    const [page, setPage] = useState(1);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const uploadFiles: Partial<UploadFile>[] = useMemo(() => {
      return files.map(({ file, tmpId }) => {
        return {
          mime: file.type,
          size: file.size / 1000,
          name: file.name,
          url: URL.createObjectURL(file),
          id: tmpId,
        };
      });
    }, [files]);

    const { data, refetch } = useFilesConnectionQuery({
      variables: {
        limit: perPage,
        sort: 'updatedAt:desc',
      },
    });

    const [mutipleUploadMutation] = useMutipleUploadMutation({
      onCompleted: () => {
        refetch();
        setScreen('fileList');
      },
    });

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks
      return function cleanUp() {
        uploadFiles.forEach((file) => URL.revokeObjectURL(file.url));
      };
    }, [uploadFiles]);

    useImperativeHandle(ref, () => ({
      isOpen,
      toggleOpen: handleToggleOpen,
    }));

    const handleAddMoreAssetsClick = () => {
      setScreen('upload');
    };

    const backtoFileList = () => {
      setScreen('fileList');
    };

    const handleToggleOpen = () => {
      setIsOpen((prev) => !prev);
    };

    const handleFilesChange = (files: File[]) => {
      if (files.length > 0) {
        setFiles(
          files.map((file) => ({
            tmpId: `temp_${ID()}`,
            file,
          })),
        );
        setScreen('uploadList');
      }
    };

    const handleUpload = () => {
      const uploadFiles = files.map((tempFile) => tempFile.file);

      mutipleUploadMutation({
        variables: {
          files: uploadFiles,
        },
      });
    };

    const handleNavigate = (page: number) => {
      setPage(page);
      refetch({
        start: (page - 1) * perPage,
      });
    };

    const handleFileSelect = (file: UploadFile) => {
      setSelectedFiles([file.id]);
    };

    const handleFinishClick = () => {
      if (!mutiple && selectedFiles.length > 0) {
        const file = data.filesConnection.values.find(
          (uploadFile) => uploadFile.id === selectedFiles[0],
        ) as UploadFile;
        onChange(file);
        setSelectedFiles([]);
      }

      handleToggleOpen();
    };

    const handleDeleteFile = (file: UploadFile) => {
      const newFiles = files.filter(({ tmpId }) => tmpId !== file.id);
      setFiles(newFiles);
      if (newFiles.length === 0) {
        setScreen('upload');
      }
    };

    const handleSearch = (searchStr: string) => {
      refetch({
        where: {
          name_contains: searchStr,
        },
      });
    };

    return (
      <Modal
        isOpen={isOpen}
        toggle={handleToggleOpen}
        onClosed={backtoFileList}
        size="lg"
        className={styles['media-lib']}
      >
        {/* Kind of switch case */}
        {
          {
            fileList: data && (
              <FileList
                data={data}
                page={page}
                selectedFiles={selectedFiles}
                toggle={handleToggleOpen}
                onSearch={handleSearch}
                onNavigate={handleNavigate}
                onFileSelect={handleFileSelect}
                onFinishClick={handleFinishClick}
                onAddMoreAssetsClick={handleAddMoreAssetsClick}
              />
            ),
            upload: (
              <Upload
                toggle={handleToggleOpen}
                onBack={backtoFileList}
                onFilesChange={handleFilesChange}
              />
            ),
            uploadList: (
              <UploadList
                uploadFiles={uploadFiles}
                toggle={handleToggleOpen}
                onBack={backtoFileList}
                onUpload={handleUpload}
                onDelete={handleDeleteFile}
              />
            ),
          }[screen]
        }
      </Modal>
    );
  },
);

MediaLib.displayName = 'MediaLib';

MediaLib.propTypes = {
  mutiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default MediaLib;
