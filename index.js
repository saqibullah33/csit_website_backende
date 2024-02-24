const express = require('express');
const connect = require('./dbconfig');
require('dotenv').config();
const server = express();
const cors = require('cors');
const eventRouter = require('./Routes/eventRoutes')
const mailRouter=require('./Routes/MailRoute')
const UserRoute=require('./Routes/UserRoutes')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ComputerCellRoutes=require('./Routes/Society.routes')
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.json());
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

connect()
server.use('/api',eventRouter)
server.use('/api',UserRoute)
server.use('/api',mailRouter)
server.use('/api',ComputerCellRoutes)




server.get('/',(req,res)=>{
    res.send('hello world')
    console.log(req.body)
})


server.listen(8080,()=>{
    console.log('server started at 8080')
}
)