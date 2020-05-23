const net = require('net')
const linkList = {}
const connectHelperServer = new net.Socket().on('data',(buffer)=>{
    console.log(buffer.toString())
})
// const localPort = connectHelperServer.localPort
// const localAddr = connectHelperServer.localAddress
// console.log(localAddr,localPort)
connectHelperServer.connect({
    port:7520,
    remoteAddress:'localhost'
},()=>{
    const localPort = connectHelperServer.localPort
    const localAddr = connectHelperServer.localAddress
    console.log('connected-helper-server') 
    setInterval(() => {
        connectHelperServer.write('ping')
       console.log(connectHelperServer.localPort)
    }, 3000);
    let p2pclient = net.createServer((socket)=>{
        socket.on('data',(buffer)=>{
            console.log(buffer.toString(), 'p2pclient-data', socket.remoteAddress, socket.remotePort)
        })
    }).on('listening',()=>{
        connectHelperServer.write('clientServerReady')
        console.log('clientServerReady')
    }).on('error',(e)=>{
        console.log(e)
    })
    p2pclient.listen(localPort,localAddr)
})
