const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./models/Employee')
const app=express()
app.use(express.json())
app.use(cors())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your React app's URL
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

mongoose.connect("mongodb://127.0.0.1:27017/employees")
 
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(employees=>{
        if(employees){
            if(employees.password===password)
            {
                res.json("Success")
            }
            else{
                res.json("The password is incorrect")
            }
        }
        else{
            res.json("No record existed");
        }
    })

})


app.post('/register',(req,res)=>{
 EmployeeModel.create(req.body)
 .then(employees=>res.json(employees))
 .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("connect")
})