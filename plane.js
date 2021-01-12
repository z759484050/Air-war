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

	console.log(selfPlaneX,selfPlaneY);

	// 设置本方飞机图片节点元素的坐标
	ourPlane.style.left = selfPlaneX-500-selfPlane.planeWidth/2+'px';
	ourPlane.style.top = selfPlaneY-selfPlane.planeHeight/2+'px';

}
// 添加移动事件(mainDiv)
if (mainDiv.addEventListener) {
	mainDiv.addEventListener('mousemove',yidong);
}else if(mainDiv.attachEvent){
	mainDiv.attachEvent('onmousemove',yidong);
}



/*1.当点击开始按钮的时候会执行的方法*/
function begin(){
	// 将开始按钮隐藏,将游戏主界面显示
	// 开始界面div.display = 'none'
	// 游戏主界面div.display = 'block';
	startDiv.style.display = 'none';
	mainDiv.style.display = 'block';
}