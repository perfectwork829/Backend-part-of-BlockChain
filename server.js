const path = require("path");
require('dotenv').config();
const express =require('express');
const cors=require("cors");
const bodyParser =require('body-parser');
const app=express();

var corsOptions={
    option:"http//localhost:8081"
}
app.use(cors(corsOptions));

const db=require('./app/models');

app.use(bodyParser.json({limit: '150mb', extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to the database");
})
.catch(err=>{
    console.log("Can not connect to the database",err);
    process.exit();
});

var userRouter=require('./app/routes/user.route.js');

const PORT=process.env.PORT||8080;

app.use('/auth',userRouter);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile('index.html', {root: path.join(__dirname, './public/')});
// });
// app.use(express.static('public', {}))

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


