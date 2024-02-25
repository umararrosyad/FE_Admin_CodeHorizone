// const axios = require('axios');

import { instance as axios } from "../axios";
const getAllTransaction = async (page, status) => {
  try {
    const params = {
      page,
      status
    };
    const response = await axios.get(`/api/v1/transactions/`, { params });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getOneTransaction = async (id) => {
  try {
    console.log(id)
    const response = await axios.get(`/api/v1/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createSizes = async (id, size_name) => {
  try {
    const requestData = {
      size_name
    };
    const response = await axios.post(`/api/v1/products/${id}/sizes`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(requestData);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateProducts = async (id, name, category_id, werehouse_id, description) => {
  try {
    const requestData = {
      name,
      category_id,
      werehouse_id,
      description
    };
    const response = await axios.put(`/api/v1/products/${id}`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteSizes = async (id, size_id) => {
  try {
    const response = await axios.delete(`/api/v1/products/${id}/sizes/${size_id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllTransaction, createSizes, getOneTransaction, updateProducts, deleteSizes };
