'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addColumn(
    'company_alert', 'client_latlng', 
    {type:'json'}
  );
};

exports.down = function(db) {
  return db.removeColumn('company_alert', 'client_latlng');
};

exports._meta = {
  "version": 1
};
