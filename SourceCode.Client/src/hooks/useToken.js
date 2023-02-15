import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export default function useToken() {
  const getToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    return token;
  };

  const saveToken = (token) => {
    if (token) {
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      sessionStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  const queryClient = useQueryClient();

  const { data: token } = useQuery(['token'], getToken);

  const { mutate: setToken } = useMutation((token) => saveToken(token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['token']);
      queryClient.refetchQueries('token', { force: true });
    },
  });

  return [token, setToken];
}
