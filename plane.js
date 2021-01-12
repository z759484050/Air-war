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

/*声明我方飞机的函数*/
function OurPlane(x,y){
	// call()函数用于调用Plan函数,它会将当前对象传到Plan函数中使用
	Plane.call(this,x,y,66,80,'image/我的飞机.gif');

}

// 我方飞机函数创建
var selfPlane = new OurPlane(127,480);
console.log(mainDiv);

/*1.当点击开始按钮的时候会执行的方法*/
function begin(){
	// 将开始按钮隐藏,将游戏主界面显示
	// 开始界面div.display = 'none'
	// 游戏主界面div.display = 'block';
	startDiv.style.display = 'none';
	mainDiv.style.display = 'block';
}