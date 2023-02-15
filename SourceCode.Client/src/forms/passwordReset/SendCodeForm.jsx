import React from 'react';
import { ButtonPrimary } from '../../components/Button';
import TextBox from '../../components/TextBox';
import useInputs from '../../hooks/useInputs';

export default function SendCodeForm({ showVerifyCodeForm }) {
  const [inputs, updateInputs] = useInputs({});

  const handleSendCode = async () => {
    showVerifyCodeForm();
  };

  return (
    <>
      <p className="col-span-6">
        Enter the email address associated with your account, and we'll send you a link to reset your password
      </p>
      <div className="col-span-6">
        <TextBox
          type="email"
          name="emailAddress"
          label="Email address"
          value={inputs.emailAddress || ''}
          onChange={updateInputs}
        />
      </div>
      <div className="col-span-6">
        <ButtonPrimary onClick={() => handleSendCode()}>Reset Password</ButtonPrimary>
      </div>
    </>
  );
}
