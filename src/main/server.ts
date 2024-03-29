import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

void MongoHelper.connect(env.mongoUrl)
  .then(async (): Promise<void> => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
