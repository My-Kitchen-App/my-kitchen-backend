'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;


const instructionsSchema = new Schema ({
  name: {type: String},
  steps: { type: Array }
});

const Instructions = mongoose.model('Instructions', instructionsSchema)

module.exports = Instructions;

