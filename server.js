// import the express library
const express = require('express');
const fs = require('fs')
const PORT = 3030;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome to my new service"
    })
});

// get a database
const readDatabase = (req, res) =>{
    const database = fs.readFileSync("./user.json");
    return JSON.parse(database); 
}

//write to database
const writeDatabase = (data) => {
    fs.writeFileSync("./user.json", JSON.stringify(data, null, 2))
}

// get all users
app.get("/users", (req,res)=>{
    const users = readDatabase();
    if (users.users.length === 0){
        res.status(404).json({
            message: empty
        })
    }else {
        res.status(200).json({
            message: "ok",
            data: users,
            total: users.users.length
        });
    }
});

// one user
app.get('/users/:id', (req, res) =>{
    const database = readDatabase();
    const userId = parseInt(req.params.id);
    const user = database.users.find((u)=> (u.id === userId));


    if (!user){
        res.status(404).json({
            message: "user not found"
        });
    } else {
        res.status(200).json({
            data: user
        })
    }
    
//     if (user) {
//         res.status(200).json({
//             status: 'success',
//             data: user
//         })
//     }else {
//         res.status(404).json({ message: "user not found"});
//     }
})
// create new user
app.post("/users", (req, res) =>{
    const database = readDatabase();
    const newUser = req.body;
    newUser.id = database.users.length + 1;
    database.users.push(newUser);
    writeDatabase(database);
    res.status(201).json({
        newData: newUser
    });

});

// update user in database
app.put("/users/:id",(req, res) =>{
    const database = readDatabase();
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = database.users.findIndex((i) => (i.id === userId));
    if (index !== -1){
        database.users[index] = { ...database.users[index], ...updatedUser}
        writeDatabase(database)
        res.status(200).json({
            data: database.users[index]
        });
    }else {
        res.send("wrong id sent")
    }
})

// delete user
app.delete("/users/:id", (req, res) =>{
    const database = readDatabase();
    const userId = parseInt(req.params.id)
    const index = database.users.findIndex((i) => (i.id === userId))
    if (!database.users[0]){
        res.status(404).json({
            message: `This id: ${userId} does not exist`
        })
    }else{
        deletedUser = database.users[index]
        database.users.splice(index, 1)
        writeDatabase(database);
        res.status(200).json({
            deletedData: deletedUser
        })
    }
})



app.listen(PORT, ()=>{
    console.log(`app is listening onport i created ${PORT}`);
});