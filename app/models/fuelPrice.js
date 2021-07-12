const Model = require('./model')

class FuelPrice extends Model {

    constructor() {
        super('fuel_prices')
    }
}

module.exports = FuelPrice