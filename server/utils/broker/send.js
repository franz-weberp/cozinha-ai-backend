import rabbitmq from './broker.js'
import exportMessage from 'protobuf-helper'


export async function sendMessageToQueue(queue, content) {
  try {
    const channel = await rabbitmq.createChannel()
    
    await channel.assertQueue(queue, { durable: false })

    const errMsg = exportMessage.verify(content)
    if (errMsg) throw Error(errMsg)
    const buffer = exportMessage.encode(content).finish()

    channel.sendToQueue(queue, buffer)

    await channel.close()
    return 'Send: Success!'
  } 

  catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export default sendMessageToQueue
