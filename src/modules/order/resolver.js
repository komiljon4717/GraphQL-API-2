export default {
    Query: {
        orders:(_, {orderId}, {read}) => {
            return read('orders').filter(el => orderId ? el.orderId == orderId : true)
        }
    },

    Order: {
        food: (parent, _, {read}) => {
            let foods = read('foods')
            return foods.find(el => el.foodId == parent.foodId)
        }
    },

    Mutation: {
        addOrder: (_, { userId, foodId, count}, {read, write}) => {

            let orders = read('orders')
            for (const order of orders) {
                if (order.userId == userId && order.foodId == foodId) {
                    order.count += count
                    write('orders', orders)

                    return {
                        status: 201,
                        message: 'The order added!',
                        data: order
                    }
                }else{
                    let newOrder = {
                        orderId: orders.length? +orders.at(-1).orderId + 1 : 1,
                        userId,
                        foodId,
                        count
                    }
                    orders.push(newOrder)
                    write('orders', orders)

                    return {
                        status: 201,
                        message: 'The order added!',
                        data: newOrder
                    }
                }
            }
        },
        updateOrder: (_, {orderId, userId, foodId, count}, {read, write}) => {
            const orders = read('orders')
            let order = orders.find(el => el.orderId == orderId)

            if (order) {
                
                if (userId) {
                    order.userId = userId
                }
                if (foodId) {
                    order.foodId = foodId
                }
                if (count) {
                    order.count = count
                }

                write('orders', orders)
                return {
                    status: 201,
                    message: 'The order updated!',
                    data: order
                }
            }else{
                return {
                    status: 401,
                    message: 'The order not found!',
                    data: order
                }
            }
        }, 
        deleteOrder: (_, { orderId }, { read, write}) => {
            const orders = read('orders')

            let order = orders.find(el => el.orderId == orderId)

            if (order) {
                let newOrders = orders.filter(el => el.orderId != orderId)
                write('orders', newOrders)
    
                return {
                    status: 201,
                    message: 'The order deleted!',
                    data: order
                }
            }
            else{
                return {
                    status: 401,
                    message: 'The order not found!',
                    data: order
                }
            }
        }
    }
}