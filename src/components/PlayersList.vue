<template>
    <div>
        <h2 class="text-xl font-bold mb-4">{{ $t('playersList') }}</h2>
        <ul>
            <li v-for="player in players" :key="player.name" class="flex justify-between mb-2">
                <span>{{ player.name }}</span>
                <span class="font-semibold">{{ player.score }}</span>
            </li>
        </ul>
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
