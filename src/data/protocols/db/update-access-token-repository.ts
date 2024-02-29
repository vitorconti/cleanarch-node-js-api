export interface UpdateAccesTokenRepository {
  update: (id: string, token: string) => Promise<void>
}
