<template>
    <div class="flex w-full">
        <input
            v-model="answer"
            type="text"
            placeholder="Entrez votre réponse"
            class="p-2 rounded-lg border border-gray-300 text-black flex-grow mr-2"
            @keydown.enter="submit"
        />
        <button
            @click="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg min-w-[200px] transition duration-300"
        >
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
