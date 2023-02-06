import React, { useEffect } from 'react';
import { formInputs } from '../../utils/constants';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useUserContext } from '../../context/userContext';
import { PulseLoader } from 'react-spinners';

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
    <div>
      <h2>{formType}</h2>
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
          <FormikForm className="form">
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
                const { name, label, type } = input;
                return (
                  <div key={name} className="form-control">
                    <label htmlFor={name}>{label}</label>
                    <Field
                      type={type}
                      name={name}
                      id={name}
                      className={
                        touched[name] && errors[name] ? 'not-valid' : 'valid'
                      }
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="error"
                    />
                  </div>
                );
              })}
            <button type="submit" disabled={isLoading}>
              {isLoading ? <PulseLoader size={5} /> : formType}
            </button>
          </FormikForm>
        )}
      </Formik>
      <Link to={formType === 'register' ? '/login' : '/register'}>
        {formType}
      </Link>
    </div>
  );
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default Form;
