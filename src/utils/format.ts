export function camelToUnderscore(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function formatParams(params: any): any {
  const newObject: any = {}
  for (const camel in params) {
    newObject[camelToUnderscore(camel)] = params[camel]
  }
  return newObject
}
