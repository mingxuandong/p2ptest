const net = require('net')
// const run = require('./p2pconnect2')
// console.log(run)
const linkList = {}
const connectHelperServer = net.createConnection(
    {
        port:7520,
        host:'106.13.54.145'
    },
    ()=>{
        console.log('connected-helper-server') 
        setInterval(()=>{
            connectHelperServer.write('ping')
        },3000)
     //    let p2pclient = net.createServer((socket)=>{
     //         socket.on('data',(buffer)=>{
     //             console.log(buffer.toString, 'p2pclient-data')
     //         })
     //    }).on('listening',()=>{
             connectHelperServer.write('clientServerReady')
     //    })
     //    p2pclient.listen(localPort,localAddr)
     }).on('data',(buffer)=>{
         // console.log(buffer.toString(), 'help-server-data')
         let str = buffer.toString()
        console.log(str)
          
}).on('error',(e)=>{
    console.log(e)
})
