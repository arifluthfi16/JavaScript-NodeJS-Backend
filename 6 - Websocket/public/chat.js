// Make Connection FROM THE FRONTEND
const socket = io.connect("http://localhost:4000/")

// Query DOM
var message = document.getElementById('message'),
    handle  = document.getElementById('handle'),
    btn     = document.getElementById('send'),
    output  = document.getElementById('output'),
    feedback= document.getElementById('feedback');


// Start Emmiting Message

btn.addEventListener('click',()=>{
      socket.emit("chat", {
            message: message.value,
            handle : handle.value
      });
      message.value=""
});

message.addEventListener('keypress', ()=>{
      socket.emit("typing", 
            handle.value
      )
})

message.onblur = function(){
      socket.emit('typing', "");
}

message.onfocus = function(){
      socket.emit('typing', handle.value);
}

// Listen for event socket
socket.on('chat', (data)=>{
      feedback.innerHTML = "";
      output.innerHTML+=`<p><strong>${data.handle} : </strong> ${data.message} </p> `;
})

// Listen for typing event

socket.on('typing', (data)=>{
      if(data == ""){
            feedback.innerHTML = ``
            return
      }
      feedback.innerHTML = `<p><em>${data} is typing . . .</p></em>`
      
})