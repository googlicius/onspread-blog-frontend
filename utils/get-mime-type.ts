const getMimeType = (mime: string) => {
  if (!mime) {
    return 'file';
  }

  const type = mime.split(/[\s/]+/)[0];

  if (type === 'image' || type === 'video') {
    return type;
  }

  return 'file';
};

export default getMimeType;
