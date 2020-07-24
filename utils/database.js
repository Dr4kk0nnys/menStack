import { } from 'dotenv/config.js'

import Mongo from 'mongodb'
const MongoClient = Mongo.MongoClient


class Database {
    constructor() {
        this.client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true })
    }

    async connect() {
        try {
            if (this.client.isConnected()) return

            await this.client.connect()

            this.database = this.client.db(process.env.DATABASE_NAME)

            this.users = this.database.collection(process.env.USERS_COLLECTION)
            this.todos = this.database.collection(process.env.TODOS_COLLECTION)

            console.log('Successfully connected to the database!')
        } catch (error) {
            throw error
        }
    }

    closeConnection() {
        if (!this.client.isConnected()) this.client.close()
    }

    async insert(object = {}) {
        /*
            * User: name, email, password
            * ToDo: title, description
        */
        const keys = Object.keys(object)

        const addUserKeys = ['name', 'email', 'password']
        const addTodoKeys = ['title', 'description']

        try {

            /*
                * insert() is used by both addUser and addTodo.
                * It then has to check which one it is.
                * Once checked, it executes the proper function.
            */

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
        } catch (error) {
            throw error
        }
    }

    getUsers() {
        try {
            const users = this.users.find({})
            return users
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email = '') {
        try {
            const user = await this.users.findOne({ email })
            return user
        } catch (error) {
            throw error
        }
    }

    async deleteUserByEmail(email = '') {
        try {
            await this.users.deleteOne({ email })
        } catch (error) {
            throw error
        }
    }
}

async function main() {
    const database = new Database()
    await database.connect()

    await database.insert({
        'name': 'Joshua',
        'email': 'joshua@gmail.com',
        'password': 'joshua'
    })

    database.closeConnection()
}

// main()

export default Database