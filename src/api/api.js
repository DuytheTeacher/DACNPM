import axios from "axios";
import TokenService from "./local.service";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res) => {
    const originalConfig = res.config;
    if (
      !res.data.status &&
      res.data.error &&
      originalConfig.url !== "/admin/login"
    ) {
      // Access Token was expired
      try {
        const rs = await instance.put("/admin/refreshToken", {
          data: {
            refreshToken: TokenService.getLocalRefreshToken(),
          },
        });

        if (rs.data.satus) {
          const { token } = rs.data;
          TokenService.updateLocalAccessToken(token);

          return instance(originalConfig);
        }
        throw rs.data.message;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export default instance;
