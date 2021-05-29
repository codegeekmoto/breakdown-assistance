const Model = require('./model')

class User extends Model {

    constructor() {
        super('users')
    }

    async login(email, role) {
        const sql =`SELECT * FROM users
                    WHERE email = $1
                        AND role = $2`;
        
        return this.execute(sql, [email, role])
    }

    async updateInfo(id, email, phone) {
        const sql =`UPDATE users SET phone = $1, email = $2
                    WHERE id = $3 RETURNING *`;

        return this.execute(sql, [phone, email, id])
    }

    async changePassword(id, password) {
        const sql =`UPDATE users SET password = $1
                    WHERE id = $2 RETURNING *`;

        return this.execute(sql, [password, id])
    }

    async isEmailExistsById(id, email) {
        const sql =`SELECT * FROM users
                    WHERE email = $1
                        AND id != $2`;
        
        try {
            const user = await this.execute(sql, [email, id]);

            return user.rowCount > 0;
        } catch (error) {
            throw error
        }

        
    }

    async findById(id) {
        const sql =`SELECT * FROM users WHERE id = $1`;
        return await this.execute(sql, [id])
    }
}

module.exports = User;
