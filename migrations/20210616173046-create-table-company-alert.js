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
  return db.createTable('company_alert', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    company_id: {
      type: 'int'
    },
    company_service_id: {
      type: 'int'
    },
    client_id: {
      type: 'int'
    },
    is_accepted: {
      type: 'boolean'
    },
    is_received: {
      type: 'boolean'
    },
    is_valid: {
      type: 'boolean'
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
  return db.dropTable('company_alert');
};

exports._meta = {
  "version": 1
};
