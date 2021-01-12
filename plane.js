// 获取到开始界面元素
var startDiv = document.getElementById('startDiv');
// 获取游戏主界面元素
var 马上打包 = document.getElementById('mainDiv');
//获取结束界面的盒子
var endDiv = document.getElementById('endDiv');
//获取最后的得分
var endScore = document.getElementById('endScore');
//获取左上角的盒子
var leftScore = document.getElementById('leftScore');

//获取到暂停界面的盒子
var suspendDiv = document.getElementById('suspendDiv');

var scores = 0; //计分
//定时器的标识符
var timer = null;

/*2.声明创建飞机构造函数*/
function Plane(hp,score,sudu,dietime,boomimage,x,y,width,height,imageSrc){
	//我的飞机设置属性
	this.planeX = x;
	this.planeY = y;
	this.planeWidth = width;
	this.planeHeight = height;

	this.planeIsDie = false; //默认飞机不死亡

	//给飞机添加血量
	this.planeHp = hp;
	//打死每个飞机获得分数
	this.planeScore = score;
	//给飞机添加速度
	this.planeSudu = sudu;

	//飞机的死亡时间
	this.planeDieTime = dietime;

	//飞机爆炸的图片
	this.planeboomImage = boomimage;

	//标记飞机在什么时间死亡
	this.planeDieTimes = 0;



	//创建图片的节点元素
	this.init = function(){
		this.imageNode = null;
		// 创建img标签
		this.imageNode = document.createElement('img');
		this.imageNode.setAttribute('src',imageSrc);
		// this.imageNode.src = imageSrc;
		// this.imageNode.style.position = 'absolute';
		this.imageNode.style.left = this.planeX+'px';
		this.imageNode.style.top = this.planeY+'px';
		// 追加到mainDiv盒子中
		mainDiv.appendChild(this.imageNode);
	}
	// 调用初始化方法
	this.init();

	//敌机向下移动方法
	this.planeMove = function(){
		// console.log(scores);
		// console.log(this.imageNode.offsetTop+'px'); //一开始的值就是敌机的y坐标
		// this.imageNode.style.top = this.imageNode.offsetTop+3+'px';
		// 100+5+5+5+5+5
		if (scores<5000) {
			this.imageNode.style.top = this.imageNode.offsetTop+this.planeSudu+'px';
		}else if(scores>=5000&&scores<10000){
			this.imageNode.style.top = this.imageNode.offsetTop+this.planeSudu+1+'px';
		}else if(scores>=10000&&scores<15000){
			this.imageNode.style.top = this.imageNode.offsetTop+this.planeSudu+2+'px';
		}else if (scores>=15000&&scores<20000) {
			this.imageNode.style.top = this.imageNode.offsetTop+this.planeSudu+3+'px';
		}else if (scores>=20000&&scores<25000) {
			this.imageNode.style.top = this.imageNode.offsetTop+this.planeSudu+4+'px';
		}else{
			this.imageNode.style.top = this.imageNode.offsetTop+this.planeSudu+5+'px';
		}

	}

}

/*3.声明我方飞机的函数*/
function OurPlane(x,y){
	// call()函数用于调用Plan函数,它会将当前对象传到Plan函数中使用
	Plane.call(this,0,0,0,6666,'image/本方飞机爆炸.gif',x,y,66,80,'image/我的飞机.gif');
			  // hp,score,sudu,dietime,boomimage,x,y,width,height,imageSrc
	// this.imageNode.style.position = 'absolute';
	this.imageNode.setAttribute('id','ourPlaneImg');

}

// 4.我方飞机函数创建
var selfPlane = new OurPlane(127,480);
// console.log(mainDiv);

