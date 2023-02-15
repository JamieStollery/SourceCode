import React from 'react';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button';
import TextBox from '../../components/TextBox';
import useInputs from '../../hooks/useInputs';
import { useMutation } from 'react-query';
import { login } from '../../repositories/UserRepository';
import useToken from '../../hooks/useToken';

export default function LoginForm({ showSignUpForm, showPasswordResetForm }) {
  const [inputs, updateInputs] = useInputs({});
  const [, setToken] = useToken();

  const { mutate } = useMutation((user) => login(user), {
    onSuccess: ({ data }) => {
      setToken(data.token);
    },
  });

  return (
    <div className="grid grid-cols-6 gap-4">
      <h1 className="col-span-6 text-3xl font-bold">Login</h1>
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
        <ButtonPrimary onClick={() => mutate(inputs)}>Login</ButtonPrimary>
      </div>
      <div className="col-span-3">
        <ButtonSecondary onClick={() => showSignUpForm()}>Sign up</ButtonSecondary>
      </div>
      <div className="col-span-3">
        <ButtonSecondary onClick={() => showPasswordResetForm()}>Forgot password</ButtonSecondary>
      </div>
    </div>
  );
}
