import api from "./api";
import TokenService from "./local.service";

const login = async (userName, password) => {
  try {
    const resp = await api.post("/admin/login", {
      userName,
      password,
    });

    if (resp.data.status === true) {
      const fullUserData = resp.data.data;
      TokenService.setUser(fullUserData);
      return fullUserData;
    } else {
      throw resp.data.message;
    }
  } catch (e) {
    throw e;
  }
};

const registerAdmin = async (userName, password) => {
  try {
    const resp = await api.post("/admin/createAdmin", {
      userName,
      password,
    });

    if (resp.data.status === true) {
      return resp.data.data;
    } else {
      throw resp.data.message;
    }
  } catch (e) {
    throw e;
  }
};

const exportedObject = {
  login,
  registerAdmin
};

export default exportedObject;
