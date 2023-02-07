import React from 'react';
import { Form, AuthLayout } from '../components';

const LoginPage = () => {
  return (
    <AuthLayout>
      <Form formType="login" />
    </AuthLayout>
  );
};

export default LoginPage;
