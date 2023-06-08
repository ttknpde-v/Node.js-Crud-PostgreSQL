class ServiceSql {
    #selectAll = "select * from showroom ;"
    #selectById = "select * from showroom where car_id = $1;" /* remember Dynamic Sql in postgres write with js u should use $<element> instead ? */
    #insertCar = "insert into showroom (car_model, car_weight, car_height, car_price, car_comment) " +
        "values($1 , $2 , $3 , $4 , $5) ;"
    /* remember Dynamic Sql in postgres write with js u should use $<element> instead ? */
    #updateCar = "update showroom set car_model = $1 , car_weight = $2 , car_height = $3 , car_price = $4 , car_comment = $5 " +
        "where car_id = $6 ;"
    #deleteById = "delete from showroom where car_id = $1 ;"
    get selectAll() {
        return this.#selectAll
    }

    get insertCar () {
        return this.#insertCar
    }

    get selectById() {
        return this.#selectById;
    }

    get updateCar() {
        return this.#updateCar;
    }

    get deleteById() {
        return this.#deleteById;
    }
}

module.exports = ServiceSql