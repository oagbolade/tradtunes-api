const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const app = express();
// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passportAdmin")(passport);
require("./config/passportUser")(passport);
require("./config/passportFirstLevelAdmin")(passport);

/** set up routes {API Endpoints} */
app.use(require("./routes"));

const PLATFORMS = {
  production: "PRODUCTION",
  postman: "POSTMAN",
  emulator: "ANDROID"
};

const startServer = platform => {
  if (platform === PLATFORMS.production || platform === PLATFORMS.postman) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, console.log(`Server started on port ${PORT} `));
  }

  if (platform === PLATFORMS.emulator) {
    const PORT = 80;

    app.listen(
      PORT,
      "192.168.43.203",
      console.log(`Server started on port ${PORT} `)
    );
  }
};

startServer(PLATFORMS.postman);
