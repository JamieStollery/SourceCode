import React from 'react';
import { ButtonPrimary } from '../../components/Button';
import TextBox from '../../components/TextBox';
import useInputs from '../../hooks/useInputs';

export default function VerifyCodeForm({ showChangePasswordForm }) {
  const [inputs, updateInputs] = useInputs({});

  const handleVerifyCode = async () => {
    showChangePasswordForm();
  };

  return (
    <>
      <p className="col-span-6">Enter the code we sent to the email address associated with your account</p>
      <div className="col-span-6">
        <TextBox
          type="text"
          name="verificationCode"
          label="Verification Code"
          value={inputs.verificationCode || ''}
          onChange={updateInputs}
        />
      </div>
      <div className="col-span-6">
        <ButtonPrimary onClick={() => handleVerifyCode()}>Continue</ButtonPrimary>
      </div>
    </>
  );
}
