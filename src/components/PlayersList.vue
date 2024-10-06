<template>
    <div class="p-2 bg-grey h-full rounded-md">
        <h1 class="p-2 bg-teal rounded-lg text-3xl font-bold text-center text-white mb-2">
            {{ $t('playersListTitle') }}
        </h1>
        <div v-for="player in formattedPlayers" :key="player.id" class="bg-teal rounded-lg p-2 flex items-center mb-2">
            <img
                :src="player.avatar"
                alt="Player Avatar"
                class="w-16 h-16 bg-white rounded-full border-2 border-navy-blue object-cover mr-2"
            />
            <div class="flex-1">
                <h2 class="text-xl font-bold text-white">{{ player.username }}</h2>
                <p class="text-sm text-white">{{ $t('points') }}: {{ player.score }}</p>
            </div>
            <FontAwesomeIcon v-if="player.icon" :icon="player.icon" :class="player.color" class="mr-1 text-2xl" />
        </div>
    </div>
</template>

<script setup>
import { faMedal, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { toRefs, computed } from 'vue';

const props = defineProps({
    players: {
        type: Array,
        required: true,
    },
    pictureRanks: {
        type: Array,
    },
});

const { pictureRanks, players } = toRefs(props);

const formattedPlayers = computed(() => {
    return (players.value || []).map((player) => {
        const { icon, color } = getIcon(player.username);
        if (!icon || !color) {
            return player;
        }
        return { ...player, icon, color };
    });
});
const getIcon = (username) => {
    const medals = ['text-yellow-500', 'text-gray-400', 'text-orange-600'];
    const rank = pictureRanks.value.indexOf(username);
    if (rank === -1) {
        return {};
    }
    return rank <= 2 ? { icon: faMedal, color: medals[rank] } : { icon: faCheckCircle, color: 'text-green-500' };
};
</script>
