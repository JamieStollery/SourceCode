import React, { useState, useEffect } from 'react';
import SendCodeForm from './SendCodeForm';
import VerifyCodeForm from './VerifyCodeForm';
import ChangePasswordForm from './ChangePasswordForm';
import { ButtonSecondary } from '../../components/Button';

export default function PasswordResetForm({ showLoginForm }) {
  const [controls, setControls] = useState();

  useEffect(() => showSendCodeForm(), []);

  const showSendCodeForm = () => setControls(<SendCodeForm showVerifyCodeForm={showVerifyCodeForm} />);

  const showVerifyCodeForm = () => setControls(<VerifyCodeForm showChangePasswordForm={showChangePasswordForm} />);

  const showChangePasswordForm = () => setControls(<ChangePasswordForm showLoginForm={showLoginForm} />);

  return (
    <div className="grid grid-cols-6 gap-4">
      <h1 className="col-span-5 text-3xl font-bold">Reset Password</h1>
      <div className="col-span-1">
        <ButtonSecondary onClick={() => showLoginForm()}>Back</ButtonSecondary>
      </div>
      {controls}
    </div>
  );
}
