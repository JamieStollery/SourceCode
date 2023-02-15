import axios from 'axios';

// Create
export const createClient = (client) => axios.post('client', client);

//Read
export const getClients = async () => {
  const response = await axios.get('client');
  return response.data;
};

// Update
export const updateClient = (client) => axios.put('client', client);

// Delete
export const deleteClient = (id) => axios.delete(`Client/${id}`);
