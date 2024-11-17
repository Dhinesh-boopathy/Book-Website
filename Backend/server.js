require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./routes/books')
const userRoutes = require('./routes/user')




const express = require('express');


//express app
const app = express();
 
//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}) 

app.use('/api/home', router)
app.use('/api/home/user',userRoutes) 

 


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{ 
        app.listen(process.env.PORT,()=>{
            console.log('Connected to db & listening on port',process.env.PORT);
        })
    })

    .catch((error)=>{ 
        console.log(error); 
    })







