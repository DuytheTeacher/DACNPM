import api from "./api";

const getOTP = async (body) => {
  try {
    const resp = await api.post('/payment/sendOtpMailCustomer', body);
    if (resp.data.status) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

const verifyOTP = async (otp, email) => {
  try {
    const resp = await api.post('/payment/verifyOtpPayment', {otp, email});
    return resp.data;
  } catch (e) {
    throw e;
  }
};

const exportedObject = {
  getOTP,
  verifyOTP
};

export default exportedObject;