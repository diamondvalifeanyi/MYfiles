const hospitalModel = require("../Model/hospitalmodel")

// create new patient record
const newPatients = async (req, res) => {
    try {
        const patient = await hospitalModel.create(req.body)
        if (patient){
            res.status(201).json({
                message: "Patient created successfully",
                data: patient
            })
        } else {
            res.status(404).json({
                message: "Patient creation failed"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Patient creation failed"
        })
        
    }
}

module.exports = newPatients



//get all patient record
const getAll = async (req, res) => {
    try {
        const record = await hospitalModel.find(req.body)
        if(record){
            res.status(200).json({
                message: "all patient records",
                data: record
            })
        }else{
            res.status(404).json({
                message: "record not found",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

module.exports = getAll



// // get one record by name

// const getOne = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const onePatient = await hospitalModel.findById(id)
//         if (!onePatient) {
//             res.status(404).json({
//                 message: error.message
//             })
//         }else {
//             res.status(200).json({
//                 message: "patient found",
//                 data: onePatient
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
        
//     }
// }

// module.exports = getOne

// // update a patient information
// const update = async (req, res) => {
//     try {
//         const id = req.params.id
//         const updatedInfo = await hospitalModel.findByIdAndUpdate(id, req.body,{new: true});
//         if (!updatedInfo){
//             res.status(404).json({
//                 message: "could not update patient info"
//             })
//         }else {
//             res.status(200).json({
//                 message: "patients info updated successfully",
//                 data: updatedInfo
//             })
//         }
        
//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         })
        
//     }
// }
// module.exports = update

// delete a patient info from the database
// const deletePatient = async (req, res) => {
//     try {
//       const patientId = req.params.id;
//       const patient = await hospitalModel.findByIdAndDelete(patientId);
//       if (!patient) {
//         res.status(400).json({
//           messaage: "error deleting patient"
//         });
//       } else {
//         res.status(200).json({
//           messaage: "deleted successfully",
//           data: patient,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

//   module.exports = deletePatient