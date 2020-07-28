import { } from 'dotenv/config.js'

import Mongo from 'mongodb'
const MongoClient = Mongo.MongoClient

class Database {
    constructor() {
        (async () => {
            this.client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true })

            if (!this.client.isConnected()) await this.connect()
        })()
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
        if (!this.client.isConnected()) this.client.close()
    }

    async insert(object = {}) {
        /*
            * User: name, email, password
            * ToDo: title, description
        */
        const keys = Object.keys(object)

        const addUserKeys = ['name', 'email', 'password']
        const addTodoKeys = ['user_id', 'title']

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

                const { user_id, title } = object
                await this.todos.insertOne({ user_id, title })
                return true
            }
        } catch (error) {
            throw error
        }
    }

    getUsers() { return this.users.find({}) }

    async getUserByEmail(email = '') {
        try {

            if (typeof (email) === 'string') {

                if (email.includes('@') && email.includes('.')) {

                    return (await this.users.findOne({ email }))
                }
            }
        } catch (error) {
            throw error
        }
    }

    async getUserById(_id = '') {
        try {
            if (typeof (_id) === 'string') return (await this.users.findOne({ '_id': Mongo.ObjectID(_id) }))

        } catch (error) {
            throw error
        }
    }

    getToDosByUserID(user_id = '') {
        if (typeof (user_id) === 'string') return this.todos.find({ user_id })
    }

    async removeToDoByTitle(title = '') {
        try {
            if (typeof (title) === 'string') await this.todos.deleteOne({ title })
        } catch (error) {
            throw error
        }
    }
}

export default Database