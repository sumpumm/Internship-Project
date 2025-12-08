const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
app.use(express.json());
require("./conn/conn");
app.use(cors());

app.use("/api/v1",auth);

app.listen(1000,()=>{
    console.log("Server started");
});