import React, { useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal, ModalBody, Row, Col, FormGroup, ModalFooter } from 'reactstrap';
import cs from 'classnames';
import CloseSvg from '@/components/svgs/CloseSvg';
import { Category, useCreateCategoryMutation } from '@/graphql/generated';
import { toast } from 'react-toastify';

interface Props {
  newCategoryAdded: (cate: Category) => void;
}

export interface AddCategoryModalRef {
  toggleOpen: () => void;
}

interface FormData {
  name: string;
  description?: string;
  image?: string;
}

const AddCategoryModal = React.forwardRef<AddCategoryModalRef, Props>(
  ({ newCategoryAdded }, ref) => {
    const { t } = useTranslation();
    const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<FormData>({
      defaultValues: {
        name: null,
        description: null,
      },
    });
    const [isOpen, setIsOpen] = useState(false);
    const [createCategoryMutation, { loading }] = useCreateCategoryMutation();

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
          const { data: createCategoryData } = await createCategoryMutation({
            variables: {
              input: {
                data,
              },
            },
          });

          newCategoryAdded(
            createCategoryData.createCategory.category as Category,
          );
        } catch (error) {
          toast.error(error.message);
        }
      })(e);
    };

    const toggleOpen = () => {
      setIsOpen((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
      toggleOpen,
    }));

    return (
      <Modal isOpen={isOpen} size="lg" toggle={toggleOpen}>
        <form onSubmit={onSubmit}>
          <div className="modal-header">
            <h5>{t('Create new Category')}</h5>

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
                        message: t('Name is required.'),
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

AddCategoryModal.displayName = 'AddCategoryModal';

export default AddCategoryModal;
