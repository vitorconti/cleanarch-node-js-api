import { Collection, MongoClient } from 'mongodb'
import env from '../../../../main/config/env'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(env.mongoUrl)
    }
    return this.client.db().collection(name)
  },
  map<T> (collection: any): T {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
