const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const validator = require("../validators/validator")

const createCollege = async function (req, res) {

    try {
        let data = req.body;
        if (!validator.isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide college details" })
        }
        const { name, fullName, logoLink } = data;
        //console.log(data)
        if (!validator.isValidShortName(name)) {
            return res.status(400).send({ message: "name should be a string , all alphabets should be in lower case " })
        }
        //console.log(name)
        if (!validator.isValidFullName(fullName)) {
            return res.status(400).send({ status: false, message: "Fullname should be a string of aplhabets" })
        }
        if (!validator.isValidLink(logoLink)) {
            return res.status(400).send({ status: false, message: "Please provide a valid logo link" })
        }
        let filter = await collegeModel.findOne({ name: name })
        if (filter) {
            return res.status(400).send({ message: "College with this name already exists" })
        }
        let created = await collegeModel.create(data);
        res.status(201).send({ status: true, data: created })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const getCollegeDetails = async function (req, res) {
    try {
        let query = req.query;
        let collegeFilter = {};
        if (!validator.isValidBody(query)) {
            return res.status(400).send({ status: false, message: "PLease provide a query params" })
        }
        let collegeName = req.query.collegeName;
        if (!validator.isValidShortName(collegeName)) {
            return res.status(400).send({ status: false, message: "Collegename is required and name should be a string , all alphabets should be in lower case " })
        }
        let collegeDetails = await collegeModel.findOne({ name: collegeName })//.select({ name: 1, fullName: 1, logoLink: 1, _id: 1 });
        if (!validator.isValidObject(collegeDetails)) {
            return res.status(404).send({ message: "No college found" })
        }
        //console.log(collegeDetails)
        let newId = collegeDetails._id
       
        // console.log("hi")
        collegeFilter["name"] = collegeDetails.name;
        collegeFilter["fullName"] = collegeDetails.fullName;
        collegeFilter["logoLink"] = collegeDetails.logoLink;
        let findInterns = await internModel.find({collegeId : newId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        //console.log(findInterns)
        if(!validator.isValidArray(findInterns)){
            return res.status(404).send({status : false ,message : "No intern found"})
        }
        collegeFilter["interns"] = findInterns
        //console.log({data :collegeFilter})
        res.send({msg : collegeFilter})
        // if (!validator.isValidObject(collegeDetails)) {
        //     return res.status(404).send({ message: "No college found" })
        // }
        // console.log(collegeDetails)
        // let findInterns = await internModel.find({ collegeId: collegeDetails._id }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        // collegeDetails["interns"] = findInterns;
        // console.log(findInterns)
        // res.status(200).send({status : true , data: collegeDetails })
    }catch(error){
        return res.status(500).send({ message: error.message })
    }
}


module.exports = { createCollege, getCollegeDetails }

