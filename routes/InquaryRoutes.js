const express = require("express")
const InquaryRoutes = express()
const bodyParser = require('body-parser')
const { AddInquary,ShowInquary, EmailSend, DeleteInquary } = require("../controller/InquaryController")
const cors = require("cors")

InquaryRoutes.use(express.json())
InquaryRoutes.use(bodyParser.json()) // support json encoded bodies
InquaryRoutes.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
InquaryRoutes.use(cors());


InquaryRoutes.post("/AddInquary",AddInquary)
InquaryRoutes.post("/sendmail",EmailSend)
InquaryRoutes.get("/ShowInquary",ShowInquary)
InquaryRoutes.delete("/DeleteInquary/:id",DeleteInquary)


module.exports = InquaryRoutes