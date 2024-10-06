import socket from '@/services/socket.service';
import { useLocalStorage } from '@vueuse/core';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export const useRoom = () => {
    const storedUsername = useLocalStorage('username');
    const { t } = useI18n();
    const router = useRouter();
    const createRoom = async () => {
        const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();

        if (!storedUsername.value) {
            const { value: username } = await Swal.fire({
                title: t('enterUsernameTitle'),
                input: 'text',
                inputPlaceholder: t('enterUsernamePlaceholder'),
                showCancelButton: true,
                confirmButtonText: t('createRoom'),
                cancelButtonText: t('cancelButton'),
                inputValidator: (value) => {
                    if (!value) {
                        return t('usernameRequiredMessage');
                    }
                },
            });
            storedUsername.value = username;
        }

        router.push({ name: 'Room', params: { id: roomId } });
        socket.emit('createRoom', roomId);

        Swal.fire({
            title: t('roomCreatedTitle'),
            html: `
                    <p>${t('welcomeMessage', { username: storedUsername.value })}</p>
                    <p>${t('shareLinkMessage')}</p>
                    <br/>
                    <h3 class='text-xl'>${t('roomId')} : <strong>${roomId}</strong></h3>
                    </a>
                `,
            icon: 'success',
            confirmButtonText: t('okButton'),
        });
    };

    const joinRoom = async () => {
        const {
            value: { roomId, username },
        } = await Swal.fire({
            title: t('joinRoom'),
            html: `
                <div>
                    <input id="roomId" class="swal2-input" placeholder="${t('enterRoomIdPlaceholder')}">
                    <input id="username" class="swal2-input" placeholder="${t('enterUsernamePlaceholder')}" value="${storedUsername.value || ''}">
                </div>
                `,
            focusConfirm: false,
            preConfirm: () => {
                const roomId = document.getElementById('roomId').value;
                const username = document.getElementById('username').value;
                if (!roomId || !username) {
                    Swal.showValidationMessage(t('bothFieldsRequiredMessage'));
                }
                return { roomId, username };
            },
            showCancelButton: true,
            confirmButtonText: t('joinRoom'),
            cancelButtonText: t('cancelButton'),
        });
        storedUsername.value = username;
        router.push({ name: 'Room', params: { id: roomId } });
    };
    return { joinRoom, createRoom };
};
