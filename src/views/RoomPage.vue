<template>
    <div class="room-page min-h-screen bg-blue-900 flex">
        <div class="w-1/4 bg-blue-800 p-4 rounded-md">
            <PlayersList :players="players" />
        </div>
        <div class="flex-1 flex flex-col justify-between p-4">
            <div class="flex-grow flex items-center justify-center">
                <img
                    v-if="itemImage"
                    :src="itemImage"
                    alt="Item to Guess"
                    class="max-w-xs max-h-96 rounded-lg shadow-lg"
                />
            </div>
            <div class="w-full">
                <AnswerInput @submitAnswer="submitAnswer" />
            </div>
        </div>
    </div>
</template>

<script setup>
import AnswerInput from '@/components/AnswerInput.vue';
import PlayersList from '@/components/PlayersList.vue';
import socket from '@/services/socket.service';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const roomId = route.params.id;

const players = ref([]);
const itemImage = ref('https://via.placeholder.com/150');

const submitAnswer = (answer) => {
    socket.emit('submitAnswer', { answer, roomId });
};

onMounted(() => {
    socket.on('playerJoined', (data) => {
        players.value = Object.values(data.players);
    });

    socket.on('answer', () => {});

    socket.on('newPicture', (imageUrl) => {
        itemImage.value = imageUrl;
    });

    socket.on('leaderboardUpdate', (leaderboard) => {
        players.value = leaderboard;
    });
});

onUnmounted(() => {
    socket.off('playerJoined');
    socket.off('answer');
    socket.off('newImage');
    socket.off('leaderboardUpdate');
});
</script>
