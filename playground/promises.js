const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    // host: '192.168.100.22',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'uyeg',
    multipleStatements: true
})

connection.connect()

const dbSelect = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if(error) throw error
            if(result) {
                resolve(result)
            }
        })
    })
}

const dbInsert = (gid) => {
    const MAC_ID = '123'
    const NAME = 'ABC'
    const HOST = '192.168.100.100'
    const PORT = 502
    const UNIT_ID = 1
    const REMAP_VERSION = 2
    const PROCESS_INTERVAL = 30
    const RETRY_CYCLE = 1
    const RETRY_COUNT = 1
    const RETRY_CONN_FAILED_COUNT = 1
    let ENABLED = 1

    const queryInsert = "INSERT INTO `DEVICE` (`GATEWAY_ID`, `MAC_ID`, `NAME`, `HOST`, `PORT`, `UNIT_ID`, `REMAP_VERSION`, `PROCESS_INTERVAL`, `RETRY_CYCLE`, `RETRY_COUNT`, `RETRY_CONN_FAILED_COUNT`, `ENABLED`) VALUES ('"+gid+"', '"+MAC_ID+"', '"+NAME+"', '"+HOST+"', "+PORT+", "+UNIT_ID+", "+REMAP_VERSION+", "+PROCESS_INTERVAL+", "+RETRY_CYCLE+", "+RETRY_COUNT+", "+RETRY_CONN_FAILED_COUNT+", "+ENABLED+")"

    return new Promise((resolve, reject) => {
        connection.query(queryInsert, (error, result)=>{
            if(error) reject('Things went wrong!')
            if(result){
                resolve(result)
            }
        })
    })
}

// multiple then call
const queryGateaway = "SELECT DISTINCT GATEWAY_ID FROM DEVICE LIMIT 1; "

dbSelect(queryGateaway).then((result) => {
    console.log('1:', result[0].GATEWAY_ID)
    return dbInsert(result[0].GATEWAY_ID)
}).then((result2) => {
    console.log('2:', result2)
}).catch((e) => {
    console.log(e)
})