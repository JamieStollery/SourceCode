import React from 'react';
import useInputs from '../../hooks/useInputs';
import { ButtonPrimary } from '../../components/Button';
import TextBox from '../../components/TextBox';

export default function ClientForm({ client, children, onSubmit }) {
  const [inputs, updateInputs] = useInputs(client);

  return (
    <div className="grid grid-cols-6 gap-4">
      {children}
      <div className="col-span-6">
        <TextBox type="text" name="name" label="Name" value={inputs.name || ''} onChange={updateInputs} />
      </div>
      <div className="col-span-6">
        <TextBox type="text" name="website" label="Website" value={inputs.website || ''} onChange={updateInputs} />
      </div>
      <div className="col-span-6">
        <TextBox
          type="text"
          name="directorName"
          label="Director's name"
          value={inputs.directorName || ''}
          onChange={updateInputs}
        />
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
        <ButtonPrimary onClick={() => onSubmit(inputs)}>Submit</ButtonPrimary>
      </div>
    </div>
  );
}
