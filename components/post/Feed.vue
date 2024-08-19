<script setup lang="ts">
import { deletePost, updatePost } from '~/lib/controllers/posts';
import { getCurrentUser } from '~/lib/controllers/users';
import type { IPost } from '~/lib/models/post';
import { toast } from '../ui/toast';
import type { IUser } from '~/lib/models/user';

const props = defineProps<{ posts: IPost[], loader: boolean }>()

//variables
const user = ref<IUser>()
const posts = ref(props.posts)
const filteredPosts = ref<any[]>([])
const loader = ref(props.loader)
const editValue = reactive(
    {
        editText: '',
        editId: 0
    }
)
const isShowEdit = ref(false)
const isLoadingEdit = ref(false)
const isLoadingDelete = ref(false)
const chooseShowOnFeed = ref(0)

//functions
const filterPost = () => {
    filteredPosts.value = posts.value.filter((post) => post.userId == user.value!.id);
}
const onClickFilter = (option: number) => {
    chooseShowOnFeed.value = option;
}
const onClickEdit = (text: string, id: number) => {
    editValue.editText = text;
    editValue.editId = id;
    isShowEdit.value = true;
}
const onClickExit = () => {
    editValue.editText = '';
    editValue.editId = 0;
    isShowEdit.value = false;
}
async function onUpdate() {
    if (!editValue.editText || editValue.editText == '') {
        toast({
            title: 'Please type something to share.',
        })
        return;
    }
    isLoadingEdit.value = true;
    posts.value = await updatePost({ postText: editValue.editText, id: editValue.editId });
    filterPost();
    onClickExit();
    isLoadingEdit.value = false;
}
async function onDelete(id: number) {
    editValue.editId = id;
    isLoadingDelete.value = true;
    posts.value = await deletePost(id);
    filterPost();
    editValue.editId = 0;
    isLoadingDelete.value = false;
}

//lifecycle
onMounted(async () => {
    user.value = await getCurrentUser()
    filterPost();
    isLoadingEdit.value = false;
    chooseShowOnFeed.value = 0;
})

watch(() => props.posts, async (newValue) => {
    posts.value = newValue
    filterPost();
})
</script>

<template>
    <Skeleton v-if="loader" class="h-[200px] w-full rounded-xl" />
    <div class="flex gap-3">
        <Button class="rounded-full border" :class="chooseShowOnFeed == 0 ? 'bg-black text-white hover:text-grey' : 'bg-white text-black hover:text-white'" @click="onClickFilter(0)">All post</Button>
        <Button class="rounded-full border" :class="chooseShowOnFeed == 1 ? 'bg-black text-white hover:text-grey' : 'bg-white text-black hover:text-white'" @click="onClickFilter(1)">Your post</Button>
    </div>
    <div v-for="(post) in chooseShowOnFeed == 0 ? posts : filteredPosts">
        <Skeleton v-if="isLoadingDelete && editValue.editId == post.id" class="h-[200px] w-full rounded-xl" />
        <Card v-if="!loader && (!isLoadingDelete || editValue.editId != post.id)" class="bg-neutral-700">
            <CardHeader>
                <div class="flex justify-between">
                    <div class="flex">
                        <div class="w-[45px]">
                            <img class="rounded-full" src="@/assets/images/man.png" alt="profile pic">
                        </div>
                        <div class="ml-4">
                            <CardTitle class="text-[16px] text-white">{{ post.authorName }}</CardTitle>
                            <CardDescription class="text-[14px] text-white">@{{ post.authorUsername }}</CardDescription>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <div>
                            <Icon v-if="user && (!isShowEdit || editValue.editId != post.id) && user.id == post.userId"
                                class="cursor-pointer" name="ic:baseline-edit" size="20" style="color:white"
                                @click="onClickEdit(post.body, post.id)" />
                            <Icon v-if="isShowEdit && editValue.editId == post.id" class="cursor-pointer"
                                name="ep:close-bold" size="20" style="color:white" @click="onClickExit()" />
                        </div>
                        <div>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Icon v-if="user && user.id == post.userId" class="cursor-pointer"
                                        name="mdi:delete-outline" size="20" style="color:white" />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            post from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction @click="onDelete(post.id)">Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="!isShowEdit || editValue.editId != post.id" class="font-[500] text-white">{{ post.body }}
                </div>
                <div v-if="isShowEdit && editValue.editId == post.id" class="grid">
                    <textarea class="rounded-xl h-[100px] w-full p-3" placeholder="share something"
                        v-model="editValue.editText"></textarea>
                    <div class="justify-self-end mt-5">
                        <Button class="rounded-full bg-white text-black hover:text-white" @click="onUpdate">
                            <svg v-if="isLoadingEdit" aria-hidden="true"
                                class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                            Done
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div class="flex">
                    <div class="flex">
                        <Icon class="cursor-pointer" name="solar:heart-outline" size="20" style="color:white" />
                        <p class="ml-1 text-white">Like</p>
                    </div>
                    <div class="flex ml-6">
                        <Icon class="cursor-pointer" name="gravity-ui:comment" size="20" style="color:white" />
                        <p class="ml-1 text-white">Comments</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </div>

</template>