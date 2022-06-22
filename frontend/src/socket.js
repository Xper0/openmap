export const socket = new WebSocket("ws://127.0.0.1:7000");

// socket.onopen = (msg) => {
//     console.log("server ON")
//
//         socket.send(JSON.stringify("хай сокет"))
//
//
// }
// socket.onmessage = (response) => {
//     console.log(response)
//     let oMessage = JSON.parse(response.data)
//     console.dir(oMessage)
// }