<template>
    <div class="flex space-x-2">
        <input
            v-model="answer"
            type="text"
            placeholder="Entrez votre réponse"
            class="p-2 rounded-lg border border-gray-300 text-black w-64"
        />
        <button
            @click="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
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
