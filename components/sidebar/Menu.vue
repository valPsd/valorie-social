<script setup>
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
</script>

<template>
    <div>
        <header class="flex items-center gap-2 p-4 hover:sacle-[101%] transition cursor-pointer">
            <Logo />
            <p class="font-bold">Feeds</p>
        </header>
        <div class="px-4 grow">
            <div class="grid gap-4">
                <NuxtLink :href="item.path" v-for='(item, index) in items' :key="index"
                    class="flex items-center gap-2 px-2 py-1 transition cursor-pointer hover:bg-neutral-100 rounded-lg">
                    <Icon size="20" :name="item.icon" color="black"/>
                    <span>{{ item.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>