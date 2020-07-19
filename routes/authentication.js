class Authentication {
    constructor() {
        console.log('Authentication class called!')

        this.usersSession = []
    }

    addUserSession(session) {
        const { name, email } = session
        this.usersSession.push(name, email)
    }

    getUsersSession() {
        return this.usersSession
    }
}