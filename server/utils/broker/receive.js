import rabbitmq from './broker.js'
import exportMessage from 'protobuf-helper'

export async function receivingMessageFromQueue(queue) {
  try {
    const channel = await rabbitmq.createChannel()

    process.once('SIGINT', async () => {
      await channel.close()
      await rabbitmq.closeConnection()
    })

    await channel.assertQueue(queue, { durable: false })

    const messagePromise = new Promise((resolve, reject) => {    
      channel.consume(queue, (message) => {
        if (!message) {
          reject(new Error('No message received'))
          return
        }

        const buffer = message.content
        const decodedMessage = exportMessage.decode(buffer)
        resolve(decodedMessage)
      }, { noAck: true })
    })

    const valueDecoded = await messagePromise
    return valueDecoded
  } 
  
  catch (error) {
    console.error('Error receiving messages:', error)
    throw error
  }
}

export default receivingMessageFromQueue
