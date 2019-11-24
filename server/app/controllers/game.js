const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const play = asyncHandler(async (req, res, next) => {
  res.status(200).send({ ok: "ok" });
});

module.exports = {
  play
};
