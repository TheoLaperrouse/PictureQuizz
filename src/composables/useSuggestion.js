import { submitSuggestion } from '@/services/suggestions.service';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';

export const useSuggestion = () => {
    const { t } = useI18n();
    const openSuggestionForm = async () => {
        const { value: suggestion } = await Swal.fire({
            title: t('suggestPicture'),
            html: `
                ${t('getImageFrom')} <a href="https://commons.wikimedia.org" target="_blank" style="color: #007bff; text-decoration: underline;">WikiMedia</a>
                <input id="pictureName" class="swal2-input" placeholder="${t('pictureNamePlaceholder')}">
                <input id="pictureUrl" class="swal2-input" placeholder="${t('pictureUrlPlaceholder')}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: t('submitSuggestion'),
            cancelButtonText: t('cancelButton'),
            preConfirm: () => {
                const name = document.getElementById('pictureName').value;
                const url = document.getElementById('pictureUrl').value;
                if (!name || !url) {
                    Swal.showValidationMessage(t('bothFieldsRequiredMessage'));
                }
                return { name, url };
            },
        });

        await submitSuggestion(suggestion);

        Swal.fire({
            title: t('suggestionSuccessTitle'),
            text: t('suggestionSuccessMessage', { name }),
            icon: 'success',
        });
    };
    return { openSuggestionForm };
};
