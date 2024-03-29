import { HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {

  }

  async hash (value: string): Promise<string> {
    const hashedString = await bcrypt.hash(value, this.salt)
    return hashedString
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
