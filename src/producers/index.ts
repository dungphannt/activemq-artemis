import { close, connect } from '../configs/activemq.config'
import { CONNECTION_TYPE } from '../types/artemis.type'

/**
 *  Produce a message with payload to broker.
 *
 * @param topic Artemis Topic
 * @param payload {@link T} payload
 * @param headers Headers
 */
export const produce = async <T>(topic: string, payload: T, headers?: {} | undefined) => {
  const client = await connect()
  client.send(topic, headers, JSON.stringify(payload))

  console.log('sent: ', payload)
  close(CONNECTION_TYPE.ONCE, client)
}
