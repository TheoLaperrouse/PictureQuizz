<template>
    <div class="p-8 bg-blue-50 h-full rounded-md">
        <h1 class="text-3xl font-bold text-center text-blue-900 mb-6">{{ $t('playersListTitle') }}</h1>
        <div
            v-for="player in players"
            :key="player.id"
            class="bg-white rounded-lg shadow-md p-4 flex items-center transition-transform transform hover:scale-105 mb-2"
        >
            <img
                :src="player.avatar"
                alt="Player Avatar"
                class="w-16 h-16 rounded-full border-2 border-blue-300 object-cover mr-2"
            />
            <div class="flex-1">
                <h2 class="text-xl font-bold text-blue-900">{{ player.username }}</h2>
                <p class="text-sm text-black">{{ $t('points') }}: {{ player.score }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    players: {
        type: Array,
        required: true,
    },
});
const { players } = toRefs(props);
</script>
