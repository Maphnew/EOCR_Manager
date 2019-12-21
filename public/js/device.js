const customSwitch = document.querySelectorAll('.custom-switch-input')

const sendAjax = (url, eocrID, isChecked) => {
    let data = {'eocrid': eocrID, 'isChecked':isChecked}
    data = JSON.stringify(data)
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', "application/json")
    xhr.send(data)
    // console.log("send", data)
    xhr.addEventListener('load', () => {
        const result = JSON.parse(xhr.responseText)
        // console.log(result)
        setTimeout(() => {
            window.location = "http://localhost:8000/device"
        }, 100)
        
    })

}

for (let i = 0; i < customSwitch.length; i++){
    customSwitch[i].addEventListener('click', async (e) => {
        const id = customSwitch[i].id
       
        if(e.srcElement.attributes.checked){
            await sendAjax('http://localhost:8000/ajax_change_enablement', id, 0)
        }else{
            await sendAjax('http://localhost:8000/ajax_change_enablement', id, 1)
        }
    })
}

