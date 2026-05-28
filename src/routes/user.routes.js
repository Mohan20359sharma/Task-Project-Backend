const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

// const {
//     getAllUsers
// } = require("../controller/user.controller");

router.get("/all", userController.getAllUsers);

module.exports = router;