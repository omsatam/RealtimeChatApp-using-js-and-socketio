const socket = io('https://realtime-chat-app-using-js-and-socketio-de7o775a3-omsatam.vercel.app/');
let name;
let message = document.getElementById('message-input')
let messagearea = document.getElementById('message-area')
let button = document.getElementById("button")
let container = document.getElementById("container")
let incoming = new Audio('img/incoming.mp3')
let outgoing = new Audio('img/outgoing.mp3')

do{
    name = prompt('Please enter your name: ')
} while (!name)
socket.emit('new-user-joined',name);

button.addEventListener('click',() =>{
    if (message.value != ""){
    console.log(message.value)
    sendMessage(message.value)
    outgoing.play();
    message.value = "";
    }
})

function sendMessage(message) {
    // Append 
    socket.emit('send', message) 
    appendMessage(`You: ${message}`, 'right')

}

function appendMessage(msg, type) {
 let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message-text','message')
    
    let markup = `
            ${msg}
        `
    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
    scrollToBottom()

}

// Recieve messages 
// socket.on('message', (msg) => {
//     appendMessage(msg, 'left')
//     scrollToBottom()
// })
socket.on('user-joined',name =>{
   appendMessage(`${name} joined the chat`,'center')
    })
    
 socket.on('recieve',data =>{
        appendMessage(`${data.name}: ${data.message}`,'left')
        incoming.play()
    })
    
 socket.on('left',name =>{
        appendMessage(`${name} left the chat`,'center')
    })
function scrollToBottom(){
    container.scrollTop = container.scrollHeight
}
