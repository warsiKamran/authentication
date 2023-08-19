const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); 

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];

const SUBMISSION = [

]

app.post('/signup', (req,res)=>{

    const {email,password} = req.body;
    const userExists = USERS.some(user=>user.email===email);

    if(userExists){
        res.status(400).send("User with this email already exists");
    } else{
        const newUser = {email,password};
        USERS.push(newUser);
    }

    res.status(200).send("Profile created successfully");
});

app.post('/login', (req,res)=>{
    
    const {email,password} = req.body;
    const userExists = USERS.find(user=>user.email===email);

    if(!userExists){
        res.status(400).send("User doesn't exist");
    }

    if(userExists && userExists.password===password){

        const randomToken = "akfhrperfdo";
        return res.status(200).json({message: "Login Successfull", randomToken});
    } else{
        res.status(400).send("Incorrect Password");
    }
});

app.get('/questions', (req,res)=>{
    
    res.redirect("/ques.html");
});

app.get('/back', (req,res)=>{

    res.redirect('/');
});

app.get('/submissions', (req,res)=>{
    res.send("Hello from submissions");
});

//integrating html and css
app.use(express.static(__dirname + "/public/"));

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});