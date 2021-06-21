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
  return db.createTable('jobs', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    company_service_id: {
      type: 'int'
    },
    client_id: {
      type: 'int'
    },
    mechanic_id: {
      type: 'int'
    },
    status: {
      type: 'string'
    },
    client_loc: {
      type: 'json'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = function(db) {
  return db.dropTable('jobs');
};

exports._meta = {
  "version": 1
};
