const collegeModel = require("../models/collegeModel");
const validator = require("../validators/validator")


// - Create a college - a document for each member of the group
// - The logo link will be provided to you by the mentors. This link is a s3 (Amazon's Simple Service) url. 
//Try accessing the link to see if the link is public or not.

const createCollege = async function (req, res) {

    try {
        let data = req.body;
        if (!validator.isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide college details" })
        }
        const { name, fullName, logoLink } = data;
        console.log(data)
        if (!validator.isValidShortName(name)) {
            return res.status(400).send({ message: "name should be a string , all alphabets should be in lower case " })
        }
        console.log(name)
        if (!validator.isValidFullName(fullName)) {
            return res.status(400).send({ status: false, message: "Fullname should be a string of aplhabets" })
        }
        if (!validator.isValidLink(logoLink)) {
            return res.status(400).send({ status: false, message: "Please provide a valid logo link" })
        }
        let filter = await collegeModel.findOne({name : name})
        if(filter){
            return res.status(400).send({message : "College with this name already exists"})
        }
        let created = await collegeModel.create(data);
        res.status(201).send({status : true , data: created })
    }catch(error){
        return res.status(500).send({message : error.message})
    }
}

module.exports = { createCollege }

