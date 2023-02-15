import React from 'react';
import { ButtonSecondary } from '../../components/Button';
import { updateClient } from '../../repositories/ClientRepository';
import ClientForm from './ClientForm';
import { useMutation, useQueryClient } from 'react-query';

export default function EditClientForm({ client, showCreateForm }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((client) => updateClient(client), {
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      queryClient.refetchQueries('clients', { force: true });
      showCreateForm();
    },
  });

  return (
    <ClientForm client={client} onSubmit={(client) => mutate(client)}>
      <h1 className="col-span-4 text-3xl font-bold">Edit Client</h1>
      <div className="col-span-2">
        <ButtonSecondary onClick={showCreateForm}>Back</ButtonSecondary>
      </div>
      <p className="col-span-6">Edit client {client.id}</p>
    </ClientForm>
  );
}
