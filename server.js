Express = require('express');
var bodyParser = require("body-parser");
var app = Express();
var port = process.env.PORT || 3000;
//var db = mongoose.connection;

app.use(bodyParser.json());
var url = "",infoJson;

// app.get("/users",function(req,res){
// 	var url = req.query;
// 	console.log(url);
// 	res.send(url)
// })

app.get("/video", function(req, res) {
    // url = req.body.url;
    url = req.query.url;
    console.log("url",url);
    youtubeInfo(url,function(info){
    	res.json(info);
        // fs.unlink('./myvideo.mp4',function(err){
        //     console.log(err);
        // });
    })
});

var fs = require("fs");
function youtubeInfo(url,callback) {
    var youtubedl = require('youtube-dl');
    // /https://www.youtube.com/watch?v=iNJdPyoqt8U
    var video = youtubedl("https://"+url,
        // Optional arguments passed to youtube-dl./264
        ['-f', '266'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname });	

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started', info);
        callback(info);
        console.log('filename: ' + info.filename);
        console.log('size: ' + info.size);
        
    });

    // video.pipe(fs.createWriteStream('myvideo.mp4'));
}

app.listen(port, function() {
    console.log('Node app is running  on port', port);
});

