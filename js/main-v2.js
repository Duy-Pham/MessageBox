

// -Find element after that render chat box\
// + Find element
// + Html. css 
// + Render chatbox (html, css)
// -Events
// + Call Api to get default messages
// + Call Api to send message? (Maybe use socket)
// + Use JS to append message for customer or owner

// Setup options


chatBoxPlatform28 = function(){
    const CHAT_BOX_ELEMENT_ID = '#chatBoxPlatform28';
    // const CHAT_BOX_ELEMENT_ID = 'chatBoxPlatform28';
    const BASE_URI = 'https://';
    const CIRCLE_BOX_BUTTON = '.bubble-icon';
    const CLOSE_BUTTON = '.close-btn';
    const CHAT_CONTAINER = '.chat-container';
    const CHAT_CONTAINER_HIDDEN_CLASS = 'display-none';
    const CHAT_CONTAINER_BODY_MESSAGE = '.body';
    const CHAT_CONTAINER_CLIENT_MESSAGE_BOX = '.message';
    const CHAT_CONTAINER_SEND_MESSAGE_BUTTON = '.send-btn--js';

    let options = {};
    let chatBoxElement = null;

    function init(opts){
        options = createOptions(opts);
        chatBoxElement = document.querySelector(options.chatBoxElementId);

        if (!chatBoxElement) {
            throw error(`Couldn't find the chat box element id: ${options.chatBoxElementId}`);
        }

        applyStyle();
        chatBoxElement = render();
        registerEvents();
    }

    function createOptions(options) {
        let opts = options || {};
        
        opts.chatBoxElementId = opts.chatBoxElementId || CHAT_BOX_ELEMENT_ID;
        opts.baseUri = opts.baseUri || BASE_URI;

        return opts;
    }

    function applyStyle() {
        const style = `
            <style>
                .test-v2 {
                    display: none;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', style);
    }

    function render() {
        const template = `<section id="chatBoxPlatform28" class="chat-box-container">
                            <div class="chat-container display-none">
                                <div class="header">
                                    <strong>Chat box title</strong>
                                    <button class="close-btn">-</button>
                                </div>
                                <div class="body">
                                    <div class="row">
                                        <div class="client-message">
                                            client message
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="server-message">
                                            server message
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <input class="message">
                                    <button class="send-btn--js">Send</button>
                                </div>
                            </div>
                            <div class="bubble-icon">
                            </div>
                          </section>`;
        let chatBox = document.querySelector(CHAT_BOX_ELEMENT_ID);
        chatBox.innerHTML = template;
        return chatBox;
    }

    function registerEvents() {
        chatBoxElement.querySelector(CIRCLE_BOX_BUTTON).addEventListener('click', () => {
            let chatContainer = chatBoxElement.querySelector(CHAT_CONTAINER);
            if (chatContainer) {
                chatContainer.classList.remove(CHAT_CONTAINER_HIDDEN_CLASS);
            }
        });

        chatBoxElement.querySelector(CLOSE_BUTTON).addEventListener('click', () => {
            let chatContainer = chatBoxElement.querySelector(CHAT_CONTAINER);
            if (chatContainer) {
                chatContainer.classList.add(CHAT_CONTAINER_HIDDEN_CLASS);
                // TODO: need to reset data in chat box
            }
        });

        chatBoxElement.querySelector(CHAT_CONTAINER_SEND_MESSAGE_BUTTON).addEventListener('click', async() => {
            const clientMessageBox = chatBoxElement.querySelector(CHAT_CONTAINER_CLIENT_MESSAGE_BOX);
            const clientMessage = clientMessageBox.value;
            if(clientMessage) {
                await sendClientMessage(clientMessage);
                renderClientMessage(clientMessage);
                const serverMessage = await getServerMessage();
                renderServerMessage(serverMessage);
            }
        });
    }

    function renderClientMessage(message) {
        const template = `<div class="row">
                            <div class="client-message">
                                ${message}
                            </div>
                        </div>`;
        let bodyElement = chatBoxElement.querySelector(CHAT_CONTAINER_BODY_MESSAGE);

        bodyElement.insertAdjacentHTML('beforeend', template);
    }

    function renderServerMessage(message) {
        const template = `<div class="row">
                                <div class="server-message">
                                     ${message}
                                </div>
                            </div>`;
        let bodyElement = chatBoxElement.querySelector(CHAT_CONTAINER_BODY_MESSAGE);

        bodyElement.insertAdjacentHTML('beforeend', template);
    }


    function sendClientMessage(message) {
        // fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
        //     .then(response => response.json())
        //     .then(commits => alert(commits[0].author.login));
        const promise = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(message), 500);
        });

        return promise;
    }

    function getServerMessage() {
        const randomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const sampleMessages = ['server-test 1','server-test 2','server-test 3'];
        const message = sampleMessages[randomInteger(0, sampleMessages.length - 1)];
        const promise = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(message), 1000);
        });

        return promise;
    }

    return{
      init: init
    }
}();

try {
    chatBoxPlatform28.init();    
} catch (error) {
    console.error('Something errors in chat box: ' + error);
}

