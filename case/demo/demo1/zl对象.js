var demoObj = {}; //object
var toDo = function(){}; //function

var demoObj1 = {
	key : value,
	key2 : value2
}

//JS 数据类型 ： string 、 number 、 boolean 、 object 、 undefined 、null 
// var str = "string";
// var num = 001 ;
// var bl  = true ;
// var un  = undefined ;
// var nl  = null ;
// var obj = { key : value };
// var obj = { A : 1} ;

// var a = obj.A ;

// var obj2 = { B : "str" };

// var obj = { C : true };

var obj = { 
	A : "str",
	B : 001 ,
	C : true ,
	D : function(){
		var a =1;
	},
	init : function (){
		var ab =1
	},
	arr : [],
	obj : {
		a : 1,
		b : false,
		c : undefined,
		d : function(){

		},
	},
	clas : $(".a"),
	ajax : function(){
		var that =this ;
		val = that.B;
		$.ajax({
			url: 'url',
			type: 'GET /POST',
			dataType: 'json',
			data: {
				param1: val ,
			},
		})
		.done(function() {
			console.log("success");
		})
		
	},
	other : this.B
};

obj.init()

obj.clas.on("click" ,function(){
	obj.obj.d();
});

