
function arrayRotate(arr) {
    var temp=arr[25];
    for(var i=26;i<arr.length;i++){
        temp+=arr[i];
    }
    temp+=":"
    for(var j=0;j<24;j++){
        temp+=arr[j]
    }
    return temp;
  }
 

const socket=io();
    var room='1234'
    if(window.location.pathname[10]){
        const Room=document.getElementById("room");
        room=Room.value
        // console.log(room);
        // console.log(room.length)
        var room1=arrayRotate(Room.value)


    }
    //console.log(socket)
   
    const sendBtn=document.getElementById("sendBtn");
    socket.on("message",(message)=>{
        outputMessage(message);
    });

    sendBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        const msgBox=document.getElementById("msgBox");
        const msg=msgBox.value;
        //emit to server
        //console.log(room)
        socket.emit("room",room)
        socket.emit("message",{msg,room});
        
        
        if(window.location.pathname[10]){
            socket.emit("room1",room1)
        }
     
        msgBox.value="";
        msgBox.focus();
    });

    function outputMessage(message){
       // console.log(message)
        const div =document.createElement("p");
        div.innerHTML=`${message}`;
        document.getElementById("Chat").appendChild(div);
        document.getElementById("Chat").scrollTop=document.getElementById("Chat").scrollHeight;
    }
