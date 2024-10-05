const suggestionURL = 'http://localhost:3000/suggestions';

export const submitSuggestion = async (suggestion) => {
    const response = await fetch(suggestionURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestion),
    });

    if (!response.ok) {
        throw new Error(response.status);
    }

    const data = await response.json();
    return data;
};
