import React from 'react';
import { formInputs } from '../../utils/constants';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useUserContext } from '../../context/userContext';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Name need to be at least 3 chars')
    .max(20, 'Name cant be more than 20 chars')
    .required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  password: yup
    .string()
    .min(6, 'Password need to be at least 6 chars')
    .required('Required'),
});

const onSubmit2 = (values) => console.log(values, 'Test');

const Form = ({ formType }) => {
  const { registerUser, showAlert, alertText } = useUserContext();
  //create form from formInput array check constants.jsx
  return (
    <div>
      <h2>{formType === 'register' ? 'Register' : 'Login'}</h2>
      {showAlert ? <div className="alert-message">{alertText}</div> : null}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={formType === 'register' ? registerUser : onSubmit2}
        touched
      >
        {({ touched, errors }) => (
          <FormikForm className="form">
            {formInputs
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
              })
              .filter((input) => {
                /* If the formType is register then return the form input array
           as it is, if not then filter it so it return only the email and password input */
                if (formType === 'register') {
                  return input;
                }
                return input.key !== 'name';
              })}
            <button type="submit">submit</button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default Form;
