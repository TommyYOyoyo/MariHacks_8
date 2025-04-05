const express = require("express");
const app = express();
const cors = require('cors');
const { connect } = require("./database/connect.js");
const UserModel = require('./database/schemas/User.js')

// Connect to database
connect();

app.use(cors());

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

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
