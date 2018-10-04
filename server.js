const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request= require('request')//request module request the weather from api(making api call)
const apiKey='2c1b2f7d4974546c90b1ae31d70af0c3'


app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine','ejs')

app.get('/', function (req, res) {
  res.render('index',{ weather:null,error:null})
})

app.post('/',function(req,res){
	let city=req.body.city
	let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	request(url,function(err,response,body){
		if(err)
		{
			res.render('index', { weather:null,error:'error!please try again' })
		}
		else
		{
			weather=JSON.parse(body)
			if(weather.main==undefined)
			{
				res.render('index',{ weather:null,error:'invalid city name. Please try again' })
			}
			else
			{
				let weatherText=`Its ${weather.main.temp} degrees in ${weather.name}!`
				res.render('index',{weather:weatherText,error:null})
			}
		}
	})
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//2c1b2f7d4974546c90b1ae31d70af0c3