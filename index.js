const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); 

const USERS = [{
    name: "kamran",
    userId: "user1"
}];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    quesId: "q1",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5",
    }]
}];

const SUBMISSION = [{
    userId: "user1",
    quesId: "q1",
    status: "solved"
}]



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
    
    const userId = req.query.userId;
    const quesId = req.query.quesId;
    
    //finding the user
    const user = USERS.find(user=>user.userId===userId);

    if(!user){
        return res.status(400).send("User not found");
    }

    //finding the question
    const question = QUESTIONS.find(ques=>ques.quesId===quesId);

    if(!question){
        return res.status(400).send("Question not found");
    }

    //storing the user submission
    const userSubmission = SUBMISSION.filter(it=>it.userId===userId && it.quesId===quesId);
    res.json(userSubmission);
});


app.post('/compile', (req,res)=>{

    const userId = req.body.userId;
    const quesId = req.body.quesId;
    const solution = req.body.solution;

    const isAccepted = Math.floor(Math.random()*2);

    const ans = {
        uid: userId,
        qid: quesId,
        code: solution,
        status: isAccepted ? "All test cases passed" : "Compilation error"
    };

    SUBMISSION.push(ans);
    return res.status(200).json(ans);
});


//admin section
app.post('/admin', (req,res)=>{

    const newProblem = {
        title: req.body.title,
        description: req.body.description
    };

    QUESTIONS.push(newProblem);
    return res.status(200).json(newProblem);
});

//integrating html and css
app.use(express.static(__dirname + "/public/"));

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});