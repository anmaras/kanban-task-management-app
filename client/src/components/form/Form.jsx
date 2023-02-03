import React from 'react';
import { formInputs } from '../../utils/constants';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .min(3, 'Name need to be at least 3 chars')
    .max(20, 'Name cant be more than 20 chars'),
  email: yup.string().email('Invalid email format').required('Required'),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Password need to be at least 6 chars'),
});

const onSubmit = (values) => console.log(values);
const onSubmit2 = (values) => console.log(values, 'Test');

const Form = ({ formType, path }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      //check the prop and use the corresponding function
      onSubmit={formType === 'register' ? onSubmit : onSubmit2}
    >
      <FormikForm className="form">
        {formInputs
          .map((input) => {
            const { name, label, type } = input;
            return (
              <div key={name} className="form-control">
                <label htmlFor={name}>{label}</label>
                <Field type={type} name={name} id={name} />
                <ErrorMessage name={name} component="div" className="error" />
              </div>
            );
          })
          .filter((input) => {
            /* If the formType is register then return the form input array
           as it is, if not then filter it so it return only the email and password */
            if (formType === 'register') {
              return input;
            }
            return input.key !== 'name';
          })}
        <button type="submit">submit</button>
      </FormikForm>
    </Formik>
  );
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  // path: PropTypes.string.isRequired,
};

export default Form;
