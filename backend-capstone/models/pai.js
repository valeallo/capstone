const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PaiSchema = new Schema({
    patientName: {
        type: String,
        // required: true,
    },
    patientLastName: {
        type: String,
        // required: true,
    },
    patientDateOfBirth: {
        type: String,
       
    },
    patientPhoneNumber: {
        type: String,
        
    },
    patientAddress: {
        type: String,
        
    
    },
    service: {
        type: String,
        // required: true,
    },
    assistedBy: {
        type: Array,
        required: false,
        default: undefined,
    },
    numberOfTreatments: {
        type: String,
        
    },
    dateOfActivation: {
        type: Date,
       
    }, 
    expiringDate: {
        type: Date,
        
    },
    status: {
        type: String,
        
    }
},{
    timestamps: true
}
);


module.exports = mongoose.model("paiModel", PaiSchema, "pai")

