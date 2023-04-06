const mongoose = require("mongoose");
const copyright_complaintSchema = mongoose.Schema (
  {
    itype: {
      type: Number,
      require: true
    },
    urls: {
      type: String,
      require: true
    },
    works_infringed: {
      type: String,
      require: true
    },
    owner: {
      type: String,
      require: true
    },
    addr_street: {
      type: String,
      require: true
    },
    full_name: {
      type: String,
      require: true
    },
    addr_city: {
      type: String,
      require: true
    },
    job_name: {
      type: String,
      require: true
    },
    addr_state: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    addr_zip: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true
    },
    fax: {
      type: String,
      require: true
    },
    proclamation_1: {
      type: Boolean,
      require: true
    },
    proclamation_2: {
      type: Boolean,
      require: true
    },
    proclamation_3: {
      type: Boolean,
      require: true
    },
    signature: {
      type: String,
      require: true
    }
  }
  ,
  { timestamps: true }
);


module.exports = mongoose.model("copyright_complaint", copyright_complaintSchema);
