var models = require("../models");
const User = models.User;
const axios = require("axios");

exports.InitialisePayments = (req, res) => {
  const callback_url = `https://api.paystack.co/transaction/verify`;
  const data = {
    amount: 200000,
    email: "dayoagbolade@gmail.com",
    callback_url
    // currency: "NGN"
  };

  const secret_key = process.env.PAYSTACK_SECRET;

  const axiosConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${secret_key}`
    }
  };

  const URL = `https://api.paystack.co/transaction/initialize`;

  const getData = async () => {
    try {
      const response = await axios.post(
        URL,
        {
          amount: 200000,
          email: "dayoagbolade@gmail.com",
          callback_url
        },
        axiosConfig
      );
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  };
  getData();
};

exports.VerifyPayments = (req, res) => {
  const URL = `https://api.paystack.co/transaction/verify/{referenceID}`;
  // May need to save reference number in the db for future validation
};
