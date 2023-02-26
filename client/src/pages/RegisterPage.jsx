import React from 'react';
import { AuthForm, AuthLayout } from '../components';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <AuthForm type="register" />
    </AuthLayout>
  );
};

export default RegisterPage;
