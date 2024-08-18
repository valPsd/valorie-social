<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getCurrentUser } from '~/lib/controllers/users';

//variables
const items = reactive([
    {
        title: "News Feed",
        path: "/",
        icon: "simple-icons:feedly"
    },
    {
        title: "Message",
        path: "/message",
        icon: "icon-park-solid:message"
    },
    {
        title: "Settings",
        path: "/settings",
        icon: "icon-park-solid:setting"
    }
])
const clickedPath = ref('')
const route = useRoute()
const router = useRouter()
const userDetail = ref();

//functions
const isCurrentPage = (path: string) => { return clickedPath.value == path ? 'color: white' : 'color: black' }
function changeColorOnClickItem(path: string) {
    clickedPath.value = path
}

//lifecycle
onMounted(async () => {
    await router.isReady()
    clickedPath.value = route.path

    userDetail.value = await getCurrentUser();
})

watch(() => route.path,
    (newPath) => clickedPath.value = newPath)
</script>

<template>
    <div>
        <header class="grid place-content-center text-center gap-4 p-10 hover:sacle-[101%] transition cursor-pointer">
            <Logo />
            <div>
                <h3 v-if="userDetail">{{ userDetail.name }}</h3>
                <p class="text-slate-400" v-if="userDetail">@{{ userDetail.username }}</p>
            </div>
        </header>
        <div class="px-4 grow">
            <div class="grid gap-3">
                <NuxtLink v-for='(item, index) in items' @click="changeColorOnClickItem(item.path)" :href="item.path"
                    :key="index" class="flex items-center gap-4 px-4 py-3 transition cursor-pointer rounded-[15px]"
                    :class="clickedPath == item.path ? 'bg-black hover:bg-zinc-900' : 'bg-white hover:bg-neutral-100'">
                    <Icon size="20" :name="item.icon" :style="isCurrentPage(item.path)" />
                    <span :style="isCurrentPage(item.path)">{{ item.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>