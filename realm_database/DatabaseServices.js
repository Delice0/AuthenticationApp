import Realm from 'realm';

const USER_TABLE = 'User'

const USER_SCHEMA = {
    name: USER_TABLE,
    primaryKey: 'id',
    properties: {
        id: 'int',
        username: 'string',
        password: 'string'
    }
}

const DATABASE_OPTIONS = {
    schema: [USER_SCHEMA],
    schemaVersion: 0,
}

closeDatabase = (realm) => {
    if (realm !== null && !realm.isClosed) {
        realm.close()
        console.log("Closed realm..")
    }
}

export const doesUserExist = (inputUser, inputPass) => {
    console.log("Current schema version: " + Realm.schemaVersion(Realm.defaultPath))

    let realm = new Realm(DATABASE_OPTIONS)

    let allUsers = realm.objects(USER_TABLE)

    realm.beginTransaction()

    console.log("Input user: " + inputUser + "\nInput pass: " + inputPass)

    if (allUsers.length == 0) {
        console.log("No users in database..")
    } else {
        console.log("######### Querying all users #########")
        for (let index = 0; index < allUsers.length; index++) {
            console.log("User #" + (index + 1) +
                ":\n\tID: " + allUsers[index].id +
                "\n\tUsername: " + allUsers[index].username +
                "\n\tPassword: " + allUsers[index].password + "\n\n")
        }
        console.log("######### Done querying all users #########")
    }

    let isUserValid = allUsers.filtered('username == $0 AND password == $1', inputUser, inputPass).length != 0

    realm.commitTransaction()
    realm.close()

    return isUserValid
}

export const createUser = (username, password) => {
    let realm = new Realm(DATABASE_OPTIONS)

    let allUsers = realm.objects(USER_TABLE)
    
    realm.beginTransaction()

    let lastUserId = undefined
    console.log("Last user id first: " + lastUserId)

    if (allUsers.length == 0) {
        lastUserId = 0
        console.log("Last user id second: " + lastUserId)
        console.log("No users in database..")
    } else {
        lastUserId = allUsers.sorted("id", true)[0].id
        console.log("Last user id third: " + lastUserId)
        console.log("######### Querying all users #########")
        for (let index = 0; index < allUsers.length; index++) {
            console.log(
                "User #" + (index + 1) +
                ":\n\tID: " + allUsers[index].id +
                "\n\tUsername: " + allUsers[index].username +
                "\n\tPassword: " + allUsers[index].password + "\n\n")
        }
        console.log("######### Done querying all users #########")
    }

    console.log("Last user ID: " + lastUserId)

    let nextUserId = lastUserId == 0 ? 1 : lastUserId + 1

    console.log("Next user ID is: " + nextUserId)

    realm.create(USER_TABLE, { id: nextUserId, username: username, password: password });
    console.log("Created new user: " + "[\n\tID: " + nextUserId + "\n\tUsername: " + username + "\n\tPassword: " + password + "\n]")

    realm.commitTransaction()
    realm.close()
}
export default new Realm(DATABASE_OPTIONS)