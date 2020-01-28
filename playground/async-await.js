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
                console.log('select: ',result)
                resolve(result[0].GATEWAY_ID)
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
                console.log('insert: ',result)
                resolve(result)
            }
        })
    })
}


const queryGateaway = "SELECT DISTINCT GATEWAY_ID FROM DEVICE LIMIT 1; "

const insertWithGid = async (query) => {
    const gid = await dbSelect(query)
    const insertResult = await dbInsert(gid)
    return insertResult
}

insertWithGid(queryGateaway).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})