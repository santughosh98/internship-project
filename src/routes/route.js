const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController")


//~~~~~~~~~~~~~~~~~~~~~~~~~(POST API / createCollege)~~~~~~~~~~~~~~~~~~~~~~~~~

router.post("/functionup/colleges",collegeController.createCollege)

//~~~~~~~~~~~~~~~~~~~~~~~~~~(POST API / createIntern)~~~~~~~~~~~~~~~~~~~~~~~~~

router.post("/functionup/interns" , internController.createIntern)

//~~~~~~~~~~~~~~~~~~~~~~~~~~(GET API / getCollegeDetails)~~~~~~~~~~~~~~~~~~~~~

router.get("/functionup/collegeDetails" , collegeController.getCollegeDetails)



module.exports = router;

