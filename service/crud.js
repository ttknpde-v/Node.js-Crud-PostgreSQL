const configurationDatabase = require('../configuration/c-configuration-database') // access file class
const serviceSql = require('./c-service-sql')
const ConfigurationDatabase = new configurationDatabase() // access object file class
const ServiceSql = new serviceSql()
const pool = ConfigurationDatabase.pool // retrieve pool attribute for connect psql

const reads = (request , response) => {
    pool.query(ServiceSql.selectAll,  function (errors, result) {
        if (!errors) {
            response.status(200).json({
                message:"selected",
                data : result.rows
            })
        }
        else {
            throw errors
        }
    })
} // end function reads

const read = (request , response) => {
    let car_id = request.params["car_id"]
    pool.query(ServiceSql.selectById , [car_id] , function (errors, result) {
        if (!errors) {
            response.status(200).json({
                message:"selected by id",
                data : result.rows
            })
        }
        else {
            throw errors
        }
    })
}

const create = (request , response) => {
    let {carModel,carWeight,carHeight,carPrice,carComment} = request.body
    /*
    console.log(carModel)
    console.log(carWeight)
    console.log(carHeight)
    console.log(carPrice)
    console.log(carComment)
    */
    pool.query(ServiceSql.insertCar , [carModel,carWeight,carHeight,carPrice,carComment] , function (errors , result) {
        if (!errors) {
            response.status(201).send(
                {
                    message:"created",
                    car_model:carModel,
                    car_weight:carWeight,
                    car_height:carHeight,
                    car_price:carPrice,
                    car_comment:carComment,
                    status:result
                }
            )
        }
        else {
            throw errors
        }
    })
} // end function created

const update = (request , response) => {
    let car_id = request.params["car_id"]
    let {carModel,carWeight,carHeight,carPrice,carComment} = request.body
    pool.query(ServiceSql.updateCar , [carModel,carWeight,carHeight,carPrice,carComment , car_id] , function (errors , result) {
        if (!errors) {
            response.status(201).send(
                {
                    message:"updated",
                    car_id:car_id ,
                    car_model:carModel,
                    car_weight:carWeight,
                    car_height:carHeight,
                    car_price:carPrice,
                    car_comment:carComment,
                    status:result
                }
            )
        }
        else {
            throw errors
        }
    })
} // end function update

const deleteById = (request , response) => {
    let car_id = request.params["car_id"]
    pool.query(ServiceSql.deleteById , [car_id] , function (errors , result) {
        if (!errors) {
            response.status(202).send(
                {
                    message:"deleted",
                    status:result
                }
            )
        }
        else {
            throw errors
        }
    })
} // end function delete
class Crud {
    get retrieveReads() {
        return reads
    }
    get retrieveCreate() {
        return create
    }
    get retrieveRead() {
        return read
    }
    get retrieveUpdate() {
        return update
    }
    get retrieveDeleteById() {
        return deleteById
    }

}


module.exports = Crud