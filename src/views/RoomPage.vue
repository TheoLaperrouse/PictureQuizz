<template>
    <div class="room-page min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 text-white flex">
        <div class="w-1/4 bg-blue-700 p-4">
            <PlayersList :players="players" />
        </div>
        <div class="flex-1 flex flex-col justify-center items-center p-4">
            <img v-if="itemImage" :src="itemImage" alt="Item to Guess" class="max-w-xs max-h-96 rounded-lg shadow-lg" />
        </div>
        <div class="absolute bottom-6 right-6">
            <AnswerInput @submitAnswer="submitAnswer" />
        </div>
    </div>
</template>

<script setup>
import AnswerInput from '@/components/AnswerInput.vue';
import PlayersList from '@/components/PlayersList.vue';
import socket from '@/services/socket.service';
import { ref, onMounted, onUnmounted } from 'vue';

const players = ref([
    { name: 'Player 1', score: 50 },
    { name: 'Player 2', score: 30 },
    { name: 'Player 3', score: 20 },
    { name: 'Player 4', score: 10 },
]);

const itemImage = ref('https://via.placeholder.com/150');

const roomId = 'room1';

const submitAnswer = (answer) => {
    socket.emit('submitAnswer', { answer, roomId });
};

onMounted(() => {
    socket.emit('joinRoom', roomId);

    socket.on('someEvent', () => {});
});

onUnmounted(() => {
    socket.off('someEvent');
});
</script>
