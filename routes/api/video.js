const express = require('express');
const router = express.Router();
const VideoController = require('../../controllers/VideoContollers');
const parser = require('../../util/cloudinaryVideoUpload')
const parser2 = require('../../util/cloudinaryImageUpload');
const passport = require('passport');



// @route   Post api/video/upload
// @desc    Upload Video
// @access  Public
router.post('/upload', parser.single("video"),
    VideoController.UploadVideo)



// @route   Post api/video/retrieve
// @desc    Retrieve video
// @access  Public
router.get('/retrieve',
    VideoController.RetrieveAllVideo)

// @route   Post api/videos/update/:id
// @desc    Update videos
// @access  Public
router.put('/update/:id',
    VideoController.UpdateVideo)


// @route   Post api/video/retrieve/:name
// @desc    Retrive  Video by name
// @access  Public
router.get('/retrieve/name/:name',
    VideoController.RetrieveVideoByName)


// @route   Post api/video/retrieve/:name
// @desc    Retrive  Video by name
// @access  Public
router.get('/retrieve/Id/:id',
    VideoController.RetrieveVideoById)

// @route   Post api/audio/retrieve/artist/:id
// @desc    Retrive  all audio by artistId
// @access  Public
router.get('/retrieve/artist/:artistId',
    VideoController.RetrieveVideoByArtistID);


// @route   Post api/audio/retrieve/cat/:videoCatId
// @desc    Retrive  all audio by videoCatId
// @access  Public
router.get('/retrieve/cat/:videoCatId',
    VideoController.RetrieveVideoByVideoCatID);

// @route   Post api/video/delete/:id
// @desc    Soft delete video by id
// @access  Public
router.delete('/delete/:id',
    VideoController.DeleteVideo)


// @route   Post api/video/undo/delete/:id
// @desc   undo soft delete
// @access  public
router.put('/undo/delete/:id',
    VideoController.UndoSoftdelVideo)


// @route   Post api/video/upload/art/:id
// @desc   upload video art
// @access  public
router.put('/upload/art', parser2.single('art'),
    VideoController.UploadVideoArt)

// @route   Post api/video/like/:id
// @desc    like video
// @access  Private
router.put('/likeUnlike/:id',
    passport.authenticate('user', {
        session: false
    }), VideoController.LikeUnlikeVideo)



// @route   Post api/video/likes/:id
// @desc    get like 
// @access  Private
router.get('/likes/:id',
    passport.authenticate('user', {
        session: false
    }), VideoController.getLikes)

// @route   Post api/audio/likes/:id
// @desc    get comment 
// @access  Private
router.get('/comments/:id',
    passport.authenticate('user', {
        session: false
    }), VideoController.getComment)

// @route   Post api/video/unlike/:id
// @desc    Unlike video
// @access  Private
router.put('/unlike/:id',
    passport.authenticate('user', {
        session: false
    }), VideoController.UnLikeVideo)



// @route   Post api/video/comment/:id
// @desc   Add comment
// @access  Private
router.post('/comment/:id',
    passport.authenticate('user', {
        session: false
    }), VideoController.AddAudioComment)

// @route   delete api/video/comment/delete/:id
// @desc   delete comment
// @access  Private
router.delete('/comment/delete/:id',
    passport.authenticate('user', {
        session: false
    }), VideoController.DeleteAudioComment)


module.exports = router;