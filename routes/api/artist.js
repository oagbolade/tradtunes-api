
const express = require('express');
const router = express.Router();
const ArtistController = require('../../controllers/ArtistControllers');
const parser = require('../../util/cloudinaryImageUpload')

// @route   Post api/artist/create
// @desc    Create artist
// @access  Public
router.post('/create', parser.single("avatar"),
    ArtistController.CreateArtist)


// @route   Post api/artist/retrieve
// @desc    Retrieve artist
// @access  Public
router.get('/retrieve',
    ArtistController.RetrieveAllArtist)


// @route   Post api/artist/retrieve
// @desc    Retrieve artist include video and audio
// @access  Public
router.get('/retrieve2',
    ArtistController.RetrieveAllArtist2)

// @route   Post api/artist/update/:id
// @desc    Update artist
// @access  Public
router.put('/update/:id',
    ArtistController.UpdateArtist)


// @route   Post api/artist/retrieve/:stageName
// @desc    Retrive  Artist by StageName
// @access  Public
router.get('/retrieve/name/:stageName',
    ArtistController.RetrieveArtistByName)

// @route   Post api/artist/retrieve/:id
// @desc    Retrive  Artist by Id
// @access  Public
router.get('/retrieve/id/:id',
    ArtistController.RetrieveArtistById)



// @route   Post api/artist/delete/:id
// @desc    Soft delete artist by satgeName
// @access  Public
router.delete('/delete/:id',
    ArtistController.DeleteArtist)


// @route   Post api/artist/undo/delete/:id
// @desc   undo soft delete
// @access  public
router.put('/undo/delete/:id',
    ArtistController.UndoSoftdelArtist)

// @route   Post api/artist/upload/avatar/:id'
// @desc   upload picture
// @access  public
router.put('/upload/avatar/:id', parser.single("avatar"),
    ArtistController.UploadPicture)


module.exports = router;