import sendMessageToQueue from '../../utils/broker/send'

export default defineEventHandler(async (event) => {
  const messageData = { id: 1, content: "Hello, RabbitMQ!" }
  
  try {
    const result = await sendMessageToQueue('protobuf_queue', messageData)
    return `Your message ${result}`
  } 

  catch (error) { console.error('Error sending message:', error) }

})

