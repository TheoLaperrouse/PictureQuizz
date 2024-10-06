<template>
    <div class="room-page min-h-screen bg-teal flex">
        <div class="w-1/4 bg-teal p-2 rounded-md">
            <PlayersList :players="players" :pictureRanks="pictureRanks" />
        </div>
        <div class="flex-1 flex flex-col justify-between py-2 pr-2">
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
import { useLocalStorage } from '@vueuse/core';
import Swal from 'sweetalert2';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const roomId = route.params.id;

const players = ref([]);
const pictureRanks = ref([]);
const itemImage = ref();

const submitAnswer = (answer) => {
    socket.emit('submitAnswer', { answer, roomId });
};

onMounted(async () => {
    const username = useLocalStorage('username');
    if (!username.value) {
        const { value } = await Swal.fire({
            title: t('joinRoom'),
            input: 'text',
            inputPlaceholder: t('enterUsernamePlaceholder'),
            showCancelButton: true,
            confirmButtonText: t('joinRoom'),
            cancelButtonText: t('cancelButton'),
            inputValidator: (value) => {
                if (!value) {
                    return t('usernameRequiredMessage');
                }
            },
        });
        username.value = value;
    }

    socket.emit('joinRoom', { roomId, username: username.value });

    socket.on('playerJoined', (data) => {
        players.value = Object.values(data.players);
    });

    socket.on('answer', () => {});

    socket.on('newPicture', (imageUrl) => {
        pictureRanks.value = [];
        itemImage.value = imageUrl;
    });

    socket.on('leaderboardUpdate', (leaderboard) => {
        players.value = Object.values(leaderboard.players);
        pictureRanks.value = leaderboard.pictureRanks;
    });
});

onUnmounted(() => {
    socket.off('playerJoined');
    socket.off('answer');
    socket.off('newImage');
    socket.off('leaderboardUpdate');
});
</script>
