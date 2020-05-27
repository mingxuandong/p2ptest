const net = require('net')
const process = require('process')
let client = net.createConnection({
    port: 7520,
    host:'106.13.54.145',
    localPort: 5300
},()=>{
    client.write('clientServerReady')
    // try {
        // process.send({},null,null,(error)=>{
        //     console.log(error)
        // })
    // } catch (error) {
    //     console.log(error)
    // }
    
}).on('error',(e)=>{
    console.log(e)
}).on('data',(buffer)=>{
    console.log(buffer.toString())
})