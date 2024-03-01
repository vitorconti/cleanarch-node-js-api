export interface UpdateAccesTokenRepository {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
