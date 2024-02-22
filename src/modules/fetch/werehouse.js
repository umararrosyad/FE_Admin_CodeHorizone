// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getAllWerehouse = async (page, searchTerm) => {
  try {
    const params = {
      page,
      name: searchTerm
    };
    const response = await axios.get("/api/v1/werehouses/", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createWerehouse = async (werehouse_name, address, province, city) => {
  try {
    const requestData = {
      werehouse_name: werehouse_name,
      address: address,
      province_id: province,
      city_id: city
    };
    const response = await axios.post("/api/v1/werehouses", requestData, {
      headers: { "Content-Type": "application/json" }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateWerehouse = async (id, werehouse_name, address, province, city) => {
  try {
    const requestData = {
      werehouse_name: werehouse_name,
      address: address,
      province_id: province,
      city_id: city
    };
    const response = await axios.put(`/api/v1/werehouses/${id}`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteWerehouse = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/werehouses/${id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllWerehouse, createWerehouse, updateWerehouse, deleteWerehouse };
