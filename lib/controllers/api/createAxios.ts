import axios from 'axios';

// const config: AxiosRequestConfig = {
//   headers: {
//     'Accept': 'application/vnd.github+json',
//   } as RawAxiosRequestHeaders,
// };

export const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});