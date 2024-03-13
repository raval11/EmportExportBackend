const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_CONNECTION)
.then(()=>console.log("Database Connection established"))
.catch((error)=>console.log(error))