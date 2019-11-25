const express = require("express");

const { play } = require("../controllers/game");

const router = express.Router();

router.get("/", play);

module.exports = router;
