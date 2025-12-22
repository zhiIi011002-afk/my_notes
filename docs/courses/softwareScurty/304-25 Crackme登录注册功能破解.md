# 304-25 Crackme登录注册功能破解

## 环境准备

下载Ollydbg，crackme程序（github上面的crackme160）

### Crackme选择

Crackme选自[![img](http://images/external_integrations/github-icon.png?ynotemdtimestamp=1766380211206)crackme160](https://github.com/apachecn/crackme160)，作者 Acid burn，下载链接：https://github.com/apachecn/crackme160/blob/master/Acid burn.zip

也是chm文件中的第一个文件（点击即可下载压缩包）

## 正式破解

在od中打开，并且点击运行。

随便输一个密码，弹出这个界面后，在od中点击暂停键，进行调试
![image222](/course/softwareSecurtyHomework/image222.png)

点击K，查看堆栈中的线程：

![image (1)](/course/softwareSecurtyHomework/image (1).png)

观察其中的 MessageBox 字样，这个 MessageBox 就是我们之前弹出没关的那个窗口，鼠标选中这一行（这一行就是程序中控制弹出提示框的语句），右键，show call（显示调用），点击之后会跳转到 main thread 窗口。

![image (2)](/course/softwareSecurtyHomework/image (2).png)

然后往前翻，我们找到了 push ebp 这句代码，这句代码在汇编语言中，一般在程序入口会出现，我们在这里打个断点

![image (4)](/course/softwareSecurtyHomework/image (4).png)

点击运行键，继续运行原程序，重新按 Check it Baby！按钮验证，此时没有直接弹出错误的提示框，而是触发了断点程序暂停，停在了我们之前打断点的那一行

![image (5)](/course/softwareSecurtyHomework/image (5).png)

发现下方堆栈窗口中，有我随便输入的用户名和序列号12345,12345，以及下方的一个ASCII "CW-4018-CRACKED"

将其输入进serial，发现正是正确的序列号。

![image (6)](/course/softwareSecurtyHomework/image (6).png)