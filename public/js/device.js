const customSwitch = document.querySelectorAll('.custom-switch-input')
const host = document.querySelector('#host')

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
            window.location = `http://${host.value }/device`
        }, 100)
        
    })

}

for (let i = 0; i < customSwitch.length; i++){
    customSwitch[i].addEventListener('click', async (e) => {
        const id = customSwitch[i].id
        const url = `http://${host.value}/ajax_change_enablement`

        if(e.srcElement.attributes.checked){
            await sendAjax(url, id, 0)
        }else{
            await sendAjax(url, id, 1)
        }
    })
}

