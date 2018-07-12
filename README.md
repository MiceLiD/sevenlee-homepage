# koa + react 脚手架

## development mode
```
npm run dev
```
webpack-dev-server & node 端口配置在config/index.js

## production mode
```
npm run build
sh ./start/sh
```

## production mode && nginx config
生产模式监听unix的sockets,需要配置nginx
```
upstream framework_prod {
    server unix://{your workplace}/framework/shared/sockets/node.socks;
}
server {
    port xxxx;
    server_name xxx;

    location /framework {
        proxy_pass http://framework_prod;
    }
    location /static/framework {
        alias {your workplace}/framework/static/framework/;
    }
}
```

tips: npm run sript1 & npm run script2 只有在bash下&符号才生效