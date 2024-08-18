<script setup lang="ts">
import { useToast } from '../ui/toast';
const { toast } = useToast()

interface IEmitData{
    (event: "submit", value: {postText: string, postStatus: string}): void
}

const postText = ref();
const postStatus = ref();
const emit = defineEmits<IEmitData>()

const onSubmit = async () => {
    if (!postText.value || postText.value == '') {
        toast({
            title: 'Please type something to share.',
        })
        return;
    }
    emit("submit", {postText: postText.value, postStatus: postStatus.value})
    postStatus.value = 'public';
    postText.value = '';
}

onMounted(() => {
    postStatus.value = 'public';
    postText.value = '';
})
</script>

<template>
    <Card class="bg-gray-100">
        <CardContent class="p-5">
            <form class="w-full space-y-6" @submit.prevent="onSubmit">
                <Input class="rounded-full" type="text" placeholder="Share something" v-model="postText" />
                <div class="flex justify-between">
                    <Select v-model="postStatus" defaultValue="public">
                        <SelectTrigger class="w-min border-none bg-transparent">
                            <SelectValue class="px-1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="public">
                                    <div class="flex items-center gap-2">
                                        <Icon size="20" name="material-symbols:public" />Public
                                    </div>
                                </SelectItem>
                                <SelectItem value="private">
                                    <div class="flex items-center gap-2">
                                        <Icon size="20" name="ri:git-repository-private-line" />Private
                                    </div>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        class="relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-neutral-800 rounded hover:bg-white group px-8 rounded-full"
                        type="submit">
                        <span
                            class="w-56 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span
                            class="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                            Send
                        </span>
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>