var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', function(req, res){
	res.sendFile(path.join(__dirname,'public/index.html'));
});


/// ダミーAPI実装
app.all('/api/*', function(req, res, next) {
	res.contentType('application/json');
	next();
});
app.get('/api/init', function(req, res) {
	// ダミーのコンテキスト情報を返却
	setTimeout(function() {
		res.send(JSON.stringify({
			_token: 'dummy_token',
			user: {
				id: 1,
				login: 'sample',
				name: 'サンプルユーザ',
				email: 'sukobuto@gmail.com',
				enabled: true,
				clearances: ['master'],
				is_master: true
			},
			config: {
				label: {
					app_title: 'AdminExample'
				}
			},
			success: true
		}));
	}, 500);
});
app.get('/api/successDummy', function(req, res) {
	setTimeout(function() {
		res.send(JSON.stringify({
			success: true
		}));
	}, 800);
});
app.get('/api/getUsers', function(req, res) {
	res.send(JSON.stringify({
		success: true,
		users: [
			{
				id: 1,
				login: 'sample',
				name: 'サンプルユーザ',
				email: 'sukobuto@gmail.com',
				enabled: true,
				clearances: ['master'],
				is_master: true
			},
			{
				id: 2,
				login: 'sample2',
				name: 'サンプルユーザ2',
				email: '',
				enabled: true,
				clearances: ['master'],
				is_master: true
			},
			{
				id: 3,
				login: 'sample3',
				name: 'サンプルユーザ3',
				email: '',
				enabled: true,
				clearances: ['home, contact'],
				is_master: false
			}
		]
	}));
});
app.get('/api/getMessages', function(req, res) {
	var offset = +req.query.offset;
	var limit = +req.query.limit;
	var data = [];
	for (var i = offset; i < offset + limit; i++) {
		data.push({
			date: '2014/12/11',
			name: 'ななし' + i,
			title: 'KnockoutJSよい' + i,
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mi et ipsum rutrum faucibus. In et pretium justo. Maecenas molestie facilisis gravida. Vestibulum pretium justo eu justo ultrices, ac elementum felis scelerisque. Suspendisse nec sapien nisl. Duis quis aliquet nunc. Donec ex purus, suscipit et tempor id, ornare vel tortor. Donec in erat urna. In tempus eu sem sed feugiat. Praesent eget enim a turpis tincidunt tempor in nec tellus. Nulla quis mi at quam sodales fermentum. Pellentesque ultricies odio at condimentum pellentesque.\n\nSed ante dolor, feugiat non iaculis a, dignissim et augue. Nam ornare sed metus at pharetra. Aenean turpis sem, tincidunt eget auctor sit amet, bibendum vel turpis. Vivamus aliquet congue erat eget feugiat. Sed volutpat magna sapien, id suscipit nibh bibendum eget. Quisque rhoncus interdum libero, sit amet ultricies tortor dapibus in. Aliquam vel sapien rutrum, volutpat nibh vitae, euismod metus. Praesent vulputate sollicitudin ante a dapibus. Nam sagittis volutpat tempor."
		});
	}
	setTimeout(function() {
		res.send(JSON.stringify({
			count: 200,
			messages: data
		}));
	}, 40);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send(err);
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
});

app.listen(5000);
