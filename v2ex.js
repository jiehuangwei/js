// v2ex login js 
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});
var url = '';
var once = 0;
var url_mission = '1';

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


casper.waitForSelector('div.cell', function() {
    this.captureSelector('form.png', 'form[action="/signin"]');
    once = this.getElementAttribute('input[name="once"]', 'value');
    url_mission = 'https://v2ex.com/mission/daily';
    this.fillSelectors('form[action="/signin"]', {
        'input[name="u"]' : 'username',
        'input[name="p"]' : 'password',
        'input[name="next"]' : '/',
        'input[name="once"]' : this.getElementAttribute('input[name="once"]', 'value')
    }, false);
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

//console.log(url_mission);
//console.log(once);






