## tinyproxy搭建私人代理服务器

参考：https://juejin.cn/post/7310914254651097100

### 命令行参考

```bash
# 安装tinyproxy
sudo yum -y install tinyproxy
# 更改配置，记得port一定要改，不然不生效，不知道为啥
# allow可以改为指定的ip或者直接注释全部可以访问
sudo vi /etc/tinyproxy/tinyproxy.conf
# 启动 # sudo service tinyproxy start / stop / restart
sudo service tinyproxy start
# 下载端口查看工具
sudo yum install net-tools
# 查看配置的端口是否运行起来
netstat -tunpl
```

最后在浏览器或者电脑配置代理就好了

### 注意的点：

1. 服务器防火墙一定要放开对应端口
2. 一定要更改监听端口

## 使用v2ray搭建代理服务器

https://github.com/233boy/v2ray/wiki/V2Ray%E6%90%AD%E5%BB%BA%E8%AF%A6%E7%BB%86%E5%9B%BE%E6%96%87%E6%95%99%E7%A8%8B