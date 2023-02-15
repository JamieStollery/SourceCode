import React, { useState, useEffect } from 'react';
import ClientTable from '../components/ClientTable';
import EditClientForm from '../forms/client/EditClientForm';
import CreateClientForm from '../forms/client/CreateClientForm';

export default function ClientManagementPage() {
  const [sidebarComponent, setSidebarComponent] = useState([]);

  useEffect(() => showCreateForm(), []);

  const showCreateForm = () => setSidebarComponent(<CreateClientForm />);

  const showEditForm = (client) =>
    setSidebarComponent(<EditClientForm client={client} showCreateForm={showCreateForm} />);

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <div className="w-full max-w-sm lg:max-w-md flex-none">
          <div className="rounded-lg border border-gray-200 shadow-md p-4">{sidebarComponent}</div>
        </div>
        <div className="flex-1">
          <ClientTable showEditForm={showEditForm} />
        </div>
      </div>
    </div>
  );
}
