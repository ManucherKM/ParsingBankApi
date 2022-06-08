const Router = require("express");
const router = new Router();
const controller = require("./authController");

router.get("/", controller.getIndex);
router.get("/allval", controller.getAllval);
router.post("/secval", controller.postOneVal);

module.exports = router;
