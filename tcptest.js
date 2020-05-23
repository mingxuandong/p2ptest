const net = require('net')

let client = net.createConnection(11768, 'localhost',()=>{
    client.write('连上了')
}).on('error',(e)=>{
    console.log(e)
})