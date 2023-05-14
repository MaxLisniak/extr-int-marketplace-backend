export enum UserType {
  Regular = 'regular',
  Admin = 'admin'
}

export enum ErrorName {
  ValidationError = 'ValidationError',
  DBError = 'DBError',
  NotNullViolationError = 'NotNullViolationError',
  UniqueViolationError = 'UniqueViolationError',
}

export const ACCESS_TOKEN_EXPIRY = '10m'
export const REFRESH_TOKEN_EXPIRY = '15m'