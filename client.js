const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('form')
const messageInput = document.getElementById('input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)