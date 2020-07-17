import mysql from 'mysql'

/*
    * TODO: Try to do a mini interface using Electron
*/

class Database {
    constructor(database_name, table_name) {
        this.databaseName = database_name
        this.tableName = table_name

        this.database = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: this.databaseName
        })

        this.connectDatabase()
    }

    connectDatabase() {
        this.database.connect((err) => {
            if (err) throw new Error(err.sqlMessage)

            console.log('Connection established!')
        })
    }

    readAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    read(id = 1) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    add(data = { todo: 'Empty object' }) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} SET ?`
            this.database.query(query, data, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    remove(id = 1) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    update(id = 1, data = { todo: 'Empty object' }) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.tableName} SET todo = '${data.todo}' WHERE id = ${id}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    close() {
        this.database.end((err) => {
            if (err) throw err

            console.log('MySQL database closed!')
        })
    }

    resetIdValue() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName}`
            this.database.query(query, (err, res) => {
                if (err) reject(err)

                const lastIndex = res.length - 1

                if (lastIndex > 0) {
                    const lastId = res[lastIndex].id

                    this.database.query(`ALTER TABLE ${this.tableName} AUTO_INCREMENT = ${lastId}`, (err, res) => {
                        if (err) return reject(err)

                        resolve(res)
                    })
                } else {
                    // If there is no items in the database
                    // Set the AUTO_INCREMENT value to 0
                    this.database.query(`ALTER TABLE ${this.tableName} AUTO_INCREMENT = 0`, (err, res) => {
                        if (err) return reject(err)

                        resolve(res)
                    })
                }
            })
        })
    }
}

export default Database