// 5.获取到本方飞机img标签元素
var ourPlane = document.getElementById('ourPlaneImg');
// 声明移动的函数
function yidong(){

	//获取到event对象
	var e = window.event;

	// 获取鼠标的坐标
	var selfPlaneX = e.clientX;
	var selfPlaneY = e.clientY;

	// console.log(selfPlaneX,selfPlaneY);

	// 设置本方飞机图片节点元素的坐标
	ourPlane.style.left = selfPlaneX-500-selfPlane.planeWidth/2+'px';
	ourPlane.style.top = selfPlaneY-selfPlane.planeHeight/2+'px';

}
// 声明边界检测的函数
function bianjie(){

	var e = window.event;

	var bodyX = e.clientX;
	var bodyY = e.clientY;
	// console.log(bodyX,bodyY);

	if (bodyX<500+33||bodyX>820-33||bodyY<0+40||bodyY>568-40) {
		// 移除事件
		// 浏览器兼容
		if (document.removeEventListener) {
			mainDiv.removeEventListener('mousemove',yidong);
		}else if(document.detachEvent){
			mainDiv.detachEvent('onmousemove',yidong)
		}

	}else{ //没有移出边界,添加移动事件
		if (document.addEventListener) {
			mainDiv.addEventListener('mousemove',yidong);
		}else if(document.attachEvent){
			mainDiv.attachEvent('onmousemove',yidong);
		}
	}
}

var number = 0; //0暂停  1继续
//暂停的方法
function zanting(){
	if (number==0) { //暂停
		//(1)修改显示的样式
		suspendDiv.style.display = 'block';
		//(2)移除事件
		if (document.removeEventListener) {
			mainDiv.removeEventListener('mousemove',yidong);
			body.removeEventListener('mousemove',bianjie);

		}else if(document.detachEvent){
			mainDiv.detachEvent('onmousemove',yidong);
			body.detachEvent('onmousemove',bianjie);
		}

		//关闭定时器
		clearInterval(timer);
		number = 1;

	}else{

		suspendDiv.style.display = 'none';
		//开启事件
		if (document.addEventListener) {
			mainDiv.addEventListener('mousemove',yidong);
			body.addEventListener('mousemove',bianjie);
		}else if(mainDiv.attachEvent){
			mainDiv.attachEvent('onmousemove',yidong);
			body.attachEvent('onmousemove',bianjie);
		}
		//开启定时器
		timer = setInterval(circulation,20);
		number = 0;
	}

}
// 添加移动事件(mainDiv)
//获取body
var body = document.getElementsByTagName('body')[0];
if (document.addEventListener) {
	// 1.首先要获取到body
	// 2.给body添加移动事件,执行检测边界的行为
	mainDiv.addEventListener('mousemove',yidong);
	body.addEventListener('mousemove',bianjie);
	selfPlane.imageNode.addEventListener('click',zanting);

	var btn = suspendDiv.getElementsByTagName('button')[0];
	//给按钮添加暂停的事件
	btn.addEventListener('click',zanting);
}else if(mainDiv.attachEvent){
	mainDiv.attachEvent('onmousemove',yidong);
	body.attachEvent('onmousemove',bianjie);
	selfPlane.imageNode.attachEvent('onclick',zanting);

	var btn = suspendDiv.getElementsByTagName('button')[0];
	//给按钮添加暂停的事件
	btn.attachEvent('click',zanting);
}

// 产生最小值到最大值的随机数
function random(min,max){ //1  5
	return Math.floor(Math.random()*(max-min)+min);
}
// 声明敌方飞机创建函数
function Enemy(hp,score,sudu,dietime,boomimage,a,b,width,height,imageSrc){
			//hp,score,sudu,dietime,boomimage,x,y,width,height,imageSrc
	var r = random(a,b); //23 274
	// console.log(r);
	Plane.call(this,hp,score,sudu,dietime,boomimage,r,0,width,height,imageSrc);
}

