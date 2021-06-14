'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.up = function(db) {
  return db.createTable('company_services', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: 'int',
    },
    user_id: {
      type: 'int',
    },
    description: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    latlng: {
      type: 'json'
    },
    activated: {
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
  return db.dropTable('company_services');
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
