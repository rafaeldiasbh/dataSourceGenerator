const mongoose = require('mongoose');
const DataSource = require('../mongoModels/dataSourceModel');
const oracleDb = require('oracledb');
const dbConfig = require('./dbConfig'); // Import the config file

oracleDb.outFormat = oracleDb.OUT_FORMAT_OBJECT;

let oracleCon;

// Connect to MongoDB using external configuration
mongoose.connect(dbConfig.mongo.uri)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Oracle connection
(async function oracleConnect() {
  try {
    oracleCon = await oracleDb.getConnection({
      user: dbConfig.oracle.user,
      password: dbConfig.oracle.password,
      connectString: dbConfig.oracle.connectString,
    });
    const testQry = await oracleCon.execute('select 1 from dual');
    if (testQry) console.log('Oracle Connected');
  } catch (err) {
    console.error('Oracle connection error:', err);
  }
})();

//////////////////////////////////////////////////////
// Rest of your functions as before

const primaryKeys = [];
const columns = [];

async function findAll() {
  let dataSources = await DataSource.find({});
  return dataSources;
}

async function saveNewDataSource(tableName, jsonMetadata) {
  const dataSource = new DataSource({
    name: tableName,
    metadata: jsonMetadata,
  });
  let result = await dataSource.save();
  primaryKeys = []; // Reset variables
  columns = [];
  return result;
}

async function generateNewDataSource(dataSourceName) {
  const pkResult = await validatePrimaryKeys(dataSourceName);
  const columns = await validateColumns(dataSourceName);
  const file = await createFile(dataSourceName);
  return saveNewDataSource(dataSourceName, file);
}

async function validatePrimaryKeys(tableName) {
  const pkResult = await oracleCon.execute(
    `
    SELECT COLUMN_NAME FROM USER_CONS_COLUMNS 
    WHERE UPPER(TABLE_NAME) = UPPER(:table_name) 
    AND UPPER(CONSTRAINT_NAME) = (SELECT CONSTRAINT_NAME FROM USER_CONSTRAINTS 
                                    WHERE UPPER(TABLE_NAME) = UPPER(:table_name) 
                                    AND CONSTRAINT_TYPE = 'P')`,
    { table_name: tableName }
  );
  if (!pkResult.rows) throw { message: 'Table has no primary key.', code: 501 };

  pkResult.rows.forEach((result) => {
    primaryKeys.push(result.COLUMN_NAME);
  });

  return primaryKeys;
}

async function validateColumns(tableName) {
  const columnsResult = await oracleCon.execute(
    `
    SELECT COLUMN_NAME, DATA_DEFAULT, NULLABLE, DATA_TYPE 
    FROM USER_TAB_COLUMNS WHERE UPPER(TABLE_NAME) = UPPER(:table_name)`,
    { table_name: tableName }
  );
  if (!columnsResult.rows)
    throw { message: "Table doesn't exist or doesn't have columns.", code: 502 };

  columnsResult.rows.forEach((row) => columns.push(row));

  return columns;
}

const getColumnProperty = () => {
  const columnsProperties = [];
  columns.forEach((column) => {
    columnsProperties.push({
      COLUMN_NAME: column.COLUMN_NAME,
      DATA_DEFAULT: column.DATA_DEFAULT
        ? column.DATA_DEFAULT.trim().replace(/'/g, '')
        : column.DATA_DEFAULT,
      NULLABLE: column.NULLABLE,
      DATA_TYPE: column.DATA_TYPE,
    });
  });

  return columnsProperties;
};

const getColumnsName = () => {
  const columnsProperties = [];
  columns.forEach((column) => {
    columnsProperties.push(column.COLUMN_NAME);
  });

  return columnsProperties;
};

async function createFile(tableName) {
  const columnsProperties = getColumnProperty();
  const columnsNames = getColumnsName();
  const json = JSON.stringify(
    {
      [tableName.toLowerCase()]: {
        tableName: tableName.toUpperCase(),
        columns: columnsNames,
        columnsProperties: columnsProperties,
        primaryKeys: primaryKeys,
      },
    },
    null,
    2
  );

  return json;
}

module.exports = {
  generateNewDataSource,
  findAll,
};
