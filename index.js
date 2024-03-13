require("dotenv").config()
const express = require("express");
const app = express();
// const port = process.env.PORT || 4000 ;
const port = 8000
require("./config/connection")
const InquaryRoutes = require("./routes/InquaryRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
app.use(express.static('public'))


app.use("/api",ProductRoutes)
app.use("/api",InquaryRoutes)
app.use("/api",AdminRoutes)

app.listen(port,()=>{
    console.log("listening on port " + port);
})