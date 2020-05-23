const net = require('net')
const linkList = {}
const server = net.createServer((socket)=>{
    let id = [socket.remoteAddress, socket.remoteFamily, socket.remotePort].join("_");
    console.log(`[${(new Date()).toLocaleString()}] ${socket.remoteAddress}:${socket.remotePort} 上线...`);
    // if (!linkList[id]) {
        // 保存连接
        linkList[id] = socket;
        socket.on('data', (data) => {
           console.log(data.toString(),'data')
        });
        socket.on('error', (err) => {
            // 
            console.log(err,'error')
        })
        socket.on('end', (data) => {
            console.log( data && data.toString() )
        });
    // }
})
server.on('listening',()=>{
    console.log('server启动')
}).on('error',(err)=>{
    console.log(err,'server-error')
})
server.listen(5938, '192.168.32.1')