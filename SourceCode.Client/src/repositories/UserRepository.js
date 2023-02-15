import axios from 'axios';

export const login = (user) => axios.post('login', user);

export const changePassword = () => {};
