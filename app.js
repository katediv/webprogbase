const readline = require('readline-sync')
const productRepository = require('./repositories/productRepository.js')
const userRepository = require('./repositories/userRepository.js')
const Product = require('./models/product.js')
let users = new userRepository('./data/users.json')
let products = new productRepository('./data/products.json')

while (1) 
{
    console.log('\nChoose the command (entities: users and products):\n')
    console.log('1. get/{entities}\n')
    console.log('2. get/{entities}/{id}\n')
    console.log('3. delete/{entities}/{id}\n')
    console.log('4. update/{entities}/{id}\n')
    console.log('5. post/{entities}\n')
    console.log('6. exit\n')
    const commmand = readline.question('Enter the command: ')
    if (commmand === 'get/users') 
    {
        console.log('\nUsers:\n')
        let usersArr = users.getUsers()
        usersArr.forEach(i => 
        {
            for (let field in i) 
            {
                console.log(`${field}: ${i[field]}`)
            }
            console.log('\n')
        }
        )
    }
    else if (commmand === 'get/products') 
    {
        console.log('\nProducts:\n')
        let productsArr = products.getProducts()
        productsArr.forEach(i => 
        {
            for (let field in i) {
                console.log(`${field}: ${i[field]}`)
            }
            console.log('\n')
        }
        )
    }
    else if (commmand.includes('get/users/')) 
    {
        let id = commmand.split('/')[2]
        let usersArr = users.getUserById(id)
        if (usersArr != null)
        {
            console.log(usersArr.login, usersArr.fullname, usersArr.role, usersArr.registeredAt, usersArr.avaUrl, usersArr.isEnabled)
        }
        else console.log("incorrect id")
    }
    else if (commmand.includes('get/products/')) 
    {
        let id = commmand.split('/')[2]
        let productsArr = products.getProductById(id)
        if (productsArr != null)
        {
            console.log(productsArr.name, productsArr.type, productsArr.price, productsArr.amount, productsArr.date)
        }
        else console.log("incorrect id")
    }
    else if (commmand.includes('delete/products/'))
    {
        let id = commmand.split('/')[2]
        try
        {
           products.deleteProduct(id)
           console.log('Product is deleted')
        }
        catch
        {
            console.log('Product is not deleted')
        }
    }
    else if (commmand.includes('update/products/'))
    {
        let id = commmand.split('/')[2]
        const product = products.getProductById(id)
        if(product != null)
        {
            console.log('Product: ', product.id, product.name, product.type, product.price, product.amount, product.date)
            console.log('Now you can change all fields')
            const name = readline.question('Enter product name: ')
            product.name = name
            const type = readline.question('Enter product type: ')
            product.type = type
            const price = readline.question('Enter product price: ')
            const Price = Number(price)
            if (Price.toString() != 'NaN' && Price.toFixed() > 0)
            {
                product.price = Price
            }
            else console.log('Incorrect format. Try to type numbers next time')
            const amount = readline.question('Enter product amount: ')
            const Amount = Number(amount)
            if (Amount.toString() != 'NaN' && Amount.toFixed() > 0)
            {
                product.amount = Amount.toFixed()
            }
            else console.log('Incorrect format. Try to type numbers next time')
            const time = new Date().getTime()
            const date = new Date(time)
            product.date = date.toISOString()
            try
            {
                products.updateProduct(product)
                console.log('Product is changed')             
            }
            catch (err)
            {
                console.log('Unfortunatly nothing changed')
            }
        }
    }
    else if (commmand === 'post/products')
    {
        product = new Product()
        const name = readline.question('Enter product name: ')
        product.name = name
        const type = readline.question('Enter product type: ')
        product.type = type
        const price = readline.question('Enter product price: ')
        const Price = Number(price)
        if (Price.toString() != 'NaN' && Price.toFixed() > 0)
        {
            product.price = Price
        }            
        else console.log('Incorrect format. Try to type numbers next time')
        const amount = readline.question('Enter product amount: ')
        const Amount = Number(amount)
        if (Amount.toString() != 'NaN' && Amount.toFixed() > 0)
        {
            product.amount = Amount.toFixed()
        }
        else console.log('Incorrect format. Try to type numbers next time')
        const time = new Date().getTime()
        const date = new Date(time)
        product.date = date.toISOString()
        try
        {
            products.addProduct(product)
            console.log('Product is added')             
        }
        catch (err)
        {
            console.log('Unfortunatly nothing added')
        }
    
    }

}