//声明创建子弹的函数
function Bullet(x,y,width,height,imageSrc){
	// 子弹对象属性赋值
	this.bulletX = x;
	this.bulletY = y;
	this.bulletWidth = width;
	this.bulletHeight = height;

	//子弹图片节点元素的初始化方法
	this.init = function(){

		this.bulletImgNode = null;
		//创建图片的节点
		this.bulletImgNode = document.createElement('img');
		//设置属性和样式
		this.bulletImgNode.src = imageSrc;
		this.bulletImgNode.style.left = this.bulletX+'px';
		this.bulletImgNode.style.top = this.bulletY+'px';
		//追加到mainDiv中
		mainDiv.appendChild(this.bulletImgNode);

	}
	// 调用初始化方法
	this.init();

	//声明子弹移动的方法
	this.bulletMove = function(){
		this.bulletImgNode.style.top = this.bulletImgNode.offsetTop-10+'px';
	}


}
//声明创建子弹的函数
function AddBullet(x,y){

	Bullet.call(this,x,y,6,14,'image/bullet1.png');
}
var mark1 = 0; //标记什么时候开始创建敌机
var mark2 = 0;  //标记什么时候创建什么类型的飞机
var bgPositionY = 0;

var enemys = new Array(); //创建敌机数组,存放不同类型的飞机

