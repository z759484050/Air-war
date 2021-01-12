// 获取到开始界面元素
var startDiv = document.getElementById('startDiv');
// 获取游戏主界面元素
var mainDiv = document.getElementById('mainDiv');


/*2.声明创建飞机构造函数*/
function Plane(x,y,width,height,imageSrc){
	//我的飞机设置属性
	this.planeX = x;
	this.planeY = y;
	this.planeWidth = width;
	this.planeHeight = height;

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

}

/*3.声明我方飞机的函数*/
function OurPlane(x,y){
	// call()函数用于调用Plan函数,它会将当前对象传到Plan函数中使用
	Plane.call(this,x,y,66,80,'image/我的飞机.gif');
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
// 添加移动事件(mainDiv)
//获取body
var body = document.getElementsByTagName('body')[0];
if (document.addEventListener) {
	// 1.首先要获取到body
	// 2.给body添加移动事件,执行检测边界的行为
	mainDiv.addEventListener('mousemove',yidong);
	body.addEventListener('mousemove',bianjie);
}else if(mainDiv.attachEvent){
	mainDiv.attachEvent('onmousemove',yidong);
	body.attachEvent('onmousemove',bianjie);
}

// 产生最小值到最大值的随机数
function random(min,max){ //1  5
	return Math.floor(Math.random()*(max-min)+min);
}
// 声明敌方飞机创建函数
function Enemy(a,b,width,height,imageSrc){
	var r = random(a,b); //23 274
	// console.log(r);
	Plane.call(this,r,50,width,height,imageSrc);
}


var mark1 = 0; //标记什么时候开始创建敌机
var mark2 = 0;  //标记什么时候创建什么类型的飞机
var bgPositionY = 0;

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
   // 
   mark1++;
   if (mark1 == 50) { //1000毫秒创建敌机
   	mark2++;
   	if (mark2%5==0) { //创建中型飞机
   		new Enemy(23,274,46,60,'image/enemy3_fly_1.png');
   	}
   	if (mark2%20==0) { //创建大型飞机

   		new Enemy(55,210,110,164,'image/enemy2_fly_1.png');
   	}else{ //创建小型飞机
   		new Enemy(50,200,34,24,'image/enemy1_fly_1.png');
   	}
   	mark1=0;
   };
 
   






}

/*1.当点击开始按钮的时候会执行的方法*/
function begin(){
	// 将开始按钮隐藏,将游戏主界面显示
	// 开始界面div.display = 'none'
	// 游戏主界面div.display = 'block';
	startDiv.style.display = 'none';
	mainDiv.style.display = 'block';

	// 开启定时器
	setInterval(circulation,20);

}