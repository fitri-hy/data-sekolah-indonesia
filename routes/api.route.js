const express = require("express");
const router = express.Router();
const SekolahController = require("../controllers/sekolah.controller");

router.get("/sekolah", SekolahController.getSekolah);
router.get("/wilayah", SekolahController.getWilayah);
router.get("/bentuk-pendidikan", SekolahController.getBentukPendidikan);
router.get("/sekolah/:id", SekolahController.getDetailSekolah);

module.exports = router;