var bullets = [];//创建子弹的数组,存放所有的子弹对象
// 声明定时器调用的循环方法
function circulation(){
	// 1.模拟背景往下移动
	mainDiv.style.backgroundPositionY = bgPositionY+'px';
	mainDiv.style.backgroundRepeat = 'repeat-y';
	bgPositionY+=1;

	if (bgPositionY==568) {
		bgPositionY=0;
	};

	//2.创建敌方飞机
   mark1++;
   if (mark1 == 50) { //1000毫秒创建敌机
   	mark2++;
   	if (mark2%5==0) { //创建中型飞机
   	    var middleEnemy = new Enemy(9,5000,random(1,3),200,'image/中飞机爆炸.gif',23,274,46,60,'image/enemy3_fly_1.png');
   	    						//hp,score,sudu,dietime,boomimage,x,y,width,height,imageSrc
   	    //将中型飞机添加到敌机数组中
   	    enemys.push(middleEnemy);
   	}
   	if (mark2%20==0) { //创建大型飞机
   		var bigEnemy = new Enemy(36,10000,1,500,'image/大飞机爆炸.gif',55,210,110,164,'image/enemy2_fly_1.png');
   		enemys.push(bigEnemy);
   	}else{ //创建小型飞机
   		var smallEnemy = new Enemy(3,1000,random(1,4),100,'image/小飞机爆炸.gif',50,200,34,24,'image/enemy1_fly_1.png');
   		enemys.push(smallEnemy);
   	}
   	mark1=0;
   }

   //获取到敌方飞机数组的长度
   var enemysLength = enemys.length;
   //遍历每一个敌机,向下移动
   for(var i = 0;i<enemysLength;i++){

   		if (!enemys[i].planeIsDie) { //飞机没有死
   			//移动敌方飞机
   			enemys[i].planeMove();
   		}

   		//判断敌机是否移出边界
   		if (enemys[i].imageNode.offsetTop+enemys[i].planeHeight/2>568) {
   			//如果移出边界,则删除敌机
   			mainDiv.removeChild(enemys[i].imageNode);

   			//splice(start,delectCount) 
   			//从start位置删除delectCount数量的元素,并且返回一个新的数组
   			enemys.splice(i,1);
   			enemysLength--;

   		}

   		//当敌机被标记死亡状态时
   		if (enemys[i].planeIsDie) { //飞机已经被打死
   			//模拟敌机过一段时间,才被移除
   			enemys[i].planeDieTimes+=20;
   			if (enemys[i].planeDieTime == enemys[i].planeDieTimes) {
   			//飞机移除
   			mainDiv.removeChild(enemys[i].imageNode);
   			enemys.splice(i,1);
   			enemysLength--;

   			}

   		}

   }

   //4.创建子弹对象
   if (mark1%5==0) {
   	// console.log(selfPlane.imageNode.style.left);
   	//获取子弹的x坐标
   	var bX = parseInt(selfPlane.imageNode.style.left)+30
   	//获取子弹的y坐标
   	var bY = parseInt(selfPlane.imageNode.style.top)-10;
   	//创建子弹对象
   	var b = new AddBullet(bX,bY);
   	var b1 =  new AddBullet(bX-25,bY+15);
   	var b2 =  new AddBullet(bX+25,bY+15);
   	//将子弹对象添加到子弹数组
   	bullets.push(b,b1,b2);
   }

   var bulletsLength = bullets.length;
   for(var i = 0; i<bulletsLength;i++){
   		//子弹发射
   		bullets[i].bulletMove();
   		if (bullets[i].bulletImgNode.offsetTop<0) {
   			//超出边界.移除子弹
   			mainDiv.removeChild(bullets[i].bulletImgNode);
   			bullets.splice(i,1);
   			bulletsLength--;
   		}
   }

   //5.本方飞机碰撞爆炸检测
   for(var i = 0;i<enemysLength;i++){
   		for(var j=0;j<bulletsLength;j++){
   			//碰撞检测,敌机没有死亡
   			if (enemys[i].planeIsDie==false) {
   				//1.本方飞机的碰撞检测
   				//左右碰撞
   				if (enemys[i].imageNode.offsetLeft+enemys[i].planeWidth>=selfPlane.imageNode.offsetLeft
   					&&enemys[i].imageNode.offsetLeft<=selfPlane.imageNode.offsetLeft+selfPlane.planeWidth) {
   					//上下碰撞
   					if (enemys[i].imageNode.offsetTop+enemys[i].planeHeight>=selfPlane.imageNode.offsetTop+40
   						&&enemys[i].imageNode.offsetTop<=selfPlane.imageNode.offsetTop+selfPlane.planeHeight-10){
   						//已经碰撞
   						//(1)修改爆炸图片
   						selfPlane.imageNode.src = 'image/本方飞机爆炸.gif';

   						//(2)移除yidong,bianjie事件
   						if (document.removeEventListener) {
   							mainDiv.removeEventListener('mousemove',yidong);
   							body.removeEventListener('mousemove',bianjie);
   						}else if(document.detachEvent){
   							mainDiv.detachEvent('onmousemove',yidong);
   							body.detachEvent('onmousemove',bianjie);
   						}

   						//(3)停止定时
   						clearInterval(timer);
   						//修改结束盒子的显示样式
   						endDiv.style.display = 'block';
   						//修改一下最后的分数
   						endScore.innerHTML = scores;

   					}
   				}
   			}

   			//判断子弹与敌机的碰撞
   			// hp,score,sudu,dietime,boomimage
   			//左右
   			if (bullets[j].bulletImgNode.offsetLeft+bullets[j].bulletWidth>=enemys[i].imageNode.offsetLeft
   			    &&bullets[j].bulletImgNode.offsetLeft<=enemys[i].imageNode.offsetLeft+enemys[i].planeWidth) { //15 45
   				//上下
   				if (bullets[j].bulletImgNode.offsetTop+bullets[j].bulletHeight>=enemys[i].imageNode.offsetTop
   					&&bullets[j].bulletImgNode.offsetTop<=enemys[i].imageNode.offsetTop+enemys[i].planeHeight) {

   					//敌机的血量 = 敌机的血量-3
   					enemys[i].planeHp -=3;
   					if (enemys[i].planeHp==0) {
   					//(1)修改敌机的爆照图片
   					enemys[i].imageNode.src = enemys[i].planeboomImage /*大,小,中*/;
   					//(2)计分
   					scores = scores+enemys[i].planeScore; /*1000 5000 10000*/
   					//(3)修改一下左上角
   					leftScore.innerHTML = scores;
   					//(4)将敌机标记为死亡
   					enemys[i].planeIsDie = true;

   					}
   				//满足子弹与敌机碰撞 子弹移除
   				mainDiv.removeChild(bullets[j].bulletImgNode);
   				bullets.splice(j,1);
   				bulletsLength--;
   				break;

   			}
   				
   		}
   				
   	  }
   }

}

/*1.当点击开始按钮的时候会执行的方法*/
function begin(){
	// 将开始按钮隐藏,将游戏主界面显示
	// 开始界面div.display = 'none'
	// 游戏主界面div.display = 'block';
	startDiv.style.display = 'none';
	mainDiv.style.display = 'block';

	// 开启定时器
	timer = setInterval(circulation,20);

}
//重新开始游戏
function reAction(){
	// alert(window.location);
	window.location.reload();
}