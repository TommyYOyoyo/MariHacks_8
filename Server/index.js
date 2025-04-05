const express = require("express");
const app = express();
const cors = require('cors');
const { connect } = require("./database/connect.js");
const UserModel = require('./database/models/User.js')
const { registerUser } = require("./database/registerUser.js");
const bcrypt = require("bcrypt");
const http = require('http');
const { Server } = require('socket.io');

app.use(cors());
app.use(express.json());

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

app.post("/register", (req, res) => {
    registerUser(req.body.username, req.body.password, req.body.email)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    res.json(user);
                } else {
                    res.json("Incorrect password");
                }
            })
            .catch(err => res.status(400).json(err));
        } else {
            res.json("User not found");
        }
    })
});
