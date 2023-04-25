const express = require("express")
const app = express()
const port = 7000

// Middlewars
app.use(express.json())

const data = [
    {
        id: "1",
        numberOfSeats: 100,
        amenities: ["Ac", "chairs", "discolights"],
        price: 5000,
        ifBooked: true,
        customerName: "sanjay",
        date: "05-mar-2023",
        startTime: "10-mar-2023 at 1PM",
        endTime: "11-mar-2023 at 10am",
        RoomId: 201,
        RoomName: "Duplex"

    },
    {
        id: "2",
        numberOfSeats: 100,
        amenities: ["Ac", "chairs", "discolights"],
        price: 5000,
        ifBooked: false,
        customerName: "",
        date: "",
        startTime: "",
        endTime: "",
        RoomId: 202,
        RoomName: "Duplex"
    }
]
app.get('/room', (req, res) => {
    if (req.query) {
        const { book } = req.query;
        console.log(req.query.book);
        let filterHall = data;
        if (book) {
            filterHall = data.filter((e) => e.ifBooked == book)
        }
        res.send(filterHall)
    } else {
        res.send(data)
    }
})

app.get('/room/:id', (req, res) => {
    const { id } = req.params
    console.log(id);
    let specficRoom = data.find(room => room.id == id)
    res.send(specficRoom)
})

app.post('/room/new', (req, res) => {
    const NewRoom = {
        id: data.length + 1,
        numberOfSeats:req.body.numberOfSeats,
        amenities: req.body.amenities,
        price: req.body.price,
        ifBooked: req.body.ifBooked,
        customerName: req.body.customerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        RoomId: req.body.RoomId,
        RoomName: "Duplex"
    }
    console.log(NewRoom);
    data.push(NewRoom)
    res.send(data)
})

app.put('/room/detail/:id', (req,res)=>{
    const {id} = req.params;
    const room = data.find(hall=>hall.id==id)
    if(room.ifBooked==true){
        res.status(402).send("Room Is Already Booked")
    }
    room.customerName=req.body.customerName
    room.date = req.body.date
    room.startTime = req.body.startTime
    room.ifBooked = true
    room.endTime = req.body.endTime
    res.send(room)
})

app.listen(port, () => { console.log(`App is Listning ${port}`) })


