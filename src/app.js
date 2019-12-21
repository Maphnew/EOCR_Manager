const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const port = 8000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'uyeg'
})

connection.connect()

app.get('', (req,res) => {
    res.render('index', {
        title: 'Smart-EOCR MANAGER',
        name: 'ITS'

    })
})

app.get('/device', (req,res) => {
    if(!req.query.id) {
        const query = connection.query("SELECT `ID`, `GATEWAY_ID`, `MAC_ID`, `NAME`, `HOST`, `PORT`, `UNIT_ID`, `ENABLED` FROM DEVICE", (error, rows) => {
            if(error) throw error;
            if(rows) {
                res.render('device', {
                    title: 'Smart-EOCR MANAGER',
                    name: 'ITS',
                    eocrs: rows
                })
        
            } else {
                res.send('Unable to get data.')
            }
        })

    }else{
        const id = req.query.id
        const query = connection.query("SELECT `ID`, `GATEWAY_ID`, `MAC_ID`, `NAME`, `HOST`, `PORT`, `UNIT_ID`, `REMAP_VERSION`, `PROCESS_INTERVAL`, `RETRY_CYCLE`, `RETRY_COUNT`, `RETRY_CONN_FAILED_COUNT`, `ENABLED` FROM DEVICE WHERE ID ="+id, (error, rows) =>{
            if(error) throw error
            if(rows) {
                // console.log(rows)
                res.cookie('id', req.query.id)
                res.render(
                    'updateDevice', {
                        title: 'Smart-EOCR MANAGER',
                        name: 'ITS',
                        eocr: rows
                    }
                )
            } else {
                res.send('Unable to get data.')
            }
        })
    }
    

})

app.post('/addDevice', (req,res) => {
    // console.log(req.body)
    const MAC_ID = req.body.mac_id
    const NAME = req.body.name
    const HOST = req.body.host
    const PORT = req.body.port
    const UNIT_ID = req.body.unit_id
    const REMAP_VERSION = req.body.remap_version
    const PROCESS_INTERVAL = req.body.process_interval
    const RETRY_CYCLE = req.body.retry_cycle
    const RETRY_COUNT = req.body.retry_count
    const RETRY_CONN_FAILED_COUNT = req.body.retry_conn_failed_count
    let ENABLED = req.body.enabled
    if (ENABLED == "on") {
        ENABLED = 1
    } else {
        ENABLED = 0
    }

    const query = "INSERT INTO `DEVICE` (`MAC_ID`, `NAME`, `HOST`, `PORT`, `UNIT_ID`, `REMAP_VERSION`, `PROCESS_INTERVAL`, `RETRY_CYCLE`, `RETRY_COUNT`, `RETRY_CONN_FAILED_COUNT`, `ENABLED`) VALUES ('"+MAC_ID+"', '"+NAME+"', '"+HOST+"', "+PORT+", "+UNIT_ID+", "+REMAP_VERSION+", "+PROCESS_INTERVAL+", "+RETRY_CYCLE+", "+RETRY_COUNT+", "+RETRY_CONN_FAILED_COUNT+", "+ENABLED+")"

    // console.log(query)
    connection.query(query, (error, result) => {
        if(error) throw error
        if(result){
            console.log("save")
            res.redirect('addDevice')
        }
        
    })


})

app.get('/addDevice', (req,res) => {
    console.log("get")
    res.render('addDevice', {
        title: 'Smart-EOCR MANAGER',
        name: 'ITS'
    })
})


app.post('/device', (req,res) => {
    const MAC_ID = req.body.mac_id
    const NAME = req.body.name
    const HOST = req.body.host
    const PORT = req.body.port
    const UNIT_ID = req.body.unit_id
    const REMAP_VERSION = req.body.remap_version
    const PROCESS_INTERVAL = req.body.process_interval
    const RETRY_CYCLE = req.body.retry_cycle
    const RETRY_COUNT = req.body.retry_count
    const RETRY_CONN_FAILED_COUNT = req.body.retry_conn_failed_count
    let ENABLED = req.body.enabled
    if (ENABLED == "on") {
        ENABLED = 1
    } else {
        ENABLED = 0
    }
    

    const query = "UPDATE `DEVICE` SET `MAC_ID`='"+MAC_ID+"', `NAME`='"+NAME+"', `HOST`='"+HOST+"', `PORT`="+PORT+", `UNIT_ID`="+UNIT_ID+", `REMAP_VERSION`="+REMAP_VERSION+", `PROCESS_INTERVAL`="+PROCESS_INTERVAL+", `RETRY_CYCLE`="+RETRY_CYCLE+", `RETRY_COUNT`="+RETRY_COUNT+", `RETRY_CONN_FAILED_COUNT`="+RETRY_CONN_FAILED_COUNT+", `ENABLED`="+ENABLED+" WHERE ID="+req.query.id+""
    console.log(query)

    connection.query(query, (error, result) => {
        if(error) throw error
        if(result){
            console.log("update")
            session.message = 'Device ID "'+req.query.id+'"가 성공적으로 수정 되었습니다.'
            console.log("session.message: ", session.message)
            res.redirect('/device')
        }
        
    })

})

app.get('/device/delete', (req, res) => {
    const id = req.cookies.id
    const query = "DELETE FROM Device WHERE id="+id
    connection.query(query, (error, result) => {
        if(error) throw error
        if(result) {
            console.log(result)
            res.redirect('/device')
        }
    })
})

app.post('/ajax_change_enablement', (req,res) => {
    const responseData = {'result':'ok', 'eocrid': req.body.eocrid, 'isChecked': req.body.isChecked}
    const query = "UPDATE `DEVICE` SET `ENABLED`="+req.body.isChecked+" WHERE MAC_ID='"+req.body.eocrid+"'"
    console.log(query)
    connection.query(query, (error, result) => {
        if(error) throw error
        if(result){
            console.log(result)
            res.json(responseData)
            
        }
        
    })
})

app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Smart-EOCR MANAGER',
        name: 'ITS'
    })
})

app.get('/device*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Maphnew',
        errorMessage: 'Page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Maphnew',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port + '. http://localhost:' + port) 
})