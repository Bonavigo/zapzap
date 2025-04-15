let stompClient = null;
let username = null;

const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username-input");
const messageInput = document.querySelector("#message-input");
const chatMessagesBox = document.querySelector("#chat-messages-box");

const loginSection = document.querySelector("#login-section");
const chatSection = document.querySelector("#chat-section");

const onLogin = (event) => {
  event.preventDefault();

  connect();
};

const onSendMessage = (event) => {
  event.preventDefault();

  const messageContent = messageInput.value.trim();

  if (messageContent && stompClient) {
    const chatMessage = {
      sender: username,
      content: messageContent,
      type: "CHAT",
    };
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

    // Clear the input field
    messageInput.value = "";
  }
};

function connect() {
  username = usernameInput.value.trim();

  if (username) {
    const socket = new SockJS("http://192.168.0.17:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
  }
}

function onConnected() {
  // Subscribe to the Public chat
  stompClient.subscribe("/chat/public", onMessageReceived);

  // Tell your username to the server
  stompClient.send(
    "/app/chat.addUser",
    {},
    JSON.stringify({ sender: username, type: "JOIN" })
  );

  loginSection.classList.add("hidden");
  chatSection.classList.remove("hidden");
  chatSection.classList.add("flex");

  // Navigate to chat page after successful connection
  // window.location.href = "/pages/chat.html";
}

function onMessageReceived(payload) {
  console.log("message received-=---:" + payload);

  const message = JSON.parse(payload.body);

  addNewMessage(message.sender, message.content, message.sender === username);
}

function onError(error) {
  window.alert(
    "Não foi possivel conectar-se ao servidor Websocket. Por favor recarrega a página e tente novamente!"
  );
}

function createChatMessage(username, message, isOwnMessage = true) {
  // Create the main container
  const messageItem = document.createElement("li");
  messageItem.className = isOwnMessage
    ? "flex justify-end"
    : "flex justify-start";

  // Create the message bubble
  const messageBubble = document.createElement("div");
  messageBubble.className = isOwnMessage
    ? "border-2 border-black rounded-lg bg-blue-100 p-3 bg-blue-100 max-w-[70%]"
    : "border-2 border-black rounded-lg bg-blue-100 p-3 bg-white max-w-[70%]";

  // Create username element
  const usernameSpan = document.createElement("span");
  usernameSpan.className = isOwnMessage
    ? "font-medium break-all block text-blue-800"
    : "font-medium break-all block text-blue-700";
  usernameSpan.textContent = username;

  // Create message content
  const messageContent = document.createElement("p");
  messageContent.className = "break-all";
  messageContent.textContent = message;

  // Assemble the elements
  messageBubble.appendChild(usernameSpan);
  messageBubble.appendChild(messageContent);
  messageItem.appendChild(messageBubble);

  return messageItem;
}

function addNewMessage(username, message, isOwnMessage = true) {
  const newMessage = createChatMessage(username, message, isOwnMessage);
  chatMessagesBox.appendChild(newMessage);

  // Optional: Scroll to the bottom to show the latest message
  chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
}
