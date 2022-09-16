const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const validator = require("../validators/validator")

//========================~~~~~~~~~~~~~~~~~~~(createIntern)~~~~~~~~~~~~~~~~~~~~~=========================

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (!validator.isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide intern details" })
        }

        //destructuring
        const { name, email, mobile, collegeName } = data;

        //validation starts
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
        //validation ends

        //duplicacy check
        let filterEmail = await internModel.findOne({ email: email })
        if (filterEmail) {
            return res.status(400).send({ message: "Intern with the email already exists " })
        }
        let filterMobile = await internModel.findOne({ mobile: mobile })
        if (filterMobile) {
            return res.status(400).send({ message: "Intern with the mobile number already exists" })
        }
        //duplicacy check ends

        let filterCollege = await collegeModel.findOne({name : collegeName})
        if(!filterCollege){
            return res.status(400).send({status : false, message : "College with such name doesn't exist"})
        }
        let id = filterCollege._id;
        data["collegeId"] = id;

        //creating document
        let created = await internModel.create(data)

        //fitering and sending response
        let filteredData = await internModel.findOne(created).select({_id:0 , createdAt : 0 ,updatedAt : 0 , __v : 0})
        res.status(201).send({ status: true , message : "Intern details successfully added" , data: filteredData })
    }catch(error){
        return res.status(500).send({msg : error.message})
    }
}

module.exports = { createIntern }