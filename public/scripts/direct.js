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