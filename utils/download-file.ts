import axios from 'axios';

const downloadFile = async (url: string) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const { data } = await axios.get(url, {
    responseType: 'blob',
    cancelToken: source.token,
    timeout: 60000,
  });

  return new File([data], url, {
    type: data.type,
  });
};

export default downloadFile;
