module.exports = {
    production:{
        connectionString: process.env.POSTGRES_CONNECTION_STRING +"?ssl=true"
    },
    dev: {

        connectionString: 'postgresql://postgres:docker@localhost:5432/blueocean'
    }
}