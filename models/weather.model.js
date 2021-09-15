'use strict'

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `the weather will be with ${item.weather.description}`;
    }
}
module.exports=Forecast