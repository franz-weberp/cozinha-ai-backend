import amqp from 'amqplib'
const BROKER_URL = process.env.BROKER_URL

class RabbitMQ {
  constructor() {
    this.connection = null
  }

  async connect() {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(BROKER_URL)
        console.log('Connected to RabbitMQ')
      }
      return this.connection;
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error)
      throw error
    }
  }

  async createChannel() {
    try {
      const connection = await this.connect()
      return await connection.createChannel()
    } catch (error) {
      console.error('Error creating channel:', error)
      throw error
    }
  }

  async closeConnection() {
    try {
      if (this.connection) {
        await this.connection.close()
        console.log('RabbitMQ connection closed')
      }
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error)
      throw error;
    }
  }
}

const rabbitmq = new RabbitMQ()
export default rabbitmq