# EOCR_Manager(DEVELOPMENT) Setting

## Install nodejs & npm
- Search "install nodejs"
- Search "install npm"

### Download 

- https://github.com/Maphnew/EOCR_Manager.git  

### Install packages & Run server
```bash
$ npm install
$ npm run dev
```

- localhost:8000 접속


## Gateway 설치

```bash
$ git clone https://github.com/Maphnew/EOCR_Manager.git  
$ cd EOCR_Manager
$ npm install
$ npm run start
```

# EOCR_Manager(RELEASE) Setting


## Install nodejs & npm
- install nodejs
```bash
$ sudo apt-get update
$ sudo apt-get install nodejs
$ node -v
```
- install npm
```bash
$ sudo apt-get install npm
$ npm -v
```
### Download 

- https://github.com/Maphnew/EOCR_Manager.git  

```bash
$ sudo apt-get install git
$ git --version
```

```bash
$ git clone https://github.com/Maphnew/EOCR_Manager.git
$ cd EOCR_Manager
$ npm i
# To keep applications alive forever
$ npm i pm2 -g
```
- Test webpage
```bash
$ cd /home/rock/EOCR_Manager
$ node src/app.js
```

- http://localhost:8000



# ROCK PI 4 부팅 시 EOCR Manager 자동 실행 설정 방법

### 1. 셸 스크립트 작성
- sh 파일 작성

#### EOCR Manager
```bash
# /home/rock/
$ cd /home/rock
$ sudo touch eocr_manager.sh
$ sudo vim eocr_manager.sh
```
> eocr_manager.sh 내용 작성 및 저장
```bash
#!/bin/bash
echo EOCR manager start

#node /home/rock/EOCR_Manager/src/app.js
pm2 start /home/rock/EOCR_Manager/src/app.js

exit 0
```
- esc
- :wq 엔터

### 2. 셸 스크립트 명령어로 실행되는지 확인


#### EOCR Manager
```bash
$ sh eocr_manager.sh
```



> ps 명령어로 실행 유무 확인  

#### EOCR Manager
```bash
# 실행중일 경우
rock@linux:~$ ps -efc|grep app.js
root       331   329 TS   19 05:51 ?        00:00:02 node /home/rock/EOCR_Manager/src/app.js
rock       962   898 TS   19 06:04 pts/0    00:00:00 grep --color=auto app.js
```
```bash
# 실행되고 있지 않을 경우
rock@linux:~$ ps -efc|grep app.js
rock      1015   898 TS   19 06:06 pts/0    00:00:00 grep --color=auto app.js
```

### 2. 권한 부여 /etc/rc.local
```bash
$ sudo chmod +x /etc/rc.local
```

### 3. rc.local 실행 스크립트 더하기 
```bash
$ sudo vim /etc/rc.local
```
> 변경 전  
```bash
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.


if [ -f /etc/FIRST_BOOT ]; then
    apt-get install --reinstall rockchip-fstab
    rm /etc/FIRST_BOOT
fi

exit 0
```
> 변경 후  
```bash
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.


if [ -f /etc/FIRST_BOOT ]; then
    apt-get install --reinstall rockchip-fstab
    rm /etc/FIRST_BOOT
fi

# sh 파일 실행 구문 추가
nohup sh /home/rock/eocr_manager.sh &

# 마지막에 exit 0
exit 0
```
### 4. 재부팅 후 실행여부 확인
```bash
$ sudo reboot
```
> localhost:8000 접속  


> 끝.  