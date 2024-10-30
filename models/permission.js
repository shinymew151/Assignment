const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  }  
});

const Permission = mongoose.model('Permission', schema);

module.exports = Permission;
