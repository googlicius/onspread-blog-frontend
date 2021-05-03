import { useEffect, useRef } from 'react';
import { useLoginMutation, useMeLazyQuery } from '@/graphql/generated';
import Head from 'next/head';
import Navigation from '@/components/layout/Navigation';
import cs from 'classnames';
import { setLoggedInUser } from '@/redux/meProducer';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface IFormData {
  identifier: string;
  password: string;
}

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loginMutation, { error }] = useLoginMutation();
  const [meQuery, { data, loading }] = useMeLazyQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (formData: IFormData) => {
    try {
      const res = await loginMutation({
        variables: {
          input: formData,
        },
      });
      localStorage.setItem(
        process.env.NEXT_PUBLIC_JWT_TOKEN_KEY,
        res.data.login.jwt,
      );
      meQuery();
    } catch (err) {
      // Throw error
    }
  };

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [emailInputRef]);

  useEffect(() => {
    if (data) {
      dispatch(setLoggedInUser(data.me));
      router.push('/posts');
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Navigation isDark={true} />

      <div className="container">
        <div className="row mt-5">
          <div className="col-md-5 mx-auto">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Login</h1>
                </div>
              </div>

              {error && (
                <div className="alert alert-warning">
                  Email or password is invalid
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Email address</label>

                  <input
                    ref={emailInputRef}
                    {...register('identifier', {
                      required: { value: true, message: 'Email is required' },
                    })}
                    type="email"
                    className={cs('form-control', {
                      'is-invalid': !!errors.identifier,
                    })}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <div className="invalid-feedback">
                    {errors.identifier?.message}
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    })}
                    className={cs('form-control', {
                      'is-invalid': !!errors.password,
                    })}
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our <a href="#">Terms Of Use</a>
                  </p>
                </div>

                <div className="text-center ">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                  >
                    Login
                  </button>
                </div>

                <div className={`mt-5 ${styles['login-or']}`}>
                  <hr className={styles['hr-or']} />
                  <span className={styles['span-or']}>or</span>
                </div>

                <div className="mb-3">
                  <p className="text-center">
                    <a href="#" className={` btn mybtn ${styles.google}`}>
                      <i className="fa fa-google-plus"></i> Signup using Google
                    </a>
                  </p>
                </div>

                <div className="form-group">
                  <p className="text-center">
                    Don't have account?{' '}
                    <a href="#" id="signup">
                      Sign up here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
