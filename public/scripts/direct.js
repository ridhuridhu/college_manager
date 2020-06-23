
//SEARCH BAR
$("#chatSearch").keyup(function (e) { 
    
    const searchInput=document.getElementById("chatSearch")
    if(searchInput.value){
          // console.log(searchInput.value)
        $.post("/direct/search",{name:searchInput.value},(data)=>{
            if(data){
                // console.log(data);
                $(".showSearchList").html(data);
            }
        })


    }
  
 });




$(".userCard").hide();
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
        //console.log(message)
        outputMessage(message);
    });

    sendBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        const msgBox=document.getElementById("msgBox");
        const username=document.getElementById("username").value

        const msg=msgBox.value;
        if(msg){
            socket.emit("room",room)
            socket.emit("message",{msg,room,username});
            
            if(window.location.pathname[10]){
                socket.emit("room1",room1)
            }
        }
        msgBox.value="";
        msgBox.focus();
    });

    function outputMessage(message){
       //console.log(!message.username)
        const div= `<div class="speech-bubble">
                        <p class="text-muted">
                            ${message.username}
                        </p>
                        <p>
                            ${message.msg}
                        </p>
                    </div>
                    <br>
                    `
                    //console.log(div)
        //document.getElementById("Chat").appendChild(div);
        $("#Chat").append(div);
        document.getElementById("Chat").scrollTop=document.getElementById("Chat").scrollHeight;
    }
