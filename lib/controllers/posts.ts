import { all, type AxiosResponse } from 'axios';
import { axiosClient } from './api/createAxios';
import { getCurrentUser, getUsers } from './users';
import type { IPost } from '../models/post';

let allPost: any[];

async function mapPost() {
  const users: any[] = await getUsers()
  allPost = allPost.map((post) => {
    const foundUser = users.find((user) => user.id == post.userId)
    post.authorUsername = foundUser.username
    post.authorName = foundUser.name
    return post
  })
}

async function getPosts(): Promise<[]> {
  try {
    const getPostsResponse: AxiosResponse = await axiosClient.get('/posts');
    const posts: [] = getPostsResponse.data;
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

async function getAllPosts(): Promise<any[]> {
  if (!allPost || allPost.length <= 0) {
    allPost = await getPosts();
    //reduce to one post per person
    allPost = allPost.filter((value: { userId: any; }, index: any, self: any[]) =>
      index === self.findIndex((t: { userId: any; }) => (
        t.userId === value.userId
      )))
    await mapPost();
  }
  return allPost;
};

async function addPost(postDetail: { postText: string, postStatus: string }): Promise<any[]> {
  try {
    const user: any = await getCurrentUser();
    const data = {
      title: postDetail.postStatus,
      body: postDetail.postText,
      userId: user.id,
      id: 1
    };
    const postResponse: AxiosResponse = await axiosClient.post('/posts', JSON.stringify(data));

    data.id = postResponse.data.id
    allPost = [data].concat(allPost);
    await mapPost();
    return allPost;
  } catch (error) {
    console.log(error);
    return [];
  }
};

async function updatePost(postDetail: { postText: string, id: number }): Promise<any[]> {
  try {
    const user: any = await getCurrentUser();
    const data = {
      title: '',
      body: postDetail.postText,
      userId: user.id,
      id: postDetail.id
    };
    if (postDetail.id <= 100) {
      await axiosClient.put(`/posts/${postDetail.id}`, JSON.stringify(data));
    }

    allPost[allPost.findIndex((post) => post.id == postDetail.id)].body = postDetail.postText;
    return allPost;
  } catch (error) {
    console.log(error);
    return [];
  }
};

async function deletePost(id: number): Promise<any[]> {
  try {
    if (id <= 100) {
      await axiosClient.delete(`/posts/${id}`);
    }

    allPost = allPost.filter((post, index) => index !== allPost.findIndex((post) => post.id == id));
    return allPost;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getAllPosts, addPost, updatePost, deletePost }