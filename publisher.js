let open = require('amqplib').connect('amqp://localhost');
let queue = 'stages'
const axios = require('axios');

function publishToQueue(msg) {
    
    open.then(function(conn) {
        return conn.createChannel();
      }).then(function(channel) {
        return channel.assertQueue(queue).then(function(ok) {
          return channel.sendToQueue(queue, Buffer.from(msg));
        });
      }).catch(console.warn);
      
}
axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
    
    return res.data.map(data=>{
        return publishToQueue(JSON.stringify(data))
    })
})

