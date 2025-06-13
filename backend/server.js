const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authroute = require("./routes/Auth");
const stallRoutes = require("./routes/Stalls");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authroute)
app.use("/api/stalls", stallRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("mongodb connected");
})
.catch(err => {console.error("mongodb error", err)});



app.get('/', (req,res)=>{
    res.send("server connected");
})

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
})
