
var t = "ttt"
function myFunction() {
	document.getElementById("demo").innerHTML = "My first JavaScripte Function";
}

//当您向变量分配文本值时，应该用双引号或单引号包围这个值。
//当您向变量赋的值是数值时，不要使用引号。如果您用引号包围数值，该值会被作为文本来处理。
function variable() {
	var pi = 3.14;
	var name = "Bill Gates";
	var answer = 'Yes I am!';
	document.getElementById("demo").innerHTML = "The price is " + pi;
	//
	var x // x 为 undefined
	var x = 6; // x 为数字
	var x = "Bill"; // x 为字符串

	//字符串，字符串可以是引号中的任意文本。您可以使用单引号或双引号：
	var carname = "Bill Gates";
	var carname = 'Bill Gates';

	//您可以在字符串中使用引号，只要不匹配包围字符串的引号即可：
	var answer = "Nice to meet you!";
	var answer = "He is called 'Bill'";
	var answer = 'He is called "Bill"';

	// 布尔类型
	var x = true
	var y = false

	//数组
	var cars = new Array();
	cars[0] = "Audi";
	cars[1] = "BMW";
	cars[2] = "Volvo";
	//condensed array
	var cars = new Array("Audi", "BMW", "Volvo");
	//literal array
	var cars = [ "Audi", "BMW", "Volvo" ];

	//对象
	//对象由花括号分隔。在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。
	var person = {
		firstname : "Bill",
		lastname : "Gates",
		id : 5566
	};
	//对象属性有两种寻址方式：
	name = person.lastname;
	name = person["lastname"];

	//Undefined 和 Null
	//Undefined 这个值表示变量不含有值。
	//可以通过将变量的值设置为 null 来清空变量。

	cars = null;
	person = null;

	//声明变量类型
	//当您声明新变量时，可以使用关键词 "new" 来声明其类型：
	var carname = new String;
	var x = new Number;
	var y = new Boolean;
	var cars = new Array;
	var person = new Object;

	var text = "ss";
}

function myAlert(string) {
	alert("Hello World!" + t);
}

function connectString(txt1,txt2) {
	var txt = txt1+" "+txt2;
	document.getElementById("string").innerHTML = txt;
	return txt;
}

function condition() {
	//variablename=(condition)?value1:value2
	//如果变量 visitor 中的值是 "PRES"，则向变量 greeting 赋值 "Dear President "，否则赋值 "Dear"。
	greeting=(visitor=="PRES")?"Dear President ":"Dear ";
}
//鼠标事件
function mouseEvent(id) {
	id.innerHTML = "thank you!";
	
}

//onload onunload事件
//onload 和 onunload 事件会在用户进入或离开页面时被触发。
function checkCookies() {
	if (navigator.cookieEnabled == true) {
		alert("Use cookie!");
	}else {
		alert("Not use cookie!");
	}
}

//onchange事件常结合对输入字段的验证来使用。
function upperCase() {
	var text = document.getElementById("upperText");
	text.value = text.value.toUpperCase();
}

//正则表达式 test() 方法检索字符串中的指定值。返回值是 true 或 false。
//compile() 方法用于改变 RegExp。
//compile() 既可以改变检索模式，也可以添加或删除第二个参数。
function express() {
	var patt1 = new RegExp("e");
	patt1.test("The best things in life are free");
	
	var patt1=new RegExp("e");

	document.write(patt1.test("The best things in life are free"));

	patt1.compile("d");

	document.write(patt1.test("The best things in life are free"));
}

//确定浏览器窗口大小
function windowSize() {
	var w=window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var h=window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	
	
	//windows其他方法
//	window.open() - 打开新窗口
//	window.close() - 关闭当前窗口
//	window.moveTo() - 移动当前窗口
//	window.resizeTo() - 调整当前窗口的尺寸
}

