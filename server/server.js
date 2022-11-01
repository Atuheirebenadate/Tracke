const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
// const webpack = require('webpack');
// const config = require('../webpack.config');
// require('webpack-hot-middleware/client?reload=true');

// const compiler = webpack(config);
const app = express();
// const port = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname,'data.json');

// const webpackDevMiddleware = require('webpack-dev-middleware')(
//   compiler,config.devServer
// );

// const webpackHotMiddleware = require('webpack-hot-middleware')(
//   compiler
// );
                                                    // Order matters ;)
// app.use(webpackDevMiddleware);                              // 1
// app.use(webpackHotMiddleware);                              // 2

app.use(express.static(path.join(__dirname,'..','dist')));  // 3
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    let timers = [];
    if(data){
      timers = JSON.parse(data);
    }
    res.json(timers);
  });
});

app.post('/api/timer',(req,res)=>{
  const {timer} = req.body;
  // console.log(timer);
  let timers = [];
  fs.readFile(DATA_FILE,(err,data)=>{
    timers = JSON.parse(data);
    timers.push(timer);
    fs.writeFile(DATA_FILE,JSON.stringify(timers,null,2),()=>{
      res.json({success : "timer created"})
    });
  })
})

app.post('/api/timer/start', (req, res) => {
  const {id,start} = req.body;
  console.log('start : ' + id);
  fs.readFile(DATA_FILE, (err, data) => {
    if (data) {
      const timers = JSON.parse(data);
      // console.log(data);
      timers.forEach(t => {
        if (t.id === id) {
          t.runningSince = start;
        }
      })

      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2), () => {
        res.json({
          success: "timer started"
        });
      });
    }
  });
});

app.post('/api/timer/stop',(req,res)=>{
  const {id,stop} = req.body;
  console.log('stop : ' + id);
  fs.readFile(DATA_FILE,(err,data)=>{
    if(data){
      const timers = JSON.parse(data);
      timers.forEach(t => {
        if(t.id === id){
          t.elapsed += stop - t.runningSince;
          t.runningSince = null;
        }
      })
  
      fs.writeFile(DATA_FILE,JSON.stringify(timers,null,2),()=>{
        res.json({success : "timer stopped"});
    });
  }
});  
});

app.put('/api/timer',(req,res)=>{
  const {timer} = req.body;
  fs.readFile(DATA_FILE,(err,data)=>{
    if(data){
      const timers = JSON.parse(data);
      timers.forEach( t => {
        if(t.id === timer.id){
          t.title = timer.title;
          t.project = timer.project;
          console.log(`found ${JSON.stringify(t,null,2)}`);
        }
      })

      fs.writeFile(DATA_FILE,JSON.stringify(timers,null,2),()=>{
        res.json({success : "timer updated"});
    })
  }
});
});

app.delete('/api/timer',(req,res)=>{
  let timers=[];
  const {id} = req.body;
  console.log(id);
  fs.readFile(DATA_FILE, (err,data)=>{
    timers = JSON.parse(data);
    timers = timers.filter(t => t.id !== id);
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2),()=>{
      res.json({success : "timer deleted with id : "+id});
  });
});
});

app.listen(process.env.PORT || 8080,()=>{
  console.log(`Server running at http://localhost:${process.env.PORT || 8080}`);
})
