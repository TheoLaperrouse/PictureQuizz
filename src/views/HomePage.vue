<template>
    <div
        class="homepage min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 text-white flex flex-col justify-center items-center"
    >
        <img src="@/assets/logo.png" alt="Smiley incognito" class="w-64 h-64 mb-6" />
        <h1 class="text-4xl font-bold mb-6">{{ $t('homeWelcome') }}</h1>
        <p class="text-lg mb-6 text-center max-w-xl">{{ $t('homeDescription') }}</p>
        <div class="space-x-4">
            <button @click="createRoom">
                {{ $t('createRoom') }}
            </button>
            <button @click="joinRoom" class="">
                {{ $t('joinRoom') }}
            </button>
        </div>
        <button
            type="submit"
            class="absolute top-4 right-4 bg-blue-700 p-4 rounded-lg shadow-lg"
            @click="openSuggestionForm"
        >
            {{ $t('submitSuggestion') }}
        </button>
    </div>
</template>

<script setup>
import { useRoom } from '@/composables/useRoom';
import { useSuggestion } from '@/composables/useSuggestion';

const { joinRoom, createRoom } = useRoom();
const { openSuggestionForm } = useSuggestion();
</script>
<style scoped>
button {
    @apply rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700;
}
</style>
