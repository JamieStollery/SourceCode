import React from 'react';
import { deleteClient } from '../repositories/ClientRepository';
import { useMutation, useQueryClient } from 'react-query';
import { getClients } from '../repositories/ClientRepository';
import { useQuery } from 'react-query';

export default function ClientTable({ showEditForm }) {
  const queryClient = useQueryClient();

  const { data: clients } = useQuery(['clients'], () => getClients());

  const { mutate } = useMutation((id) => deleteClient(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      queryClient.refetchQueries('clients', { force: true });
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Website
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Director's name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email address
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {clients && clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{client.name}</td>
              <td className="px-6 py-4">
                <a href={client.website} target="_blank">
                  {client.website}
                </a>
              </td>
              <td className="px-6 py-4">{client.directorName}</td>
              <td className="px-6 py-4">
                <a href={`mailto:${client.emailAddress}`} target="_blank">
                  {client.emailAddress}
                </a>
              </td>
              <td className="px-6 py-4">
                <span className="material-icons" onClick={() => showEditForm(client)}>
                  edit
                </span>
                <span className="material-icons" onClick={() => mutate(client.id)}>
                  delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
