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
    </div>
</template>

<script setup>
import socket from '@/services/socket.service';
import { useRouter } from 'vue-router';

const router = useRouter();
const createRoom = async () => {
    const roomId = Math.random().toString(36).substring(2, 7);
    socket.emit('createRoom', roomId);
    router.push({ name: 'Room', params: { id: roomId } });
};

const joinRoom = () => {
    const roomId = prompt("Entrez l'ID de la room à rejoindre :");
    if (roomId) {
        socket.emit('joinRoom', roomId);
        router.push({ name: 'Room', params: { id: roomId } });
    }
};
</script>
<style scoped>
button {
    @apply rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700;
}
</style>
