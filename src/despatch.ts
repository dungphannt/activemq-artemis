import dotenv from 'dotenv'
import { produce } from './producers'
dotenv.config()

const topic = 'Topic.subscription.order'
produce(topic, { message: 'test', subId: 123 })
