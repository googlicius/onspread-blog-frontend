import { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import cs from 'classnames';
import downloadFile from '@/utils/download-file';

interface Props {
  onFilesChange: (files: File[]) => void;
}

export interface UploadUrlRef {
  textArea: HTMLTextAreaElement;
  submit: () => void;
}

interface UrlUploadFormData {
  urls: string;
}

const urlValidation = (url: string) => {
  const urls = url.split('\n');
  try {
    urls.forEach((url) => {
      new URL(url);
    });
    return true;
  } catch (error) {
    return 'Invalid URL.';
  }
};

const UploadUrl = forwardRef<UploadUrlRef, Props>(({ onFilesChange }, ref) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UrlUploadFormData>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (formData: UrlUploadFormData) => {
    const urls: string[] = formData.urls.split('\n');
    const filePromises = urls.map(async (url) => {
      try {
        return await downloadFile(url);
      } catch (error) {
        return null;
      }
    });
    const files: File[] = await Promise.all(filePromises);
    const validFiles: File[] = files.filter((file) => file !== null);
    if (validFiles.length === 0) {
      setError('urls', {
        message: 'Canot download any image.',
      });
    }
    onFilesChange(validFiles);
  };

  useImperativeHandle(ref, () => ({
    textArea: textareaRef.current,
    submit: handleSubmit(onSubmit),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>URL</label>
        <textarea
          {...register('urls', {
            required: { value: true, message: 'Url is required.' },
            validate: {
              url: urlValidation,
            },
          })}
          ref={textareaRef}
          className={cs('form-control shadow-none', {
            'is-invalid': !!errors.urls,
          })}
        />
        <div className="invalid-feedback">{errors.urls?.message}</div>
        <small className="form-text text-muted">
          Separate your URL links by a carriage return.
        </small>
      </div>
    </form>
  );
});

UploadUrl.displayName = 'UploadUrl';

UploadUrl.propTypes = {
  onFilesChange: PropTypes.func.isRequired,
};

export default UploadUrl;
