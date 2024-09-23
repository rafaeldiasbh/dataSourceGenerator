
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DataSourceSchema = new Schema({
  name: String,
  metadata: String
});
DataSourceSchema.set('toJSON', { virtuals: true }); 
const DataSource = mongoose.model('DataSource', DataSourceSchema);
//exports.DataSource = DataSource;
module.exports = DataSource;