const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 8000

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

const connection = mysql.createConnection({
    host: '192.168.100.22',
    port: '3306',
    user: 'root',
    password: 'its@1234',
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
    const body = req.body
    if(req.body._save){
        console.log("post")
        
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

        if (MAC_ID == '') {
            return res.send({
                error: '필수 항목입니다.'
            })
        } else {
            console.log("MAC_ID : ", MAC_ID, typeof(MAC_ID))    
        }

        const query = "INSERT INTO `DEVICE` (`MAC_ID`, `NAME`, `HOST`, `PORT`, `UNIT_ID`, `REMAP_VERSION`, `PROCESS_INTERVAL`, `RETRY_CYCLE`, `RETRY_COUNT`, `RETRY_CONN_FAILED_COUNT`, `ENABLED`) VALUES ('"+MAC_ID+"', '"+NAME+"', '"+HOST+"', "+PORT+", "+UNIT_ID+", "+REMAP_VERSION+", "+PROCESS_INTERVAL+", "+RETRY_CYCLE+", "+RETRY_COUNT+", "+RETRY_CONN_FAILED_COUNT+", "+ENABLED+")"

        console.log(query)
        connection.query(query, (error, result) => {
            if(error) {
                res.render('addDevice', {
                        title: 'Smart-EOCR MANAGER',
                        name: 'ITS',
                        errorMessage: '아래의 정보를 모두 채워주세요.'
                    }
                )
            }
            if(result){
                console.log(result)
                res.render(
                    'addDevice', {
                        title: 'Smart-EOCR MANAGER',
                        name: 'ITS'
                    }
                )
            }
            
        })
    } else if(req.body._addanother) {
        console.log(req.body._addanother)
    } else {
        // console.log(req)
    }

})

app.get('/addDevice', (req,res) => {
    console.log("get")
    res.render('addDevice', {
        title: 'Smart-EOCR MANAGER',
        name: 'ITS'
    })
})

app.post('/device', (req,res) => {
    console.log(req.body)
    res.send(req.body)
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