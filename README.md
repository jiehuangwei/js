Javascript for bobot
=========

#### v2ex.com

	使用casperjs写的机器人在CLI下模拟浏览器实现 账号登陆，每日登录奖励，发表时间轴日志
    由于被强，目前https可以访问，CLI下需要添加 --ignore-ssl-errors=yes --ssl-protocol=tlsv1 参数
    win下casperjs安装目录下casperjs.bat文件有一行修改为
    call phantomjs --ignore-ssl-errors=yes --ssl-protocol=tlsv1 "%CASPER_BIN%bootstrap.js" --casper-path="%CASPER_PATH%" --cli %ARGV%


