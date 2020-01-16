const json2yaml = require('json2yaml')
const fs = require('fs')

const writeYaml = async (publicDirectoryPath, inputHost) => {
    const yamlPath = '/etc/netplan'
    try {
        fs.readFile(publicDirectoryPath+'/01-network-manager-all.json', (err, data) => {
            let jsonobj = await JSON.parse(data)
            console.log('from default: ', jsonobj.network.ethernets.eth0.addresses[0])
            jsonobj.network.ethernets.eth0.addresses[0] = await inputHost+'/24'
            console.log('to: ', jsonobj.network.ethernets.eth0.addresses[0])
            let ymlText = await json2yaml.stringify(jsonobj)
            // fs.writeFileSync(publicDirectoryPath+'/yaml-edit.yaml', ymlText, 'utf-8')
            await fs.writeFileSync(yamlPath+'/01-network-manager-all.yaml', ymlText, 'utf-8')
        })
    } catch(e) {
        console.log(e)
    }
}

module.exports = writeYaml