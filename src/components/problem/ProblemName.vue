<template>
    <a class="color-none" :href="`/problem/${problem_info.id}`">
        <span class="problem-name" :style="{ fontSize: props.size + 'px', color: problemColor }">
          {{ problem_info.title }}
        </span>
    </a>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watchEffect, type PropType } from 'vue';
import type { ProblemInfo } from '@/types/Problem';
import { getProblemApi } from '@/apis/problem';
import { DifficultyColor } from '@/types/Problem';

const { execute } = getProblemApi();

const props = defineProps({
    problem: {
        type: Object as PropType<ProblemInfo>,
        default: () => ({})
    },
    id: {
        type: Number,
        default: 0
    },
    size: {
        type: Number,
        default: 16
    }
});

const problem_info = ref<ProblemInfo>({ ...props.problem });
const problemColor = ref<string>('');

const load = async () => {
    if (props.id !== 0) {
        await execute({ id: props.id }).then((res) => {
            if (res.value) {
                problem_info.value = res.value.problem;
                problemColor.value = DifficultyColor[problem_info.value.difficulty];
            }
        });
    }
    if (problem_info.value && problem_info.value.difficulty) {
        problemColor.value = DifficultyColor[problem_info.value.difficulty] || '';
    }
};

onBeforeMount(async () => {
    load();
});

watchEffect(() => {
    problem_info.value = props.problem;
    load();
});
</script>

<style scoped>
.problem-name {
    font-weight: bold;
}
</style>