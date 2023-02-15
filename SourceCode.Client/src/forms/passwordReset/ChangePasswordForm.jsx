import React, { useState } from 'react';
import { ButtonPrimary } from '../../components/Button';
import TextBox from '../../components/TextBox';
import useInputs from '../../hooks/useInputs';

export default function ChangePasswordForm({ showLoginForm }) {
  const [inputs, updateInputs] = useInputs({});
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    if (!inputs.password || inputs.password !== inputs.confirmPassword) {
      setError('Passwords must match');
      return;
    }
    showLoginForm();
  };

  return (
    <>
      <div className="col-span-6">
        <TextBox
          type="password"
          name="password"
          label="Password"
          value={inputs.password || ''}
          onChange={updateInputs}
        />
      </div>
      <div className="col-span-6">
        <TextBox
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={inputs.confirmPassword || ''}
          onChange={updateInputs}
        />
      </div>
      <div className="col-span-6">
        <label className="block text-sm font-medium text-gray-700">{error}</label>
        <ButtonPrimary onClick={() => handleChangePassword()}>Change Password</ButtonPrimary>
      </div>
    </>
  );
}
