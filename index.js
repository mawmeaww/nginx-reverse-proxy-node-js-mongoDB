const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const os = require('os')
const app = express()

app.use(express.json())

//home page
app.get('/', (req, res) => {
    res.json({message: "Respond from: ", hostname: `${os.hostname}`});
});

//GET all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            message: `Respond from host: ${os.hostname()}`,
            user: users
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//GET user by id
app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({id});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: `Respond from host: ${os.hostname()}`,
            user: user
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//POST user (add user)
app.post('/users', async (req, res) => {
    try {
       const user = await User.create(req.body);
       res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//PUT user (update user) by id
app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        const user = await User.findOneAndUpdate({id}, updateData, {new: true});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//DELETE user by id
app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOneAndDelete({id});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//connect to mongoDB
mongoose.connect('mongodb+srv://nonthipatsri:cg8vtbIVRHLpW1ov@mycluster01.bz4n3qk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MyCluster01')
  .then(() => {
    console.log('Database Connected!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log('Database Connection failed');
});