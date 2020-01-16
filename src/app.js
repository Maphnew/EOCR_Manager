const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const shell = require('shelljs')
const writeYaml = require('./utils/yaml')

const app = express()
const port = 80

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
    // host: '192.168.100.22',
    port: '3306',
    user: 'root',
    password: 'its@1234',
    database: 'uyeg',
    multipleStatements: true
})


connection.connect()
app.get('', (req,res) => {
    const queryGataway = "SELECT DISTINCT GATEWAY_ID FROM DEVICE LIMIT 1; "
    const countEnablement = "SELECT COUNT(*) AS ENABLED FROM DEVICE WHERE ENABLED = 1; "
    const countAll = "SELECT COUNT(*) AS TOTAL FROM DEVICE; "

    connection.query(queryGataway+countEnablement+countAll,(error, results, fields) => {
        if(error) throw error;
        if(results) {
            
            res.render('index', {
                title: 'UYeG Device MANAGER',
                name: 'ITS',
                gatewayid:  results[0][0].GATEWAY_ID,
                enabled: results[1][0].ENABLED,
                total: results[2][0].TOTAL
            })
        }
    })
})

app.post('', (req,res) => {
    
    const updateGatewayID = "UPDATE DEVICE SET `GATEWAY_ID` = '"+ req.body.gatewayid +"'"
    
    connection.query(updateGatewayID, (error, rows) =>{
        if(error) throw error;
        if(rows) {
            res.redirect('/')
        } else {
            res.send('Unable to get data.')
        }
    })
})

app.get('/device', (req,res) => {
    if(!req.query.id) {
            
        const host = req.get('host')
        const query = connection.query("SELECT `ID`, `GATEWAY_ID`, `MAC_ID`, `NAME`, `HOST`, `PORT`, `UNIT_ID`, `ENABLED` FROM DEVICE", (error, rows) => {
            if(error) throw error;
            if(rows) {
                res.render('device', {
                    title: 'UYeG Device MANAGER',
                    name: 'ITS',
                    host,
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

                res.cookie('id', req.query.id)
                res.render(
                    'updateDevice', {
                        title: 'UYeG Device MANAGER',
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

    connection.query(query, (error, result) => {
        if(error) throw error
        if(result){

            res.redirect('addDevice')
        }
        
    })


})

app.get('/addDevice', (req,res) => {

    res.render('addDevice', {
        title: 'UYeG Device MANAGER',
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


    connection.query(query, (error, result) => {
        if(error) throw error
        if(result){

            res.cookie('id', req.query.id)
            res.redirect('/device')
        }
        
    })

})

app.get('/device/delete', (req, res) => {
    const id = req.cookies.id
    const query = "DELETE FROM DEVICE WHERE id="+id
    connection.query(query, (error, result) => {
        if(error) throw error
        if(result) {
            res.redirect('/device')
        }
    })
})

app.post('/ajax_change_enablement', (req,res) => {
    const responseData = {'result':'ok', 'eocrid': req.body.eocrid, 'isChecked': req.body.isChecked}
    const query = "UPDATE `DEVICE` SET `ENABLED`="+req.body.isChecked+" WHERE MAC_ID='"+req.body.eocrid+"'"

    connection.query(query, (error, result) => {
        if(error) throw error
        if(result){
            res.json(responseData)
        }
    })
})

app.get('/api', (req,res) => {
    res.render('api', {
        title: 'API',
        name: 'ITS',
        api: 'http://106.255.236.186:8282/gateway'
    })
})

app.get('/address', (req,res) => {
    const host = req.get('host')
    res.render('ipAddress', {
        title: 'IP Address',
        name: 'ITS',
        ip: host
    })
})

app.post('/address', async (req,res) => {
    
    const inputHost = req.body.address
    await writeYaml(publicDirectoryPath, inputHost).then(() => {
        if (shell.exec('sudo netplan apply').code !== 0) {
            shell.exit(1)

            res.render('http://'+inputHost+'/address', {
                title: 'IP Address',
                name: 'ITS',
                ip: host,
                failedMessage: 'SUCCESS!'
            })
        } else {
            const host = req.get('host')
            res.render('ipAddress', {
                title: 'IP Address',
                name: 'ITS',
                ip: host,
                failedMessage: 'FAILED! RETRY!'
            })
        }
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