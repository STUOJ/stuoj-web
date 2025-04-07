<template>
    <ElText v-if="language" size="large" tag="b">{{ language.name }}</ElText>
    <ElText v-else size="large" tag="b">无</ElText>
</template>

<script setup lang="ts">
import { getLanguageListApi } from '@/apis/language';
import type { Language } from '@/types/Judge';
import { onMounted, ref, watchEffect } from 'vue';

const { execute, state } = getLanguageListApi();
const options = ref<Language[]>([]);
const props = defineProps<{
    langId?: number;
}>();

const language = ref<Language | null>(null);

const updateLanguage = () => {
    if (props.langId !== undefined) {
        const foundLanguage = options.value.find((item) => item.id === props.langId);
        language.value = foundLanguage || null;
    } else {
        language.value = null;
    }
};

onMounted(async () => {
    await execute();
    if (state.value) {
        options.value = state.value;
        updateLanguage();
    }
});

watchEffect(() => {
    if (options.value && props.langId !== undefined) {
        updateLanguage();
    }
});
</script>