const modules = require('../modules/c-modules')  // access file class
const crud = require('../service/crud')
const Modules = new modules() // access object file class
const Crud = new crud()

let port = process.env.PORT || 3000;
let express = Modules.express
let bodyParser = Modules.bodyParser

/* set application for method http */
let application = express()
application.use(bodyParser.json())
application.use(bodyParser.urlencoded({
    extended : true
}))


application.get('/api/reads' , Crud.retrieveReads ) /* write js , You must be self-confidence  , Sometimes IDE it's NOT Smart than you !! */
application.get('/api/read/(:car_id)' , Crud.retrieveRead ) /* write js , You must be self-confidence  , Sometimes IDE it's NOT Smart than you !! */
application.post('/api/create', Crud.retrieveCreate )
application.put('/api/(:car_id)/update', Crud.retrieveUpdate )
application.delete('/api/(:car_id)/delete', Crud.retrieveDeleteById )

application.listen(port , function (errors) {
    if (!errors) console.log('you are in port 3000')
    else console.log(errors.message)
})