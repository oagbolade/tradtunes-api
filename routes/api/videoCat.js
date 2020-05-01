const express = require('express');
const router = express.Router();
const VideoController = require('../../controllers/VideoCatcontrollers');

// @route   Post api/videocat/create
// @desc    Create videocat
// @access  Public
router.post('/create',
    VideoController.CreateVideoCat)


// @route   Post api/videoCat/retrieve
// @desc    Retrieve videoCat
// @access  Public
router.get('/retrieve',
    VideoController.RetrieveAllVideoCat)

// @route   Post api/videoCat/update/:id
// @desc    Update videoCat
// @access  Public
router.put('/update/:id',
    VideoController.UpdateVideoCat)


// @route   Post api/videoCat/retrieve/:name
// @desc    Retrive  videoCat by name
// @access  Public
router.get('/retrieve/:name',
    VideoController.RetrieveVideoCat)



// @route   Post api/videoCat/delete/:id
// @desc    Soft delete videoCat by satgeid
// @access  Public
router.delete('/delete/:id',
    VideoController.DeleteVideoCat)


// @route   Post api/videoCat/undo/delete/:id
// @desc   undo soft delete
// @access  public
router.put('/undo/delete/:id',
    VideoController.UndoSoftdelVideoCat)


module.exports = router;