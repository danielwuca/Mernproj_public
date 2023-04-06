const router = require("express").Router();
const copyright_complaint = require("../models/copyright_complaint");

router.get("/", async (req, res) => {
  const options = {
    sort: { createdAt: 1 },
  };

  const cursor = await copyright_complaint.find(options);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.post("/", async (req, res) => {
  const newCopyright_complaint = copyright_complaint({
    itype: req.body.itype,
    urls: req.body.urls,
    works_infringed: req.body.works_infringed,
    owner: req.body.owner,
    addr_street: req.body.addr_street,
    full_name: req.body.full_name,
    addr_city: req.body.addr_city,
    job_name: req.body.job_name,
    addr_state: req.body.addr_state,
    email: req.body.email,
    addr_zip: req.body.addr_zip,
    phone: req.body.phone,
    fax: req.body.fax,
    proclamation_1: req.body.proclamation_1,
    proclamation_2: req.body.proclamation_2,
    proclamation_3: req.body.proclamation_3,
    signature: req.body.signature
  });
  try {
    const savedCopyright_complaint = await newCopyright_complaint.save();
    return res.status(200).send({ success: true, copyright_complaint: savedCopyright_complaint });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await copyright_complaint.findOneAndDelete(filter);
  if (result) {
    return res.json({ success: true, msg: "Delete Successfuly" });
  } else {
    return res.status(400).send({ success: false, msg: "Item not found" });
  }
});


module.exports = router;