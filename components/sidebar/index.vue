<script setup lang="ts">
//state
const open = ref(false)

//functions
const toggleOpen = () => { open.value = !open.value }

//lifecycle
onMounted(() => {
    open.value = false
})
</script>

<template>
    <div class="col-span-2">
        <!-- mobile -->
        <div class="z-50 flex lg:hidden items-center justify-between h-full w-full p-4 lg:hidden">
            <Logo />
            <Icon class="z-50 cursor-pointer left-2 top-2" size="30" name="iconamoon:menu-burger-horizontal"
                @click="toggleOpen" />
            <div v-if="open" class="absolute top-0 left-0 z-50 w-full h-full h-screen bg-white">
                <Icon class="absolute z-50 cursor-pointer right-4 top-4" size="30" name="material-symbols:close"
                    @click="toggleOpen" />
                <sidebarMenu />
            </div>
        </div>
        <!-- desktop -->
        <div class="hidden lg:flex flex-col w-[250px] h-screen justify-between sticky top-0">
            <sidebarMenu />
        </div>
    </div>
</template>