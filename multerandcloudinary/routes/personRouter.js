const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { createProfile, getPersons,getPerson,updatePerson,deletePerson } = require('../controllers/personController')
const validatePerson = require('../middleware/personvalidate')



router.post('/profiles',  upload.single('personProfile'), validatePerson, createProfile)
router.get('/profiles', getPersons)
router.get('/profiles/:id', getPerson)
router.put('/profiles/:id', upload.single('personProfile'), updatePerson)
router.delete('/profiles/:id', deletePerson)

module.exports = router