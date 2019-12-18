const addForm = document.querySelector('form')
const macid = document.querySelector('#id_mac_id') 
const name = document.querySelector('#id_name')
const host = document.querySelector('#id_host')
const port = document.querySelector('#id_port')
const unitid = document.querySelector('#id_unit_id')
const remapVersion = document.querySelector('#id_remap_version')
const processInterval = document.querySelector('#id_process_interval')
const retryCycle = document.querySelector('#id_retry_cycle')
const retryCount = document.querySelector('#id_retry_count')
const retryFailedCount = document.querySelector('#id_retry_conn_failed_count')
const saveSubmit = document.querySelector('input[name="_save"]')
const addAnotherSubmit = document.querySelector('input[name="_addanother"')
const errorList = document.querySelector('#errorlist')

// addForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const MAC_ID = macid.value

//     let ul = document.createElement('ul')
//     let li = document.createElement('li')

//     // fetch('/addDevice').then((response) => {
//     //     response.json().then((data) => {
//     //         if (data.error) {
//     //             return errorList.appendChild(data.error)
//     //         }
//     //         errorList.appendChild(data)
//     //     })
//     // })
// })

// window.onkeydown = () => {
//     const kcode = event.keyCode
//     if(kcode == 116) {
//         e.preventDefault()
//         return false
//     }
// }

saveSubmit.addEventListener('click', () => {
    e.preventDefault()

})


// addAnotherSubmit.addEventListener('click', () => {
//     e.preventDefault()
//     console.log("addAnother")
// })