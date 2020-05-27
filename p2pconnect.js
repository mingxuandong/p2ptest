const net = require('net')
// const run = require('./p2pconnect2')
// console.log(run)
const process = require('process')
const child_process = require('child_process')
const createChild = () => {
    const child = child_process.spawn('node',['tcptest.js']).on('error',(err)=>{
        console.log(err)
    }).on('message',(message)=>{
        console.log(message)
    }).on('exit',(code)=>{
        console.log('child exit code:' + code)
        createChild()
    }).on('close',()=>{
        
    })
    setTimeout(()=>{
        child.kill()
        
    },3000)
}
createChild()
console.log(process.pid)
const linkList = {}

const connectHelperServer = net.createConnection(
    {
        port: 7520,
        host:'106.13.54.145',
        localPort: 5210
    },
    ()=>{
        console.log('connected-helper-server') 
        connectHelperServer.write('clientServerReady')
        // setInterval(()=>{
        //     connectHelperServer.write('ping')
        // },3000)
        // throw {}
        // connectHelperServer.end(()=>{
        //     connectHelperServer.destroy()
        //     net.createConnection(
        //         {
        //             port: 7520,
        //             host:'106.13.54.145',
        //             localPort: 5210
        //         },
        //         ()=>{
        //             connectHelperServer.write('clientServerReady')
        //     }).on('data',(buffer)=>{
        //         console.log(buffer.toString, 'p2pclient-data')
        //     })
        // })
        
        // let p2pclient = net.createServer((socket)=>{
        //     socket.on('data', (buffer)=>{
        //         console.log(buffer.toString, 'p2pclient-data')
        //     })
        // }).on('listening',()=>{
        //     connectHelperServer.write('clientServerReady')
        //     // connectHelperServer.destroy()

            

        // })
        // console.log(connectHelperServer.localPort, connectHelperServer.localAddress)
        // p2pclient.listen(connectHelperServer.localPort, connectHelperServer.localAddress)
    }
).on('data',(buffer)=>{
        // console.log(buffer.toString(), 'help-server-data')
    let str = buffer.toString()
    console.log(str)
          
}).on('error',(e)=>{
    console.log(e)
    
})
