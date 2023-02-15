import React from 'react';
import { createClient } from '../../repositories/ClientRepository';
import ClientForm from './ClientForm';
import { useMutation, useQueryClient } from 'react-query';

export default function CreateClientForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((client) => createClient(client), {
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      queryClient.refetchQueries('clients', { force: true });
    },
  });

  return (
    <ClientForm client={{}} onSubmit={(client) => mutate(client)}>
      <h1 className="col-span-5 text-3xl font-bold">Create Client</h1>
      <p className="col-span-6">Create new client</p>
    </ClientForm>
  );
}
