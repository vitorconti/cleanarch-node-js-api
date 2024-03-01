import jwt from 'jsonwebtoken'

export class JwtAdapter {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<void> {
    jwt.sign({ id: value }, this.secret)
  }
}
