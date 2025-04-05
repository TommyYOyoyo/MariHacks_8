const express = require("express");
const app = express();
const cors = require('cors');
const { connect } = require("./database/connect.js");
const UserModel = require('./database/schemas/User.js')
const http = require('http');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // <-- Your Vite dev server
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

// Connect to database
connect();

io.on('connection', (socket)=> {
      console.log('User Online');

      socket.on('canvas-data', (data)=> {
            socket.broadcast.emit('canvas-data', data);
            
      })
})

// var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
server.listen(8080, () => {
    console.log("Started on : 8080");
})

// app.listen(8080, () => {
//     console.log('Server listening on port 8080');
// });

app.get('/getUsers', async (req, res) => {   
    const users = await UserModel.find();
    res.json(users);
})
// To access data copy this to jsx file

//const [users, setUsers] = useState([]);
// useEffect(() => {
//     async function fetchData() {
//         await axios.get("http://localhost:8080/getUsers")
//         .then(req => setUsers(req.data))
//         .catch(err => console.log(err))
//     }
//     fetchData();
// }, [])
