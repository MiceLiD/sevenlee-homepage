# sevenlee's homepage
# node
node > 8

## dev mode
```
npm install
npm run dev
```

## prod mode
```
npm run build
sh ./start.sh
```

## production mode && nginx config
生产模式监听unix的sockets,需要配置nginx
```
upstream sevenlee_prod {
    server unix:{your workspace}/sevenlee-homepage/shared/sockets/node.sock;
}
server {
    port xxxx;
    server_name xxx;

    location /sevenlee {
        proxy_pass http://sevenlee_prod;
    }
    location /static/sevenlee {
        alias {your workspace}/sevenlee-homepage/static/sevenlee/;
    }
    location /sevenlee-public {
        alias {your workspace}/sevenlee-homepage/public/;
    }
}
```

## mysql
# develop
user: www
pass: www
database: sevenlee
```
CREATE DATABASE sevenlee CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'www'@'%' IDENTIFIED BY 'www';
GRANT ALL PRIVILEGES ON sevenlee.* to 'www'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'www'@'%';
```

# production
```
sh ./generateSecret.sh // ef678sff6sd6s...
vim .env // create .env file
```
In .env file, Input this content:
SESSIONZ_SECRET=ef678sff6sd6s...
DB_USERNAME=sevenlee
DB_PASSWORD='Your password'

mysql:
user: sevenlee
pass: xxx
database: sevenlee
```
CREATE DATABASE sevenlee CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'sevenlee'@'%' IDENTIFIED BY 'xxx';
GRANT ALL PRIVILEGES ON sevenlee.* to 'sevenlee'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'sevenlee'@'%';
```

# 附
开启MySQL 3306端口
1. 阿里云请新建安全组规则，开启3306端口
2. 命令行：iptables -I INPUT -p tcp --dport 3306 -j ACCEPT
