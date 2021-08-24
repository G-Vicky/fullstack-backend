const router = require("express").Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const Customer = require("../models/Customer");

//get all tasks
router.get("/", async (req, res) => {
  //   const newCustomer = new Customer({
  //     name: "Vignesh",
  //     email: "jsmith@test.com",
  //     phone: "123456789",
  //     city: "bangalore",
  //     state: "karnataka",
  //     country: "India",
  //     organization: "Company 1",
  //     jobProfile: "Software Developer",
  //     additionalInfo:
  //       "Has Bought a lot of products before and a high Value Customer",
  //   });

  //   await newCustomer.save();

  const data = await Customer.find();
  console.log(data);
  res.status(200).json({
    status: "success",
    message: "data retrieved succesfully",
    data: data,
  });
});

router.get("/:customerid", async (req, res) => {
  const customerID = Number(req.params.customerid);
  console.log(customerID);
  const data = await Customer.findOne({ id: customerID });
  console.log(data);
  res.status(200).json({
    status: "success",
    message: "data retrieved succesfully",
    data: data,
  });
});

module.exports = router;
