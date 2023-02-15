import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import ClientManagementPage from './pages/ClientManagementPage';
import useToken from './hooks/useToken';

export default function App() {
  const [page, setPage] = useState();
  const [token] = useToken();

  useEffect(() => (token ? showClientManagementPage() : showLoginPage()), [token]);

  const showClientManagementPage = () => setPage(<ClientManagementPage showLoginPage={showLoginPage} />);
  const showLoginPage = () => setPage(<LoginPage />);

  return <div className="App">{page}</div>;
}
