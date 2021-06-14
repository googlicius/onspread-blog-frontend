import {
  UploadFile,
  useFilesConnectionQuery,
  useMutipleUploadMutation,
} from '@/graphql/generated';
import { Modal } from 'reactstrap';
import styles from './styles.module.scss';
import FileList from './FileList';
import { useEffect, useMemo, useState } from 'react';
import Upload from './Upload';
import UploadList from './UploadList';
import { perPage } from './constants';

interface Props {
  isOpen: boolean;
  mutiple?: boolean;
  toggle: () => void;
  onChange?: (file: UploadFile | UploadFile[]) => void;
}

const MediaLib = ({ isOpen, mutiple = false, toggle, onChange }: Props) => {
  const [screen, setScreen] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const uploadFiles: Partial<UploadFile>[] = useMemo(() => {
    return files.map((file) => {
      return {
        mime: file.type,
        size: file.size / 1000,
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });
  }, [files]);

  const { data, refetch } = useFilesConnectionQuery({
    variables: {
      limit: perPage,
      sort: 'updatedAt:DESC',
    },
  });

  const [mutipleUploadMutation] = useMutipleUploadMutation({
    onCompleted: () => {
      refetch();
      setScreen(1);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return function cleanUp() {
      uploadFiles.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [uploadFiles]);

  const handleAddMoreAssetsClick = () => {
    setScreen(2);
  };

  const backtoScreen1 = () => {
    setScreen(1);
  };

  const handleFilesChange = (files: File[]) => {
    if (files.length > 0) {
      setFiles(files);
      setScreen(3);
    }
  };

  const handleUpload = () => {
    mutipleUploadMutation({
      variables: {
        files,
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

    toggle();
  };

  const handleDeleteFile = () => {
    // Temporary clear all.
    setFiles([]);
    setScreen(2);
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
      toggle={toggle}
      onClosed={backtoScreen1}
      size="lg"
      className={styles['media-lib']}
    >
      {/* Kind of switch case */}
      {
        {
          1: data && (
            <FileList
              data={data}
              page={page}
              selectedFiles={selectedFiles}
              toggle={toggle}
              onSearch={handleSearch}
              onNavigate={handleNavigate}
              onFileSelect={handleFileSelect}
              onFinishClick={handleFinishClick}
              onAddMoreAssetsClick={handleAddMoreAssetsClick}
            />
          ),
          2: (
            <Upload
              toggle={toggle}
              onBack={backtoScreen1}
              onFilesChange={handleFilesChange}
            />
          ),
          3: (
            <UploadList
              uploadFiles={uploadFiles}
              toggle={toggle}
              onBack={backtoScreen1}
              onUpload={handleUpload}
              onDelete={handleDeleteFile}
            />
          ),
        }[screen]
      }
    </Modal>
  );
};

export default MediaLib;
