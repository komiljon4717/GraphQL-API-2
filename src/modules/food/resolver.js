export default {
    Query: {
        foods:(_, {foodId}, {read}) => {
            return read('foods').filter(food => foodId ? food.foodId == foodId : true)
        }
    },

    Mutation: {
        addFood: (_, { foodName, foodImg}, {read, write}) => {
            let foods = read('foods')

            let newFood = {
                foodId: foods.length? +foods.at(-1).foodId + 1 : 1,
                foodName,
                foodImg
            }

            foods.push(newFood)
            write('foods', foods)

            return {
                status: 201,
                message: 'The food created!',
                data: newFood
            }
        },
        updateFood: (_, {foodId, foodName, foodImg}, {read, write}) => {
            const foods = read('foods')
            let food = foods.find(el => el.foodId == foodId)

            if (food) {
                
                if (foodName) {
                    food.foodName = foodName
                }
                if (foodImg) {
                    food.foodImg = foodImg
                }

                write('foods', foods)
                return {
                    status: 201,
                    message: 'The food updated!',
                    data: food
                }
            }else{
                return {
                    status: 401,
                    message: 'The food not found!',
                    data: food
                }
            }
        }, 
        deleteFood: (_, { foodId }, { read, write}) => {
            const foods = read('foods')

            let food = foods.find(el => el.foodId == foodId)

            if (food) {
                let newFoods = foods.filter(el => el.foodId != foodId)
                write('foods', newFoods)
    
                return {
                    status: 201,
                    message: 'The food deleted!',
                    data: food
                }
            }
            else{
                return {
                    status: 401,
                    message: 'The food not found!',
                    data: food
                }
            }
        }
    }




}