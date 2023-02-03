import React from 'react';
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

const Form = ({ type, path, axiosFunc }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm className="form">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" id="password" />
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <button type="submit">submit</button>
      </FormikForm>
    </Formik>
  );
};

// Form.propTypes = {
//   type: PropTypes.string.isRequired,
//   path: PropTypes.string.isRequired,
//   axiosFunc: PropTypes.func.isRequired,
// };

export default Form;
