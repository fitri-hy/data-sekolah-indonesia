const axios = require("axios");
const { BASE_URL } = require("../config/api");

exports.cariSekolah = async (params) => {
  const response = await axios.post(`${BASE_URL}/sekolah/cari-sekolah`, params);
  return response.data;
};

exports.getWilayah = async (keyword) => {
  const response = await axios.post(`${BASE_URL}/referensi/wilayah`, { keyword });
  return response.data;
};

exports.getBentukPendidikan = async () => {
  const response = await axios.get(`${BASE_URL}/referensi/bentuk-pendidikan`);
  return response.data;
};

exports.getDetailSekolah = async (id) => {
  const response = await axios.get(`${BASE_URL}/sekolah/full-detail/${id}`);
  return response.data;
};