import { Message } from 'stompjs'
import { close, connect } from '../configs/activemq.config'
import { CONNECTION_TYPE } from '../types/artemis.type'

/**
 * Listen on topic and get data.
 *
 * @param topic Artemis Topic
 * @param connectionType {@link CONNECTION_TYPE}
 */
export const consume = (topic: string, connectionType: CONNECTION_TYPE): Promise<Message> => {
  return new Promise(async (resolve) => {
    const client = await connect()
    client.subscribe(topic, (message) => {
      close(connectionType, client)
      resolve(message)
    })
  })
}
