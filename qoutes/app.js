const server = require('http')
const request = require('requests')
const readhtm = require('fs')
const htm = readhtm.readFileSync('html/index.html',"utf-8")

const replaceval = (val,rep)=>{

    let data = val.replace("this is my msg",rep)
    return data




}

const page = server.createServer((req,res)=>{
    if(req.url=="/"){

        request('https://favqs.com/api/qotd')
        .on('data', function (chunk) {
            let data = JSON.parse(chunk)
            let arr = [data]
            const realtime = arr.map((val)=> val.quote.body).join(" ")
            let htmldata = replaceval(htm,realtime)
            res.write(htmldata)
            res.end()
        })
        .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
        
        console.log('end');
        });

       // res.end('hello')
    }
})

page.listen(8000,"127.0.0.1")