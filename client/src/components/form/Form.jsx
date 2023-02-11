import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formInputs } from '../../utils/constants';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useUserContext } from '../../context/userContext';
import { Spinner } from '../index';
import style from './Form.module.scss';
import { motion } from 'framer-motion';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

//schema for register
const validationSchemaRegister = yup.object({
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
const validationSchemaLogin = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email('Invalid email format').required('Required'),
  password: yup
    .string()
    .min(6, 'Password need to be at least 6 chars')
    .required('Required'),
});

const Form = ({ formType }) => {
  const { registerUser, loginUser, user, isLoading } = useUserContext();
  const navigate = useNavigate();

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
      className={style.formContainer}
    >
      <h2 className={[style['formContainer__title']].join(' ')}>
        {formType === 'register' ? 'Register to Kanban' : 'Login to Kanban'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={
          formType === 'register'
            ? validationSchemaRegister
            : validationSchemaLogin
        }
        onSubmit={formType === 'register' ? registerUser : loginUser}
      >
        {({ touched, errors }) => (
          <FormikForm className={style['formContainer__form']}>
            {formInputs
              .filter((input) => {
                /* If the formType is register then return the form input array
           as it is, if not then filter it so it return only the email and password input */
                if (formType === 'register') {
                  return input;
                }
                return input.name !== 'name';
              })
              .map((input) => {
                const { name, label, type, placeholder } = input;
                return (
                  <div
                    key={name}
                    className={style['formContainer__form-control']}
                  >
                    <label
                      className={style['formContainer__label']}
                      htmlFor={name}
                    >
                      {label}
                    </label>
                    <Field
                      placeholder={placeholder}
                      type={type}
                      name={name}
                      id={name}
                      className={
                        touched[name] && errors[name]
                          ? style['formContainer__input--invalid']
                          : style['formContainer__input']
                      }
                    />
                    <div className={style['formContainer__error']}>
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
              {isLoading ? <Spinner /> : formType}
            </button>
          </FormikForm>
        )}
      </Formik>
      <div className={style['formContainer__redirect-container']}>
        <p className={style['formContainer__redirect-text']}>
          {formType === 'register'
            ? 'Already have an account?'
            : 'Need an account?'}
        </p>
        <Link
          to={formType === 'register' ? '/login' : '/register'}
          className={style['formContainer__redirect-link']}
        >
          {formType === 'register' ? 'Login' : 'Register'}
        </Link>
      </div>
    </motion.article>
  );
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default Form;
