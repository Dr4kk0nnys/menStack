import { } from 'dotenv/config.js'

import Mongo from 'mongodb'
const MongoClient = Mongo.MongoClient


class Database {
    constructor() {
        this.client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true })
    }

    async connect() {
        try {
            await this.client.connect()

            this.database = this.client.db(process.env.DATABASE_NAME)

            this.users = this.database.collection(process.env.USERS_COLLECTION)
            this.todos = this.database.collection(process.env.TODOS_COLLECTION)
        } catch (error) {
            throw error
        }
    }

    closeConnection() {
        this.client.close()
    }

    async insert(object = {}) {
        /*
            * User: name, email, password
            * ToDo: title, description
        */

        const keys = Object.keys(object)

        const addUserKeys = ['name', 'email', 'password']
        const addTodoKeys = ['title', 'description']

        if (keys.every((key, index) => key === addUserKeys[index])) {

            const { name, email, password } = object
            await this.users.insertOne({ name, email, password })

            return true
        }

        if (keys.every((key, index) => key === addTodoKeys[index])) {

            const { title, description } = object
            await this.todos.insertOne({ title, description })

            return true
        }

    }
}

async function main() {
    const database = new Database()
    await database.connect()

    database.closeConnection()
}

main()

// export default Database