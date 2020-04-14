const express = require('express');

// App Setup

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
  console.log(`Server Listening on PORT ${PORT}`);
});

// Static Files
app.use(express.static('public'))

app.get('/', function(req,res){
  res.render('index.html')
})