const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageDisplay   
 = document.getElementById('message-display');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageDisplay.appendChild(messageElement);   

    messageInput.value = '';
  }
});
