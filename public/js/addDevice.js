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

const fieldMacid = document.querySelector('.field-mac_id')
const fieldName = document.querySelector('.field-name')
const fieldHost = document.querySelector('.field-host')
const fieldPort = document.querySelector('.field-port')
const fieldProcessInterval = document.querySelector('.field-process_interval')
const fieldRetryCycle = document.querySelector('.field-retry_cycle')
const fieldRetryCount = document.querySelector('.field-retry_count')
const fieldRetryConnFailedCount = document.querySelector('.field-retry_conn_failed_count')

const addForm = document.querySelector('form')
const AddDeviceForm = document.querySelector('#add_device_form')

const saveSubmit = document.querySelector('input[name="_save"]')
const addAnotherSubmit = document.querySelector('input[name="_addanother"')

saveSubmit.addEventListener('click', (e) => {
    console.log(AddDeviceForm)
    e.preventDefault()
    if (macid.value == "" | name.value == "" | host.value == "" | port.value == "" | processInterval.value == "" | retryCycle.value == "" | retryCount.value == "" | retryFailedCount.value == "") {
        let errornote = document.getElementsByClassName('errornote')
        if (errornote.length > 0) {
            AddDeviceForm.firstChild.remove()
        }
        AddDeviceForm.insertAdjacentHTML('afterbegin', '<p class="errornote">아래의 정보들을 수정하십시오.</p>')

        let errorlist = document.getElementsByClassName('errorlist')
        console.log(errorlist[0])
        if (macid.value == "") {
            fieldMacid.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (name.value == "") {
            fieldName.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (host.value == "") {
            fieldHost.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (port.value == "") {
            fieldPort.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (processInterval.value == "") {
            fieldProcessInterval.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (retryCycle.value == "") {
            fieldRetryCycle.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (retryCount.value == "") {
            fieldRetryCount.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        if (retryFailedCount.value == "") {
            fieldRetryConnFailedCount.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
    } else {
        e.preventDefault()
        addForm.submit()
        
    }
    
})


