const express = require('express');
const router = express.Router();
const AudioCatController = require('../../controllers/AudioCatControllers');

// @route   Post api/audioCat/create
// @desc    Create AudioCat
// @access  Public
router.post('/create',
    AudioCatController.CreateAudioCat)


// @route   Post api/audioCat/retrieve
// @desc    Retrieve AudioCat
// @access  Public
router.get('/retrieve',
    AudioCatController.RetrieveAllAudioCat)

// @route   Post api/audioCat/update/:id
// @desc    Update AudioCat
// @access  Public
router.put('/update/:id',
    AudioCatController.UpdateAudioCat)


// @route   Post api/audioCat/retrieve/:name
// @desc    Retrive  AudioCat by name
// @access  Public
router.get('/retrieve/:name',
    AudioCatController.RetrieveAudioCat)



// @route   Post api/audioCat/delete/:id
// @desc    Soft delete AudioCat by satgeid
// @access  Public
router.delete('/delete/:id',
    AudioCatController.DeleteAudioCat)


// @route   Post api/audioCat/undo/delete/:id
// @desc   undo soft delete
// @access  public
router.put('/undo/delete/:id',
    AudioCatController.UndoSoftdelAudioCat)


module.exports = router;