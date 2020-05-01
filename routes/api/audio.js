const express = require('express');
const router = express.Router();
const AudioController = require('../../controllers/AudioControllers');
const parser = require('../../util/cloudinaryAudioUpload');
const parser2 = require('../../util/cloudinaryImageUpload');
const passport = require('passport');

// @route   Post api/audio/upload
// @desc    Upload Audio
// @access  Public
router.post('/upload', parser.single('audio'), AudioController.UploadAudio);

// @route   Post api/audio/retrieve
// @desc    Retrieve audio
// @access  Public
router.get('/retrieve', AudioController.RetrieveAllAudio);

// @route   Post api/audio/update/:id
// @desc    Update audio
// @access  Public
router.put('/update/:id', AudioController.UpdateAudio);

// @route   Post api/audio/retrieve/:name
// @desc    Retrive  audio by name
// @access  Public
router.get('/retrieve/name/:name', AudioController.RetrieveAudioByName);

// @route   Post api/audio/delete/:id
// @desc    Soft delete audio by id
// @access  Public
router.delete('/delete/:id', AudioController.DeleteAudio);

// @route   Post api/audio/retrieve/:id
// @desc    Retrive  audio by id
// @access  Public
router.get('/retrieve/id/:id', AudioController.RetrieveAudioById);

// @route   Post api/audio/retrieve/album/:id
// @desc    Retrive  all audio by albumId
// @access  Public
router.get('/retrieve/album/:albumId', AudioController.RetrieveAudioByAlbumID);

// @route   Post api/audio/retrieve/artist/:id
// @desc    Retrive  all audio by artistId
// @access  Public
router.get('/retrieve/artist/:artistId', AudioController.RetrieveAudioByArtistID);

// @route   Post api/audio/retrieve/cat/:id
// @desc    Retrive  all audio by artistId
// @access  Public
router.get('/retrieve/cat/:audioCatId', AudioController.RetrieveAudioByAudioCatID);

// @route   Post api/audio/undo/delete/:id
// @desc   undo soft delete
// @access  public
router.put('/undo/delete/:id', AudioController.UndoSoftdelAudio);

// @route   Post api/audio/upload/art/
// @desc   upload audio art
// @access  public
router.put('/upload/art', parser2.single('art'), AudioController.UploadAudioArt);

// @route   Post api/audio/upload2/:id
// @desc    Upload Audio
// @access  Public
router.post(
  '/upload2/:id',
  parser.single('audio'),
  AudioController.UploadAudio2
);

// @route   album api/audio/retrive
// @desc    Retrive all audios
// @access  Public
router.get('/retrieve2', AudioController.RetrieveAllAudio2);

// @route   Post api/audio/like/:id
// @desc    like Audio
// @access  Private
router.put('/likeUnlike/:id',
  passport.authenticate('user', {
    session: false
  }), AudioController.LikeUnlikeAudio)

// @route   Get api/audio/likes/:id
// @desc    get Like
// @access  Private
router.get('/likes/:id',
  passport.authenticate('user', {
    session: false
  }), AudioController.getLikes)

// @route   Get api/audio/comment/:id
// @desc    get Comment
// @access  Private
router.get('/comments/:id',
  passport.authenticate('user', {
    session: false
  }), AudioController.getComment)

// @route   Post api/audio/unlike/:id
// @desc    Unlike Audio
// @access  Private
router.put('/unlike/:id',
  passport.authenticate('user', {
    session: false
  }), AudioController.UnLikeAudio)

// @route   Post api/audio/comment/:id
// @desc   Add comment
// @access  Private
router.post('/comment/:id',
  passport.authenticate('user', {
    session: false
  }), AudioController.AddAudioComment)


// @route   delete api/audio/comment/delete/:id
// @desc   delete comment
// @access  Private
router.delete('/comment/delete/:id',
  passport.authenticate('user', {
    session: false
  }), AudioController.DeleteAudioComment)


module.exports = router;
