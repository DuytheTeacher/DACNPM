import api from "./api";

const getListVehicles = async () => {
  try {
    const resp = await api.get("/vehicles");
    return resp.data.data;
  } catch (e) {
    throw e;
  }
};

const getVehiclesByDate = async (date) => {
  try {
    const resp = await api.get("/vehicles/date", {
      params: {
        dateTime: date,
      },
    });
    if (resp.data.data.status) return resp.data.data;
    throw resp.data.data.message;
  } catch (e) {
    throw e;
  }
};

const getVehiclesByType = async (type) => {
  try {
    const resp = await api.get("/vehicles/getVehiclesType", {
      params: {
        type,
      },
    });
    return resp.data.data;
  } catch (e) {
    throw e;
  }
};

const uploadNewProduct = async (product) => {
  try {
    const resp = await api.post("/vehicles", {
      data: product,
    });
    return resp.data.data;
  } catch (e) {
    throw e;
  }
};

const exportedObject = {
  getListVehicles,
  getVehiclesByDate,
  getVehiclesByType,
  uploadNewProduct,
};

export default exportedObject;
