var express = require('express');
var app = express();
app.use( express.static( __dirname + '/public' ) )


app.use(function(req, res, next){
    next()
})

app.get('/', function(req, res){
    res.sendFile('seville.html', {root : './public/html'})
})

var locations = [
    'seville',
    'canaryIslands',
    'capeVerde',
    'straitOfMagellan',
    'guam',
    'philippines',
]


app.get('/next', function(req, res, next){
    if ( locations.indexOf(req.query.location) === -1 ) { return next() }
    res.send({
        location     : req.query.location,
        nextLocation : locations[locations.indexOf(req.query.location)+1]
    })
})

app.use(function(req, res){
    res.status(404).sendFile('404.html', {root: './public/html'})
})

// Listen for connections \\
app.listen(3000, function(){
	console.log('We good on port 3000')
})
