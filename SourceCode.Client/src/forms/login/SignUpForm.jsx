import React from 'react';
import useInputs from '../../hooks/useInputs';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button';
import TextBox from '../../components/TextBox';

export default function SignUpForm({ showLoginForm }) {
  const [inputs, updateInputs] = useInputs({});

  const handleSignUp = async () => {
    showLoginForm();
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <h1 className="col-span-5 text-3xl font-bold">Sign Up</h1>
      <div className="col-span-1">
        <ButtonSecondary onClick={() => showLoginForm()}>Back</ButtonSecondary>
      </div>
      <div className="col-span-6">
        <TextBox type="text" name="name" label="Name" value={inputs.name || ''} onChange={updateInputs} />
      </div>
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
        <TextBox
          type="password"
          name="password"
          label="Password"
          value={inputs.password || ''}
          onChange={updateInputs}
        />
      </div>
      <div className="col-span-6">
        <ButtonPrimary onClick={() => handleSignUp()}>Sign up</ButtonPrimary>
      </div>
    </div>
  );
}
