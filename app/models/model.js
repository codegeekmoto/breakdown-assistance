const pool = require('../databases/postgres');

class Model {

    constructor(tableName) {
        this.tableName = tableName;
    }

    async insert(colStr, data) {
        let valStr = '';

        for (let i = 0; i < data.length; i++) {
            valStr += `$${i+1}`;
            
            if (i < data.length - 1) {
                valStr += ', '
            }
        }

        const sql =`INSERT INTO ${this.tableName}
                    (${colStr}) VALUES(${valStr}) RETURNING *`;

        return await this.execute(sql, data)
    }

    async select(whereCol, whereValue) {
        const sql =`SELECT * FROM ${this.tableName}
                    WHERE ${whereCol} = $1`;

        return await this.execute(sql, [whereValue])
    }

    async selectAll() {
        const sql =`SELECT * FROM ${this.tableName}`;
        return await this.execute(sql, null)
    }

    async update(colName, colValue, whereCol, whereValue) {
        const sql =`UPDATE ${this.tableName} 
                    SET ${colName} = $1
                    WHERE ${whereCol} = $2 RETURNING *`;

        return await this.execute(sql, [colValue, whereValue])
    }

    async execute(sql, params) {
        try {
            let data = null;
              
            if (params === null) {
                data = await pool.query(sql);
            } else {
                data = await pool.query(sql, params);
            }

            return data;
        } catch (error) {
            console.log(`[${this.tableName} model]`, error);
            throw error
        }
    }

}

module.exports = Model;