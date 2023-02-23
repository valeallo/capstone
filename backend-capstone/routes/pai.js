const express = require("express");
const router = express.Router();
const Pai = require("../models/pai");



router.post ("/addPai", async (req, res) => {
    const newPai = new Pai({
        patientName: req.body.patientName,
        patientDateOfBirth: req.body.patientDateOfBirth,
        patientPhoneNumber: req.body.patientPhoneNumber,
        patientAddress: req.body.patientAddress,
        service: req.body.service,
        numberOfTreatments: req.body.numberOfTreatments,
        dateOfActivation: req.body.dateOfActivation,
        expiringDate: req.body.expiringDate,
        status: req.body.status,
    })
    try {
        const savePai = await newPai.save()
        res.status(200).send({message: "pai saved successfully", payload: savePai})
    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
})


router.get ("/pai", async (req, res) => {
    try {
        const allPai = await Pai.find()
        res.status(200).send({message: "all pai", payload: allPai})
    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
})




router.post ("/assistedBy/:id", async (req, res) => {
    const {id} = req.params;
    const {doctorName, doctorId} = req.body; 
    try {
        const assignDoctor = await Pai.findByIdAndUpdate(
            id, 
            {
                $push: {
                    assistedBy: {doctorName, doctorId}
                }
            }, {new: true}     
        )
        res.status(200).send({message: "doctor assigned successfully", payload: assignDoctor})

    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
 })


router.get("/pai/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const pai = await Pai.findById(id)
        res.status(200).send(pai)
        if (!pai) {
            res.status(404).send({message: "pai not found"})
        }
    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
})

router.patch("/pai/:id", async (req, res) => {
    const {id} = req.params;
    const {patientName, patientDateOfBirth, patientPhoneNumber, patientAddress, service, numberOfTreatments, dateOfActivation, expiringDate, status} = req.body;
    try {

        const updatePai = await Pai.findByIdAndUpdate(id, {
            patientName: patientName,
            patientDateOfBirth: patientDateOfBirth,
            patientPhoneNumber: patientPhoneNumber,
            patientAddress: patientAddress,
            service: service,
            numberOfTreatments: numberOfTreatments,
            dateOfActivation: dateOfActivation,
            expiringDate: expiringDate,
            status: status,
        }, {new: true})
        res.status(200).send({message: "pai updated successfully", payload: updatePai})
    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
})

router.delete("/pai/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const deletePai = await Pai.findByIdAndDelete(id)
        if (!deletePai) {
            res.status(404).send({message: "pai not found"})
        }
        res.status(200).send({message: "pai deleted successfully", payload: deletePai})
    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
})

router.get ("/pai/assistedBy/:docId", async (req, res) => {
    const {docId} = req.params;
    try {
        const pai = await Pai.find({assistedBy: {$elemMatch: {doctorId: docId}}})
        if(!pai) {
            res.status(404).send({message: "No PAIs found for the specified doctor ID"})
        }
        res.status(200).send({message: "all pai", payload: pai})
    }
    catch (err) {
        res.status(500).json({message: "an error has occurred", error: err})
    }
})

        









module.exports = router;