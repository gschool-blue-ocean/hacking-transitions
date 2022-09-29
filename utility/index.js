export const checkApiMethod = ({method},string) => method === string

export const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'deployed website url'