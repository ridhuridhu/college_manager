const id=Qs.parse(location.search)


const socket=io();
    const sendBtn=document.getElementById("sendBtn");
    socket.on("message",(message)=>{
        console.log(window.location.pathname[5] );
        outputMessage(message);
    });

    sendBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        const msgBox=document.getElementById("msgBox");
        const msg=msgBox.value;
        //emit to server
        socket.emit("message",msg);
        msgBox.value="";
        msgBox.focus();
    });

    function outputMessage(message){
        const div =document.createElement("p");
        //div.classList.add("");
        div.innerHTML=`${message}`;
        document.getElementById("Chat").appendChild(div);
        document.getElementById("Chat").scrollTop=document.getElementById("Chat").scrollHeight;
    }
//socket room ref
/*client JS
// set-up a connection between the client and the server
var socket = io.connect();

// let's assume that the client page, once rendered, knows what room it wants to join
var room = "abc123";

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
});

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});
*/

/* SERVER js
// attach Socket.io to our HTTP server
io = socketio.listen(server);

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});

// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
/*