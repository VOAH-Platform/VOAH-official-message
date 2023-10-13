const ConnectSocket = () =>{
    const wsUri = "ws://127.0.0.1/";
    const websocket = new WebSocket(wsUri);

    websocket.onopen() = (e) => {
        console.log("connected to websocket");
        sendMessage("ping");
    pingInterval = setInterval(() => {
      sendMessage("ping");
    }, 5000);
    }
}