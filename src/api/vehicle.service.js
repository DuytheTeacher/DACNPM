import api from "./api";

const getListVehicles = async () => {
  try {
    const resp = await api.get("/vehicles");
    return resp.data.data;
  } catch (e) {
    throw e;
  }
};

const exportedObject = {
  getListVehicles,
};

export default exportedObject;
