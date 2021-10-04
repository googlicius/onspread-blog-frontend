import { UploadFile } from '@/graphql/generated';
import getMimeType from '@/utils/get-mime-type';
import { useMemo } from 'react';

interface Props {
  file: UploadFile;
}

const ImageCard = ({ file }: Props) => {
  const { mime, url, formats, provider } = file;

  const thumbnailImage = useMemo(() => {
    if (getMimeType(mime) !== 'image') {
      return null;
    }
    const path = formats?.small?.url || url;
    return provider === 'local'
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + path
      : path;
  }, [formats, url, provider, mime]);

  return <img src={thumbnailImage} />;
};

export default ImageCard;
