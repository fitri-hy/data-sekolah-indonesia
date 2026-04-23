const sekolahService = require("../services/sekolah.service");

exports.getSekolah = async (req, res) => {
  try {
    let {
      page = 0,
      size = 12,
      keyword = "",
      kabupaten_kota = "",
      bentuk_pendidikan = "",
      status_sekolah = ""
    } = req.query;

    page = Number(page);
    size = Number(size);

    if (![12, 24, 48].includes(size)) size = 12;

    if (status_sekolah && !["NEGERI", "SWASTA"].includes(status_sekolah)) {
      return res.status(400).json({
        error: true,
        message: "status_sekolah harus NEGERI atau SWASTA"
      });
    }

    const data = await sekolahService.cariSekolah({
      page,
      size,
      keyword,
      kabupaten_kota,
      bentuk_pendidikan,
      status_sekolah
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

exports.getWilayah = async (req, res) => {
  try {
    const { keyword = "" } = req.query;
    const data = await sekolahService.getWilayah(keyword);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getBentukPendidikan = async (req, res) => {
  try {
    const data = await sekolahService.getBentukPendidikan();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getDetailSekolah = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sekolahService.getDetailSekolah(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};