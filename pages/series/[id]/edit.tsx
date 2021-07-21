import { Col, Row, FormGroup, Container } from 'reactstrap';
import Head from 'next/head';
import cs from 'classnames';
import {
  StoryDocument,
  StoryQuery,
  useUpdateStoryMutation,
} from '@/graphql/generated';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/layout/Navigation/Navigation';
import { NextPageContext } from 'next';
import client from '@/configs/apollo-client';
import Wysiwyg from '@/components/Wysiwyg/Wysiwyg';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useFormGuard from '@/hooks/form-guard';

interface Props {
  storyData: StoryQuery;
}

interface FormData {
  name: string;
  description: string;
}

const SeriesEdit = ({ storyData }: Props) => {
  const { story } = storyData;
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: story.name,
      description: story.description,
    },
  });

  const { checkUnSavedForm } = useFormGuard({
    isDirty,
    isEditForm: true,
    redirectUrl: `/series/${router.query.id}`,
  });

  const [updateStoryMutation] = useUpdateStoryMutation();

  const onSubmit = async (data: FormData) => {
    await updateStoryMutation({
      variables: {
        input: {
          data,
          where: {
            id: story.id,
          },
        },
      },
    });
    router.events.off('routeChangeStart', checkUnSavedForm);
    toast.dark(t('Update successfully.'));
    router.push(`/series/${router.query.id}`);
  };

  return (
    <>
      <Head>
        <title>{t('Update Story')}</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Navigation noHide>
          <li className="nav-item mr-3 d-flex align-items-center">
            <button
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary btn-sm"
              onClick={router.back}
            >
              {t('Cancel')}
            </button>
            <button
              disabled={isSubmitting || !isDirty}
              className="btn btn-success btn-sm"
            >
              {t('Save')}
            </button>
          </li>
        </Navigation>

        <Container>
          <Row className="mt-7">
            <Col md={10} lg={8} className="mx-auto">
              <h2 className="mb-4">{t('Update Story')}</h2>

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

              <FormGroup>
                <label>
                  <strong>{t('Description')}</strong>
                </label>

                <Wysiwyg
                  {...register('description')}
                  value={getValues('description')}
                  config={{
                    placeholder: t('Description'),
                    blockToolbar: [
                      'paragraph',
                      'heading2',
                      'heading3',
                      '|',
                      'bulletedList',
                      'numberedList',
                      '|',
                      'blockQuote',
                      '|',
                      'undo',
                      'redo',
                    ],
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </form>
    </>
  );
};

SeriesEdit.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { query } = ctx;

  const storyResult = await client.query<StoryQuery>({
    query: StoryDocument,
    variables: {
      id: query.id,
    },
  });

  return {
    storyData: storyResult.data,
  };
};

export default SeriesEdit;
