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

    e.preventDefault()
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

    if (macid.value == "") {
        if(fieldMacid.childElementCount < 2){
            fieldMacid.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
    } else {
        const errorlist = fieldMacid.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (name.value == "") {
        if(fieldName.childElementCount <2) {
            fieldName.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        
    } else {
        const errorlist = fieldName.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (host.value == "") {
        if(fieldHost.childElementCount <2 ){
            fieldHost.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')    
        }
    } else {
        const errorlist = fieldHost.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (port.value == "") {
        if(fieldPort.childElementCount <2){
            fieldPort.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
    } else {
        const errorlist = fieldPort.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (processInterval.value == "") {
        if(fieldProcessInterval.childElementCount <2){
            fieldProcessInterval.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }

    } else {
        const errorlist = fieldProcessInterval.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (retryCycle.value == "") {
        if(fieldRetryCycle.childElementCount <2) {
            fieldRetryCycle.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
    } else {
        const errorlist = fieldRetryCycle.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (retryCount.value == "") {
        if(fieldRetryCount.childElementCount < 2) {
            fieldRetryCount.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
    }else {
        const errorlist = fieldRetryCount.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (retryFailedCount.value == "") {
        if (fieldRetryConnFailedCount.childElementCount < 2) {
            fieldRetryConnFailedCount.insertAdjacentHTML('afterbegin', '<ul class="errorlist"><li>필수 항목입니다.</li></ul>')
        }
        
    }else {
        const errorlist = fieldRetryConnFailedCount.querySelector('.errorlist')
        if(errorlist){
            const liLength = errorlist.getElementsByTagName("li").length
            if(liLength > 0) {
                errorlist.remove()
            }
                
        }
    }
    if (macid.value == "" | name.value == "" | host.value == "" | port.value == "" | processInterval.value == "" | retryCycle.value == "" | retryCount.value == "" | retryFailedCount.value == "") {
        let errornote = document.getElementsByClassName('errornote')
        if (errornote.length > 0) {
            AddDeviceForm.firstChild.remove()
        }
        AddDeviceForm.insertAdjacentHTML('afterbegin', '<p class="errornote">아래의 정보들을 수정하십시오.</p>')
    } else {
        e.preventDefault()
        addForm.submit()
        
    }
    
})


