export interface IPost{
    id: number,
    title: string,
    body: string,
    userId: number,
    authorName: string,
    authorUsername: string
}

export interface ICreatePost {postText: string, postStatus: string}