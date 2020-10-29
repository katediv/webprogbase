const fs = require('fs')
class JsonStorage 
{

    constructor(filePath) 
    {
        this.filePath= filePath
        this.object = {}
        
    }

    get nextId() 
    {
        return (JSON.parse(fs.readFileSync(this.filePath))).nextId
    }

    incrementNextId() 
    {
        const file = (JSON.parse(fs.readFileSync(this.filePath)))
        file.nextId = file.nextId + 1
        fs.writeFileSync(this.filePath, JSON.stringify(file))
    }

    readItems() 
    {
        const items = (JSON.parse(fs.readFileSync(this.filePath))).items;
        return items;
    }

    writeItems(items) 
    {
        let userModel = {}
        userModel.nextId = ++this.object.nextId
        userModel.items = items
        const text = JSON.stringify(userModel, null, 4)
        fs.writeFileSync(this.filePath, text)
    }
};

module.exports = JsonStorage;