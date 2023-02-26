import React from 'react';
import { AuthForm, AuthLayout } from '../components';

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthForm type="login" />
    </AuthLayout>
  );
};

export default LoginPage;
