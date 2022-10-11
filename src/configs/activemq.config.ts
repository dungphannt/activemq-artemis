import { toNumber } from 'lodash'
import { Client, overTCP } from 'stompjs'
import { ARTEMIS } from '../constants/artemis.constant'
import { CONNECTION_TYPE } from '../types/artemis.type'

/**
 * Connect to artemis message broker.
 *
 * @returns client instance {@link Client}
 */
export const connect = async (): Promise<Client> => {
  return new Promise((resolve, reject) => {
    const client = overTCP(
      process.env.ARTEMIS_BROKER_HOST || ARTEMIS.DEFAULT_HOST,
      toNumber(process.env.ARTEMIS_BROKER_PORT)
    )
    client.connect(
      process.env.ARTEMIS_BROKER_USERNAME || ARTEMIS.DEFAULT_USERNAME,
      process.env.ARTEMIS_BROKER_PASSWORD || ARTEMIS.DEFAULT_PASSWORD,
      (frame) => {
        resolve(client)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

/**
 * Close the connection if once.
 *
 * @param connectionType {@link CONNECTION_TYPE}
 * @param client {@link Client}
 */
export const close = (connectionType: CONNECTION_TYPE, client: Client) => {
  switch (connectionType) {
    case CONNECTION_TYPE.ONCE:
      client.disconnect(() => {})
      break
    case CONNECTION_TYPE.KEEP:
      break
    default:
      break
  }
}
