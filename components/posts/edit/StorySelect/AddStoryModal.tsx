import React, { useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal, ModalBody, Row, Col, FormGroup, ModalFooter } from 'reactstrap';
import cs from 'classnames';
import CloseSvg from '@/components/svgs/CloseSvg';
import { Story, useCreateStoryMutation } from '@/graphql/generated';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import { toast } from 'react-toastify';

interface Props {
  newStoryAdded: (story: Story) => void;
}

export interface AddStoryModalRef {
  toggleOpen: () => void;
}

interface FormData {
  name: string;
  description?: string;
  image?: string;
  user: string;
}

const AddStoryModal = React.forwardRef<AddStoryModalRef, Props>(
  ({ newStoryAdded }, ref) => {
    const { t } = useTranslation();
    const me = useSelector(selectMe);
    const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<FormData>({
      defaultValues: {
        user: me.value?.id,
        name: null,
        description: null,
      },
    });
    const [isOpen, setIsOpen] = useState(false);
    const [createStoryMutation, { loading }] = useCreateStoryMutation();

    useImperativeHandle(ref, () => ({
      toggleOpen,
    }));

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      // Prevent submitting parent form.
      if (e) {
        e.preventDefault();
        if (typeof e.stopPropagation === 'function') {
          e.stopPropagation();
        }
      }

      return handleSubmit(async (data: FormData) => {
        try {
          const { data: createStoryData } = await createStoryMutation({
            variables: {
              input: {
                data,
              },
            },
          });

          newStoryAdded(createStoryData.createStory.story as Story);
        } catch (error) {
          toast.error(error.message);
        }
      })(e);
    };

    const toggleOpen = () => {
      setIsOpen((prev) => !prev);
    };

    return (
      <Modal isOpen={isOpen} size="lg" toggle={toggleOpen}>
        <form onSubmit={onSubmit}>
          <div className="modal-header">
            <h5>{t('Create new Story')}</h5>

            <button
              type="button"
              className="close"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseSvg />
            </button>
          </div>

          <ModalBody>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <label>
                    <strong>{t('Name')}</strong>
                  </label>

                  <input
                    {...register('name', {
                      required: {
                        value: true,
                        message: t('requiredMessage', { name: t('Name') }),
                      },
                    })}
                    className={cs('form-control', {
                      'is-invalid': errors.name,
                    })}
                  />

                  <small className="invalid-feedback">
                    {errors.name?.message}
                  </small>
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <label>
                    <strong>{t('Description')}</strong>
                  </label>

                  <textarea
                    {...register('description')}
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>

          <ModalFooter>
            <button
              disabled={isSubmitting || loading}
              className="btn btn-success"
            >
              {t('Save')}
            </button>
          </ModalFooter>
        </form>
      </Modal>
    );
  },
);

AddStoryModal.displayName = 'AddStoryModal';

export default AddStoryModal;
