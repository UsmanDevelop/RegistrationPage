const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

//Connection with Mongo
mongoose.connect("mongodb://localhost:27017/mern_login")
    .then(console.log("DB connected"))


//Creating a Schema
const UserModel = new mongoose.Schema({
    name:String,
    age:String,
    gender:String,
    email:String,
    password:String,
})

//Creating the Model
const User = mongoose.model('user', UserModel);

//API for Registering the User
app.post('/register',async (req,res)=>{
    const {name, age, gender, email, password} = req.body
    
    const newUser = User({
        name, age, gender, email, password
    })
    const findUser = await User.find({email})
    
    if (findUser.length > 0) {
        return res
            .status(400)
            .json({ "message": "User Already Exists" });
    }
    else{
        const response = await newUser.save();
        return res
        .status(200)
        .json({"message":"User Created"})

    }
})

//API for getting all the Registered Users
app.get('/getUsers', async(req, res)=>{
    try {
        const response = await User.find()   
        return res.json(response)
        
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`);
    
})