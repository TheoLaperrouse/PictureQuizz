<template>
    <div class="homepage min-h-screen bg-teal text-white flex flex-col justify-between">
        <div class="flex-grow flex flex-col justify-center items-center">
            <img src="@/assets/logo.webp" class="w-64 h-64 mb-6 rounded-xl" />
            <h1 class="text-4xl font-bold mb-6">{{ $t('homeWelcome') }}</h1>
            <p class="text-lg mb-6 text-center max-w-xl">{{ $t('homeDescription') }}</p>
            <div class="space-x-4">
                <button @click="createRoom">{{ $t('createRoom') }}</button>
                <button @click="joinRoom">{{ $t('joinRoom') }}</button>
            </div>
            <button class="absolute top-4 right-4" type="submit" @click="openSuggestionForm">
                {{ $t('submitSuggestion') }}
            </button>
        </div>
        <footer class="p-4 w-full text-center">
            <p class="mb-1">
                {{ $t('developedBy') }}
                <a
                    href="https://github.com/TheoLaperrouse"
                    target="_blank"
                    class="text-white underline hover:text-gray-300"
                    ><strong> Théo Laperrouse</strong>
                </a>
            </p>
            <div class="flex justify-center space-x-4">
                <div class="flex justify-center space-x-4">
                    <a
                        v-for="project in projects"
                        :key="project.name"
                        :href="project.url"
                        target="_blank"
                        class="flex items-center text-white"
                    >
                        <FontAwesomeIcon :icon="faGithub" class="mr-1" />
                        {{ $t(project.name) }}
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useRoom } from '@/composables/useRoom';
import { useSuggestion } from '@/composables/useSuggestion';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const projects = [
    { name: 'frontend', url: 'https://github.com/TheoLaperrouse/PictureQuizz' },
    { name: 'backend', url: 'https://github.com/TheoLaperrouse/PictureQuizzServer' },
];

const { joinRoom, createRoom } = useRoom();
const { openSuggestionForm } = useSuggestion();
</script>
