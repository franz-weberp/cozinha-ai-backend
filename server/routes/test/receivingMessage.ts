import receivingMessageFromQueue from '../../utils/broker/receive'

export default defineEventHandler(async (event) => {
  try {
    const message = await receivingMessageFromQueue('protobuf_queue')
    const messageContent = message.content.toString()
    return `Your message ${messageContent}`
  } 
  
  catch (error) { console.error('Error receiving messages:', error) }
})