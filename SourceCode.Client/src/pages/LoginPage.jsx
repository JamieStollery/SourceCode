import React, { useEffect, useState } from 'react';
import LoginForm from '../forms/login/LoginForm';
import PasswordResetForm from '../forms/passwordReset/PasswordResetForm';
import SignUpForm from '../forms/login/SignUpForm';

export default function LoginPage() {
  const [controls, setControls] = useState();

  useEffect(() => showLoginForm(), []);

  const showLoginForm = () =>
    setControls(<LoginForm showSignUpForm={showSignUpForm} showPasswordResetForm={showPasswordResetForm} />);

  const showSignUpForm = () => setControls(<SignUpForm showLoginForm={showLoginForm} />);

  const showPasswordResetForm = () => setControls(<PasswordResetForm showLoginForm={showLoginForm} />);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">{controls}</div>
    </div>
  );
}
