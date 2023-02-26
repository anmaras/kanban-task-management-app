import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formInputs } from '../../utils/constants';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useUserContext } from '../../context/userContext';
import { Spinner } from '../index';
import style from './AuthForm.module.scss';
import { motion } from 'framer-motion';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

//schema for register
const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, 'Name need to be at least 3 chars')
    .max(20, 'Name cant be more than 20 chars')
    .required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  password: yup
    .string()
    .min(6, 'Password need to be at least 6 chars')
    .required('Required'),
});

//schema for login
const loginSchema = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email('Invalid email format').required('Required'),
  password: yup
    .string()
    .min(6, 'Password need to be at least 6 chars')
    .required('Required'),
});

const AuthForm = ({ type }) => {
  const {
    registerUser,
    loginUser,
    user,
    isLoading,
    loginTestUser,
    demoIsLoading,
  } = useUserContext();
  const navigate = useNavigate();
  const title = type === 'register' ? 'Register to Kanban' : 'Login to Kanban';
  const schema = type === 'register' ? registerSchema : loginSchema;
  const onSubmit = type === 'register' ? registerUser : loginUser;
  const toPath = type === 'register' ? '/login' : '/register';
  const linkTitle = type === 'register' ? 'Login' : 'Register';
  const message = type === 'register' ? 'Have an account?' : 'Need an account?';
  const loginBtnContent = isLoading ? <Spinner /> : type;
  const demoLoginBtnContext = demoIsLoading ? (
    <Spinner color="#5fc7a8" />
  ) : (
    'Test The App'
  );

  //after user register or login navigate to the dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  //create form from formInput array check constants.jsx
  return (
    <motion.article
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      className={style.article}
    >
      <h2 className={[style['article__title']].join(' ')}>{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => (
          <FormikForm className={style['article__form']}>
            {formInputs
              .filter((input) => {
                /* If the type is register then return the form input array
           as it is, if not then filter it so it return only the email and password input */
                if (type === 'register') {
                  return input;
                }
                return input.name !== 'name';
              })
              .map((input) => {
                const { name, label, type, placeholder } = input;
                const notValid = touched[name] && errors[name];
                return (
                  <div key={name} className={style['article__form-control']}>
                    <label className={style['article__label']} htmlFor={name}>
                      {label}
                    </label>
                    <Field
                      placeholder={placeholder}
                      type={type}
                      name={name}
                      id={name}
                      className={
                        notValid
                          ? style['article__input--invalid']
                          : style['article__input']
                      }
                    />
                    <div className={style['article__error']}>
                      <ErrorMessage name={name} component="div" />
                    </div>
                  </div>
                );
              })}
            <button
              className="button button--auth"
              type="submit"
              disabled={isLoading}
            >
              {loginBtnContent}
            </button>
            <button
              className="button button--auth-demo"
              type="button"
              disabled={isLoading}
              onClick={loginTestUser}
            >
              {demoLoginBtnContext}
            </button>
          </FormikForm>
        )}
      </Formik>
      <div className={style['article__redirect-container']}>
        <p className={style['article__redirect-text']}>{message}</p>
        <Link to={toPath} className={style['article__redirect-link']}>
          {linkTitle}
        </Link>
      </div>
    </motion.article>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthForm;
