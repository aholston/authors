let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
    bcrypt      = require('bcryptjs');

app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/ang_auth');
mongoose.Promise = global.Promise;

// Example User Schema
var AuthorSchema = new mongoose.Schema({
  first_name: {type: String, required: true, minlength: 3, trim: true},
  last_name: {type: String, required: true, minlength: 3, trim: true}
}, {timestamps: true})
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

// Example get route
app.get('/authors', function(req, res)  {
  let authors = Author.find({}, function(err, authors) {
    if (err) {
      res.json({message: "Error", data: err});
    } else {
      res.json({message: 'Success', data: authors});
    }
  });

});

app.post('/authors', function(req, res) {
  console.log('In server file');
  let author = new Author({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });

  author.save(function(err) {
    if (err) {
      res.status(401).json({message: 'Errors', data: err});
    } else {
      res.json({message: 'Success', data: author});
    }
  });
});

app.get('/authors/:id', function(req, res) {
  let author = Author.findOne({
    _id: req.params.id
  }, function(err, author) {
    if (err) {
      res.json({message: 'Errors', data: err});
    } else {
      res.json({message: 'Success', data: author});
    }
  });
});

app.patch('/authors/:id', function(req, res) {
  let author = Author.findOne({
    _id: req.params.id
  }, function(err, author) {
    if (err) {
      res.json({message: 'Errors', data: err});
    } else {
      author.first_name = req.body.first_name;
      author.last_name = req.body.last_name;
      author.save(function(err) {
        if (err) {
          res.json({message: 'Errors', data: err});
        } else {
          res.json({message: 'Success', data: author});
        }
      })
    }
  });
});

app.delete('/authors/:id', function(req, res) {
  let author = Author.remove({
    _id: req.params.id
  }, function(err) {
    if (err) {
      res.json({message: 'Errors', data: err});
    } else {
      res.json({message: 'Success'});
    }
  });
});

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/index.html"))
});

// Other routes

var server = app.listen(3333, function() {
    console.log("listening on port 3333");
});
var io = require('socket.io').listen(server);
