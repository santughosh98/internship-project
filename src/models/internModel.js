const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        collegeId: {
            type: objectId,
            ref: "college"
        }

    }, { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema)

