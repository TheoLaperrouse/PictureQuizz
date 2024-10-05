<template>
    <div class="p-2 bg-grey h-full rounded-md">
        <h1 class="p-2 bg-teal rounded-lg text-3xl font-bold text-center text-white mb-2">
            {{ $t('playersListTitle') }}
        </h1>
        <div
            v-for="player in players"
            :key="player.id"
            class="bg-teal rounded-lg shadow-md p-4 flex items-center transition-transform transform hover:scale-105 mb-2"
        >
            <img
                :src="player.avatar"
                alt="Player Avatar"
                class="w-16 h-16 bg-white rounded-full border-2 border-navy-blue object-cover mr-2"
            />
            <div class="flex-1">
                <h2 class="text-xl font-bold text-white">{{ player.username }}</h2>
                <p class="text-sm text-white">{{ $t('points') }}: {{ player.score }}</p>
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
