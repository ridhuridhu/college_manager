const express = require('express');
const app = express();
const server = require('http').createServer(app);
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const moment=require("moment");
//routes
const direct=require("./routes/direct")

// my vars
const port = process.env.PORT || 3000;
const {MONGO_URL} = require('./config/');
require('./libs/db-connection');
// configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'abc123',
  resave: true,
  saveUninitialized: true,
  // this prevents that every time the server is restarted we lose the login sessions
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    url: MONGO_URL,
    autoReconnect: true
  })
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.errors = [];
  next();
})
// static files
app.use(express.static(path.join(__dirname, '/public')));
// engine
app.set('view engine', 'jade');
// passport config
require('./config/passport')(passport);
//image 
app.use("/image/",express.static("./uploads"))
// routes
app.use(require('./routes/')); // main routes
app.use('/user', require('./routes/user')); // user routes
app.use('/direct',direct)

//socket 
const io=require("socket.io")(server);

const room="1234"
//  post.date=moment().format('MMMM Do YYYY, h:mm:ss a')
io.on("connection",(socket)=>{
  //when users connects
  socket.emit("message"," You have joined the Chat");
  socket.on("room",(room)=>{
    socket.join(room)    
    
  });
  //when users Dis-connects
  socket.on("disconnect",()=>{

    io.sockets.in(room).emit("message",("A user has left the chat"));
  
  });

  socket.on("message",(message)=>{
     // console.log(message)
    //console.log(message.room,message.msg)
    // console.log(io.sockets)
    io.sockets.in(message.room).emit('message',message.msg)
    //io.emit("message",message);
  
})
  socket.on("room1",(room1)=>{
    socket.join(room1)
    //console.log('room1 connected')
  })

});

// run server
server.listen(port, () => console.info(`Server on Fire @${port}`));