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
      TokenService.setUser(
        JSON.stringify({ ...fullUserData })
      );
    } else {
      throw resp.data.message;
    }
  } catch (e) {
    throw e;
  }
};

const exportedObject = {
  login,
};

export default exportedObject;
