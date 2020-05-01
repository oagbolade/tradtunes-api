const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserControllers");
const passport = require("passport");
const parser = require("../../util/cloudinaryImageUpload");
const PlayListController = require("../../controllers/PlayListController");

// @route   Post api/user/register
// @desc    Register user
// @access  Public
router.post("/register", UserController.UserRegister);

// @route   Post api/user/login
// @desc    Login user
// @access  Public
router.post("/login", UserController.UserLogin);

// @route   Post api/user/register
// @desc    Returns current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("user", {
    session: false
  }),
  UserController.ReturnUser
);

// @route   Post api/user/retrieve
// @desc    Returns current user
// @access  Private
router.get("/retrieve/:id", UserController.RetrieveUserById);

// @route   Post api/user/all
// @desc    Returns all Users
// @access  Public
router.get("/all", UserController.AllUser);

// @route   Post api/user/delete/:id
// @desc    soft delete user
// @access  Private
router.delete("/delete/:id", UserController.SoftDelUser);

// @route   Post api/user/delete2
// @desc    soft delete user
// @access  Private
router.delete(
  "/delete2",
  passport.authenticate("user", {
    session: false
  }),
  UserController.SoftDelUser2
);

// @route   Post api/admin/undo/delete/:id'
// @desc   undi soft delete
// @access  public
router.put("/undo/delete/:id", UserController.UndoSoftdelUser);

// @route   Post api/user/upload/avatar/:id
// @desc    upload profile image
// @access  Private
router.put(
  "/upload/avatar",
  parser.single("avatar"),
  passport.authenticate("user", {
    session: false
  }),
  UserController.UploadPicture
);

// @route   PUT api/user/update/profile
// @desc    update user profile
// @access  Private
router.put(
  "/update/profile",
  passport.authenticate("user", {
    session: false
  }),
  UserController.UpdateUser
);

// @route   Get api/user/retrieve/:id
// @desc    get User by id
// @access  Private
router.get("/retieve/:id", UserController.RetrieveUserById);

// @route   GET api/user/password
// @desc    change password
// @access  Public
router.put(
  "/password",
  passport.authenticate("user", {
    session: false
  }),
  UserController.ChangePassword
);

// @route   GET api/user/playlist/create
// @desc    create playList
// @access  Public
router.post(
  "/playlist/create",
  passport.authenticate("user", {
    session: false
  }),
  PlayListController.CreatePlayList
);

// @route   GET api/user/playlist/delete
// @desc    delete playlist
// @access  Public
router.delete(
  "/playlist/delete/:id",
  passport.authenticate("user", {
    session: false
  }),
  PlayListController.DeletePlayList
);

// @route   GET api/user/playlist/create
// @desc    retrieve play List
// @access  Public
router.get(
  "/playlist/retrieve",
  passport.authenticate("user", {
    session: false
  }),
  PlayListController.RetrievePlayList
);

// @route   GET api/user/playlist/add
// @desc    add song to playlist
// @access  Public
router.put(
  "/playlist/update",
  passport.authenticate("user", {
    session: false
  }),
  PlayListController.UpdatePlayList
);

module.exports = router;
