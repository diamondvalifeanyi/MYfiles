const contactModel = require('../models/model')
const cloudinary = require('../config/cloudinary')

const newContact = async (req, res)=>{
    const {name, email, message}=req.body
    try {
    const picture = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, (error, profilePicture)=>{
        try {return profilePicture}
        catch(error) {
            error.message}
    })


    const data = {
        name,
        email,
        message,
        profilePicture:{public_id:picture.public_id,
        url:picture.url}
    }

    const contact = await contactModel.create(data)
    res.status(200).json({
        message: "contact created successfully",
        data: contact
    })
       console.log(contact) 
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllContacts = async (req, res)=>{
    try {
            
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getContactById = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateContact = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const deleteContact = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    newContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
}