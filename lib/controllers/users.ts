import type { AxiosResponse } from 'axios';
import { axiosClient } from './api/createAxios';

let currentUser: {};

async function getSpecificUser(userId: number): Promise<void> {
  try {
    const getUsersResponse: AxiosResponse = await axiosClient.get(`/users/${userId}`);
    currentUser = getUsersResponse.data;
  } catch (error) {
    console.log(error);
  }
};

async function getUsers(): Promise<[]> {
  try {
    const getUsersResponse: AxiosResponse = await axiosClient.get('/users');
    const users: [] = getUsersResponse.data;
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

async function getCurrentUser(): Promise<{}> {
  if (!currentUser) {
    await getSpecificUser(2);
  }
  return currentUser;
};

export { getUsers, getCurrentUser }
