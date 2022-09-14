const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const validator = require("../validators/validator")

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (!validator.isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide intern details" })
        }
        const { name, email, mobile, collegeName } = data;
        if (!validator.isValidFullName(name)) {
            return res.status(400).send({ status: false, message: "Name is required and name should be a string of aplhabets" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email id" })
        }
        if (!validator.isValidMobile(mobile)) {
            return res.status(400).send({ status: false, message: "Please enter a valid mobile number" })
        }
        if(!validator.isValidShortName(collegeName)){
            return res.status(400).send({ status: false, message: "Please enter a valid collegeName" })
        }
        let filterEmail = await internModel.findOne({ email: email })
        if (filterEmail) {
            return res.status(400).send({ message: "Intern with the email already exists " })
        }
        let filterMobile = await internModel.findOne({ mobile: mobile })
        if (filterMobile) {
            return res.status(400).send({ message: "Intern with the mobile number already exists" })
        }
        let filterCollege = await collegeModel.findOne({name : collegeName})
        let id = filterCollege._id;
        data["collegeId"] = id;
        let created = await internModel.create(data)
        res.status(201).send({ status: true, data: created })
    }catch(error){
        return res.status(500).send({msg : error.message})
    }
}

module.exports = { createIntern }