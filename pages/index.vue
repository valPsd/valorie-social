<script setup>
const loading = ref(false)
</script>

<template>
    <div>
        <Button class="relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1.5 px-2.5">
            <span
                class="w-56 h-48 rounded bg-indigo-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span
                class="relative w-full text-left text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white">
                Click me
            </span>
        </Button>
    </div>
</template>