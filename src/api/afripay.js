import axiosClient from "./axiosClient";

export const initiatePayment = ({ program_id, amount, email }) =>
  axiosClient.post("/afripay/initiate/", { program_id, amount, email }).then((res) => res.data);