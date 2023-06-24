const personModel = require('../models/personModel');
const cloudinary = require('../utils/cloudinary')
const fs = require('fs')
const {validatePerson} = require('../middleware/personvalidate')


// Create a Profile
const createProfile = async (req, res)=>{
    try {
        const { personName, personPhone } = req.body;
        //const {error} = await validatePerson(req.body);
        // if (error) {
        //     res.status(409).json({
        //         message: error.details[0].message
        //     })
        // } else {}
         const result = await cloudinary.uploader.upload(req.file.path);
        const newPerson = new personModel({
            personName,
            personPhone,
            personProfile: result.secure_url
        })

        await fs.unlinkSync(req.file.path)
        const savedPerson = await newPerson.save();
        if(savedPerson){
            res.status(201).json({
                message: 'Person created successfully',
                data: savedPerson
            })
        } else {
            res.status(400).json({
                message: 'Unable to create person'
            })
        }
        
    } catch (error) {
        const err = error.message;
        res.status(500).json({
            message: `Nonsense ${err}`
        })
    }
}




// // Create a Profile
// const createProfile = async (req, res)=>{
//     try {
//         const { personName, personPhone } = req.body;
//         const result = await cloudinary.uploader.upload(req.file.path);
//         const newPerson = new personModel({
//             personName,
//             personPhone,
//             personProfile: result.secure_url
//         })

//         await fs.unlinkSync(req.file.path)
//         const savedPerson = await newPerson.save();
//         if(savedPerson){
//             res.status(201).json({
//                 message: 'Person created successfully',
//                 data: savedPerson
//             })
//         } else {
//             res.status(400).json({
//                 message: 'Unable to create person'
//             })
//         }
//     } catch (error) {
//         const err = error.message;
//         res.status(500).json({
//             message: `Nonsense ${err}`
//         })
//     }
// }






const getPersons = async (req, res, next) => {
    try {
        const persons = await personModel.find();
        if(persons == null) {
            res.status(400).json({
                message: 'No persons found'
            })
        } else {
            res.status(200).json({
                message: 'Persons found',
                data: persons,
                size: persons.length
            })
        }
    } catch (error) {
        const err = error.message;
        res.status(500).json({
            message: `Nonsense ${err}`
        })
    }
}

const getPerson = async (req, res)=>{
    try {
        const { id } = req.params;
        const person = await personModel.findById(id);
        if (!person) {
            res.status(404).json({
                message: 'Person not found'
            });
        } else {
            res.status(200).json({
                message: 'Person successfully Found',
                data: person
            });
        }
    } catch (error) {
        const err = error.message;
        res.status(500).json({
            message: `Nonsense ${err}`
        })
    }
}


const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await personModel.findById(id);
        const {personName, personPhone} = req.body;

        if(person) {
            if(person.personProfile) {
                const public_id = person.personProfile.split('/').pop().split('.')[0];
                //console.log(public_id);
                await cloudinary.uploader.destroy(public_id);
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            person.personName = personName;
            person.personPhone = personPhone;
            person.personProfile = req.file.path;

            fs.unlinkSync(req.file.path);
            res.status(200).json({
                message: 'Updated Successfully'
            })
        } else {
            res.status(404).json({
                message: 'person not found'
            })
        }
    } catch (error) {
        const err = error.message;
        res.status(500).json({
            message: `Nonsense ${err}`
        })
    }
}


const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await personModel.findByIdAndDelete(id);
       // if(person) {
            if(person.personProfile) {
                const public_id = person.personProfile.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(public_id);
            }
            res.status(200).json({
                message: 'Deleted Successfully'
            })
     //   }
    } catch (error) {
        const err = error.message;
        res.status(500).json({
            message: `Nonsense ${err}`
        })
    }
}

module.exports = {
    createProfile,
    getPersons,
    getPerson,
    updatePerson,
    deletePerson
}