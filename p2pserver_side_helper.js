const net = require('net')
const linkList = {}
const server = net.createServer((socket)=>{
    
    // if (!linkList[id]) {
        // 保存连接
        
        socket.on('data', (data) => {
            if(data.toString()==='clientServerReady'){
                let id = [socket.remoteAddress, socket.remoteFamily, socket.remotePort].join("_");
                console.log(`[${(new Date()).toLocaleString()}] ${socket.remoteAddress}:${socket.remotePort} 上线...`);
                linkList[id] = socket;
                Object.keys(linkList).forEach((item)=>{
                    linkList[item].write(JSON.stringify(Object.keys(linkList)))
                })
            }
            
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
server.listen(7520, '127.0.0.1')