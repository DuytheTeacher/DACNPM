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
    if (resp.data.status) return resp.data.data;
    throw resp.data.message;
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
    const resp = await api.post("/vehicles", product);
    return resp.data.data;
  } catch (e) {
    throw e;
  }
};

const getDetail= async (id) => {
  try {
    const resp = await api.get('/vehicles/getVehicleId', {
      params: {
        _id: id
      }
    });
    
    if (resp) {
      return resp.data.data;
    } else {
      throw resp.data.message;
    }
  } catch (e) {
    throw e;
  }
};

const exportedObject = {
  getListVehicles,
  getVehiclesByDate,
  getVehiclesByType,
  uploadNewProduct,
  getDetail
};

export default exportedObject;
