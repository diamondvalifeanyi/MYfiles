const express = require('express');
const myapp = express();
const PORT = 5030
myapp.use(express.json());

const fuelStation = [{id: 1, staffName: "linda", staffAddress: "shomolu", staffSalary: `70,000`, staffPosition: "manager", gender: "female" },
{id: 2, staffName: "bolu", staffAddress: "bariga", staffSalary: `60,000`, staffPosition: "asstmanager", gender: "female" },
{id: 3, staffName: "ejike", staffAddress: "lekki", staffSalary: `50,000`, staffPosition: "supervisor", gender: "male" },
{id: 4, staffName: "grace", staffAddress: "ikeja", staffSalary: `40,000`, staffPosition: "cashier", gender: "female" },
{id: 5, staffName: "mike", staffAddress: "surulere", staffSalary: `30,000`, staffPosition: "attendant", gender: "male" }
];

myapp.get("/", (req, res) => {
    res.send("fuel station solution");
});
// get all staff
myapp.get("/staffRecords", (req, res) => {
    res.status(200).json({
        data: fuelStation
    })
});

myapp.get("/staffRecords/:id", (req, res) => {
    const staffId = parseInt(req.params.id);
    const staff = fuelStation.find((item) => (item.id === staffId));
    if(!staff) {
        res.status(404).json({
            data: "user not found"
        })
    }else {
        res.status(200).json({
            data: staff
        })
    }
})

//Creating a new staff
myapp.post("/staffRecords", (req, res) => {
    // const database = fuelStation;
    const newStaff = req.body;
    newStaff.id = fuelStation.length + 1;
    fuelStation.push(newStaff);
    // writeDatabase(database);
    res.status(200).json({
        data: newStaff
    });
})


//update staff records
myapp.put("/staffRecords/:id", (req, res) => {
    const staffId = parseInt(req.params.id);
    const updatedStaff = req.body;
    const index = fuelStation.findIndex((item) => (item.id === staffId));
    if(index !== -1) {
        fuelStation[index] = {...fuelStation[index], ...updatedStaff}
        res.status(200).json({
            data: fuelStation[index]
        });
     }else {
        res.send("wrong id sent")
     }

})

//delete staff records
myapp.delete("/staffRecords/:id", (req, res) => {
    const staffId = parseInt(req.params.id);
    const index = fuelStation.findIndex((item) => (item.id === staffId));
    if (!fuelStation[0]){
        res.status(404).json({
            message: `this id: ${staffId} does not exist`
        })
    }else {
        deletedStaff = fuelStation[index]
        fuelStation.splice(index, 1)
        res.status(200).json({
            data: "staff successfully deleted"
        })
    }
})




myapp.listen(PORT, ()=>{
    console.log("solution port " + PORT)
})