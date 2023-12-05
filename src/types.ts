export interface User {
  id: string
  roles: Role[]
  rateLimit: number
}

export enum Role {
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
  BASIC = 'BASIC',
  TRIAL = 'TRIAL',
}