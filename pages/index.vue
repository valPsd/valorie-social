<script setup lang="ts">
import { addPost } from '~/lib/controllers/posts';
import { getAllPosts } from '~/lib/controllers/posts';
import type { ICreatePost, IPost } from '~/lib/models/post';

//variables
const posts = ref<IPost[]|any[]>([])
const loader = ref<boolean>(true)

//function
async function getAllPost() {
    posts.value = await getAllPosts()
    loader.value = false    
}

async function submit(post: ICreatePost) {    
    posts.value = await addPost(post);
}

//lifecycle
onMounted(async () => {
    loader.value = true
    //get posts
    await getAllPost()
})
</script>

<template>
    <div class="grid gap-6">
        <h1>Feeds</h1>
        <postInput @submit="submit"/>
        <postFeed v-if="posts.length > 0" :posts="posts" :loader="loader" />
    </div>
</template> 