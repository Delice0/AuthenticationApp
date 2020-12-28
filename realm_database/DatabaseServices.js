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
    inMemory: true,
}

closeDatabase = (realm) => {
    if (realm !== null && !realm.isClosed) {
        realm.close()
    }
}

export const CreateUser = (id, username, password) => {
    return (
        Realm.open({
            DATABASE_OPTIONS
        }).then(realm => {
            realm.write(() => {
                realm.create(USER_TABLE, { id: id + 1, username: username, password: password });
            })

            this.closeDatabase(realm)
        }).catch((error) => console.log('Something went wrong when creating user\n' + "Error: " + error))
    )
}

export default new Realm(DATABASE_OPTIONS)