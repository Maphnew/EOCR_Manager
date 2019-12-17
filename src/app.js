const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')

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

const connection = mysql.createConnection({
    host: '192.168.100.17',
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