const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  permissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}]
});

const Role = mongoose.model('Role', schema);

module.exports = Role;
