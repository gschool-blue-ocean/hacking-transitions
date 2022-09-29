export const checkApiMethod = ({method},string) => method === string
export const notFound404 = (res) => res.send('404 Not Found')
export const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'deployed website url'