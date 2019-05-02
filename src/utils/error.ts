export class ApiError extends Error {
  status: number | null
  data: any
  constructor(name: string, statusCode: number | null, message: string, data: any) {
    super(message)
    this.name = name
    Error.captureStackTrace(this, this.constructor)
    this.status = statusCode
    this.message = message
    this.data = data
  }
}
