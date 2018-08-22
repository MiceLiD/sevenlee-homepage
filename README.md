# sevenlee's homepage

## dev mode
```
npm run dev
```
webpack-dev-server & node 端口配置在config/index.js

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

tips: npm run sript1 & npm run script2 只有在bash下&符号才生效, powerShell 下请分开执行