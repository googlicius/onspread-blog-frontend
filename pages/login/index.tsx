import { useEffect, useRef } from 'react';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import cs from 'classnames';
import { selectMe, setLoggedInUser } from '@/redux/meProducer';
import { useLoginMutation, UsersPermissionsMe } from '@/graphql/generated';
import Navigation from '@/components/layout/Navigation/Navigation';
import styles from './index.module.scss';
import HandLizard from '@/components/svgs/HandLizard';

interface FormData {
  identifier: string;
  password: string;
}

const Login: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [loginMutation, { error }] = useLoginMutation();
  const router = useRouter();
  const me = useSelector(selectMe);
  const dispatch = useDispatch();

  const loading = isSubmitting || me.status === 'loading';

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [emailInputRef]);

  useEffect(() => {
    if (me.value) {
      if (router.query['next']) {
        router.push(router.query['next'] as string);
        return;
      }
      if (router.query['back']) {
        router.back();
        return;
      }
      router.push('/');
    }
  }, [me]);

  const onSubmit = async (formData: FormData) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: formData,
        },
      });
      dispatch(setLoggedInUser(data.login.user as UsersPermissionsMe));
    } catch (err) {
      // Throw error
    }
  };

  return (
    <>
      <Head>
        <title>{t('Login')}</title>
      </Head>

      <Navigation loginText={<HandLizard />} />

      <Container className="mt-7">
        <Row className="row">
          <Col md={5} className="mx-auto">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>{t('Login')}</h1>
                </div>
              </div>

              {error && (
                <div className="alert alert-warning">
                  {t('Email or password is invalid')}
                </div>
              )}

              {router.query['next'] ||
                (router.query['back'] && (
                  <div className="alert alert-info">
                    {t('You need to login to continue')}
                  </div>
                ))}

              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <label>{t('Email address')}</label>

                  <input
                    {...register('identifier', {
                      required: {
                        value: true,
                        message: t('requiredMessage', { name: t('Email') }),
                      },
                    })}
                    ref={emailInputRef}
                    type="email"
                    className={cs('form-control', {
                      'is-invalid': !!errors.identifier,
                    })}
                    placeholder={t('Enter email')}
                  />

                  <div className="invalid-feedback">
                    {errors.identifier?.message}
                  </div>
                </FormGroup>

                <FormGroup>
                  <label>{t('Password')}</label>

                  <input
                    type="password"
                    {...register('password', {
                      required: {
                        value: true,
                        message: t('requiredMessage', { name: t('Password') }),
                      },
                    })}
                    className={cs('form-control', {
                      'is-invalid': !!errors.password,
                    })}
                    placeholder={t('Enter Password')}
                  />

                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </FormGroup>

                <FormGroup>
                  <small className="text-center">
                    <Trans i18nKey="termOfUseAcceptance">
                      By signing up you accept our <a href="#">term of use</a>.
                    </Trans>
                  </small>
                </FormGroup>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                  >
                    {loading && (
                      <div
                        className="spinner-border spinner-border-sm mr-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    {t('Login')}
                  </button>
                </div>

                <div className={`mt-5 ${styles['login-or']}`}>
                  <hr className={styles['hr-or']} />
                  <span className={styles['span-or']}>{t('Or')}</span>
                </div>

                <div className="mb-3">
                  <p className="text-center">
                    <a href="#" className={` btn mybtn ${styles.google}`}>
                      <i className="fa fa-google-plus"></i>{' '}
                      {t('Signup using Google')}
                    </a>
                  </p>
                </div>

                <FormGroup>
                  <p className="text-center">
                    <Trans i18nKey="dontHaveAccount">
                      Don&apos;t have account?
                      <a href="#">Sign up here</a>
                    </Trans>
                  </p>
                </FormGroup>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
