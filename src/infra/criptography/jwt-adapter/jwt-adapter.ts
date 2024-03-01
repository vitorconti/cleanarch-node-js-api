import jwt from 'jsonwebtoken'

export class JwtAdapter {
  constructor (private readonly secret: string) {
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
