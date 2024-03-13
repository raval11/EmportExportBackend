const express = require('express');
const AdminRoutes = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Register, login } = require('../controller/AdminController');

AdminRoutes.use(express.json());
AdminRoutes.use(bodyParser.json());
AdminRoutes.use(bodyParser.urlencoded({ extended: true }))
AdminRoutes.use(cors());

AdminRoutes.post("/Register",Register)
AdminRoutes.post("/login",login)

module.exports = AdminRoutes;