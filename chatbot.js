document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const userMessageText = document.getElementById('user-input').value;

    if (userMessageText.trim() !== "") {
        displayMessage(userMessageText, 'user');
        document.getElementById('user-input').value = '';

        fetch('https://api-endpoint-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`
            },
            body: JSON.stringify({
                query: userMessageText,
                sessionId: 'your-session-id'
            })
        })
        .then(response => response.json())
        .then(data => {
            const chatbotResponse = data.response;
            displayMessage(chatbotResponse, 'bot');
        })
        .catch(error => console.error('Error:', error));
    }
}

function displayMessage(message, sender) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
