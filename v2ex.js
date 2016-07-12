// v2ex login js 
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});
var user = casper.cli.get("user");
var passwd = casper.cli.get("passwd");
var debug = casper.cli.get('show');
debug = debug ? debug : 'info'; // debug, info, warning, error
var once = 0;
var url_mission = '1';

casper = require('casper').create({
    verbose: true,
    logLevel: debug,
});

casper.userAgent('Mozilla/5.0 (Linux; U; Android 2.2; en-us; ADR6300 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');

casper.start('https://www.v2ex.com/signin', function() {
    this.wait(5000,function() {
        this.echo("I've waited for 5 seconds");
    });
}).then(function(){
    url = this.getCurrentUrl();
    this.echo(url);
    //this.echo(this.getHTML());
    this.capture("login.png");
});

// login form
casper.waitForSelector('div.cell', function() {
    this.captureSelector('form.png', 'form[action="/signin"]');
    once = this.getElementAttribute('input[name="once"]', 'value');
    str  = this.getElementsAttribute('input.sl', 'name');
    url_mission = 'https://v2ex.com/mission/daily';
    //this.fillSelectors('form[action="/signin"]', {
    //    name : '',
    //    passwd : '',
    //    'input[name="next"]' : '/',
    //    'input[name="once"]' : this.getElementAttribute('input[name="once"]', 'value')
    //}, false);
    var f_name   = str[0];
    var f_passwd = str[1];
    var data = {
	'next' : '/',
	'once' : this.getElementAttribute('input[name="once"]', 'value')
    };
    data[f_name] = user;
    data[f_passwd] = passwd;
    //require('utils').dump(data);
    this.fill('form[action="/signin"]', data, false);
    //this.click('input[value="登录"]');
    //this.echo(this.getCurrentUrl());
    this.capture("login-fill.png");
    //this.echo('login clicked...');
});

casper.thenClick('input[value="登录"]', function(){
    this.echo(this.getCurrentUrl());
    this.echo(once);
    this.capture("logined.png");
})

// todo 此处好像有点问题，没有领成功
casper.then(function(){
    this.open(url_mission);
}).then(function(){
    this.capture("daily.png");
}).thenClick('input[value="领取 X 铜币"]', function(){
    this.capture("daily-do.png");
})


casper.then(function(){
    this.open("https://v2ex.com/t");
})

casper.waitForSelector('div.box', function() {
    var time = new Date().toLocaleString();
    this.sendKeys('div.box textarea#s', "我发了一条日志，使用机器人 casperjs！！" + time);
    this.capture("send.png");
});

casper.thenClick('input[value="发布"]', function(){
    this.echo('send...');
    this.wait(2000,function() {
        this.echo("I've waited for 2 seconds");
    });
}).then(function(){
    this.open("https://v2ex.com/t");
}).then(function(){
    this.capture("msg.png");
});

casper.run();
//测试一下，谢谢
//console.log(url_mission);
//console.log(once);






