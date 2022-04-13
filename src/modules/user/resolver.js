export default {
    Query: {
        users: (_, { userId }, { read }) => {
            return read('users').filter(user => userId ? user.userId == userId : true)
        }
    },

    Mutation: {
        addUser: (_, { username, contact }, { read, write }) => {
            const users = read('users')

            const newUser = {
                userId: users.length ? +users.at(-1).userId + 1 : 1,
                username, contact
            }

            users.push(newUser)
            write('users', users)

            return {
                status: 201,
                message: 'The user created!',
                data: newUser
            }
        },

        updateUser: (__, {userId, contact}, { read, write}) => {
            const users = read('users')
            let user = users.find(el => el.userId == userId)

            if (user) {
    
                if (user) {
                    user.contact = contact
                }
                write('users', users)
                return {
                    status: 201,
                    message: 'The user contact updated!',
                    data: user
                }
            }else{
                return {
                    status: 401,
                    message: 'The user not found!',
                    data: user
                }
            }
        },

        deleteUser: (_, { userId }, { read, write}) => {
            const users = read('users')

            let user = users.find(el => el.userId == userId)
            console.log("delete");
            if (user) {
                let newUsers = users.filter(user => user.userId != userId)
                write('users', newUsers)
    
                return {
                    status: 201,
                    message: 'The user deleted!',
                    data: user
                }
            }
            else{
                return {
                    status: 401,
                    message: 'The user not found!',
                    data: user
                }
            }

        }
    }
}