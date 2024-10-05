<template>
    <div class="flex w-full">
        <input
            v-model="answer"
            type="text"
            placeholder="Entrez votre réponse"
            class="p-2 rounded-lg border border-gray-300 text-black flex-grow mr-2"
            @keydown.enter="submit"
        />
        <button @click="submit">
            {{ $t('submitAnswer') }}
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submitAnswer']);

const answer = ref('');

const submit = () => {
    emit('submitAnswer', answer.value);
    answer.value = '';
};
</script>
