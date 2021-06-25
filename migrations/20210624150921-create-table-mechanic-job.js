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
  return db.createTable('mechanic_jobs', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    job_id: {
      type: 'int'
    },
    mechanic_id: {
      type: 'int'
    },
    status:{
      type: 'string'
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
  return db.dropTable('mechanic_jobs');
};

exports._meta = {
  "version": 1
};
