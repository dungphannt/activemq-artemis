import dotenv from 'dotenv'
import { consume } from './consumers'
import { CONNECTION_TYPE } from './types/artemis.type'
dotenv.config()

const topic = 'Topic.test'
consume(topic, CONNECTION_TYPE.ONCE).then((message) => {
  console.log({ message: message.body })
})
