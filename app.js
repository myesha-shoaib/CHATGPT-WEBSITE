const input = document.getElementById("msgInput");
const chat = document.getElementById("chat");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");

function addMessage(text, who = "user") {
    if (who === "user") {
        chat.innerHTML += `
            <div class="msg row user">
                <div class="bubble">${escapeHtml(text)}</div>
                <div class="mini-avatar">U</div>
            </div>
        `;
    } else {
        chat.innerHTML += `
            <div class="msg row bot">
                <div class="mini-avatar bot">AI</div>
                <div class="bubble">${text}</div>
            </div>
        `;
    }

    chat.scrollTop = chat.scrollHeight;
}

function fakeBotReply() {
    const typing = document.createElement("div");
    typing.className = "msg row bot typing";
    typing.id = "typing";
    typing.innerHTML = `
        <div class="mini-avatar bot">AI</div>
        <div class="bubble">AI is typing...</div>
    `;

    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(function () {
        typing.remove();

        const replies = [
            `😂 Noted! Your UI is so clean even bugs will feel shy to appear.`,
            `😎 UI upgraded. Teacher’s next question: “Where did you learn this?”`,
            `🚀 Your design is now modern, clean, and presentation ready.`,
            `👀 This looks like a real chatbot interface.`,
            `✨ Great work! Keep improving your frontend skills.`,
            `💻 HTML creates the structure, CSS makes it beautiful, and JavaScript makes it interactive.`
        ];

        const pick = replies[Math.floor(Math.random() * replies.length)];
        addMessage(pick, "bot");
    }, 800);
}

function sendMessage() {
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    addMessage(text, "user");
    input.value = "";

    fakeBotReply();
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

newChatBtn.addEventListener("click", function () {
    chat.innerHTML = `
        <div class="system">
            <span class="system-badge">Tip</span>
            New chat started. Ask anything to your Mini AI Assistant.
        </div>
    `;

    input.focus();
});

function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}