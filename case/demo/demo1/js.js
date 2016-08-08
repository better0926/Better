// JavaScript Document
$(function(){
	$(".tr").mouseover(function(){
		$(this).css({"background":"#fff7d0"})
	})
	$(".tr").mouseout(function(){
		$(this).css({"background":"#fff"})
	})
	/*=============模型type8点击上传图片 ↓↓=========*/
	var $Add_pic = $(".add_btn.add-pic");
	var fullscreenObj = {
		$modal_backdrop :  $(".modal-backdrop"),
		fullscreenShow : function(){
			var $modal_backdrop = this.$modal_backdrop;
			$modal_backdrop.show();
		},
		fullscreenHide : function(){
			var $modal_backdrop = this.$modal_backdrop;
			$modal_backdrop.hide();
		}
	};
	var tanchuangObj = {
		$addPicAlert : $(".add-pic-alert"),
		$closeAddPic : $(".close-add-pic"),
		$brands_alert : $(".brands-alert"),
		$brands_add : $(".brands-add"),
		$alert_close : $(".alert-close"),
		$checked_all : $(".checked-all"),
	}
	//显示添加图片窗口
	$Add_pic.on("click",function(){
		fullscreenObj.fullscreenShow();
		tanchuangObj.$addPicAlert.fadeIn(300);
		//关闭弹窗
		tanchuangObj.$closeAddPic.on("click", function(){
			fullscreenObj.fullscreenHide();
			tanchuangObj.$addPicAlert.fadeOut(300);
		})
	});

	/*=============品牌筛选，添加更多品牌 ↓↓=========*/

	tanchuangObj.$brands_add.on("click", function(){
		fullscreenObj.fullscreenShow();
		tanchuangObj.$brands_alert.fadeIn(300);

	});
	//关闭弹窗
	tanchuangObj.$alert_close.on("click", function(){
		fullscreenObj.fullscreenHide();
		tanchuangObj.$brands_alert.fadeOut(300);
	})	

		//关闭弹窗
		tanchuangObj.$alert_close.on("click", function(){
			fullscreenObj.fullscreenHide();
			tanchuangObj.$brands_alert.fadeOut(300);
		})
	});

	//全选\反选
	var $all = $("#checked-all");
	$(".checkall").on("click","#checked-all",".checked-all",function(){
		if($all.prop('checked')){
			$(".check-ipnt input").each(function(index, el) {
				$(".check-ipnt input").prop('checked', $all.prop('checked'))
			});
		}else{
			$(".check-ipnt input").each(function(index, el) {
				$(".check-ipnt input").prop('checked', false)
			})
		}
	});

	//如果全选后，再点击下面的复选框input，将自动清除全选
	$(".check-ipnt").on('click',"input",".label-ck" , function(){
		var CheckedLength = $("input[type='checkbox']:checked").length;
		var CheckboxLength = $(".check-ipnt input").length;
		if(CheckedLength<CheckboxLength+1){
			$("#checked-all").prop('checked', false);
		}else{
			$("#checked-all").prop('checked', true);
		}
	});

	//品牌实时搜索
	$(".inputtxt").keyup(function(){     //键盘按键弹起时执行
		var index = $.trim($('#index').val().toString()); //去掉两头空格
		if(index == ''){
			$('.check-ipnt label').removeClass('on');
			return false;
		}
		var parent = $('.check-ipnt');
		$('.check-ipnt label').removeClass('on');
		$(".check-ipnt label:contains('" + index + "')").addClass('on');//选择包含文本框值的所有加上focus类样式
		$(".check-ipnt label:contains('" + index.toLowerCase() + "')").addClass('on');
		$(".check-ipnt label:contains('" + index.toUpperCase() + "')").addClass('on');
	})
	//品牌添加commit
	$(".commit").on("click" , function(){
		var $this = $(this);
		var $commit = $this.closest('.brands-alert');
		var $removeInp = $commit.siblings('.brands-checked-wrap').find(".check-wrap");
		var $checkedArray = $this.closest(".bottombox").siblings('.check-ipnt').find('input:checked + label');
		var brands_checked_box = $removeInp.children('input[type="checkbox"]');
		var check_label = $removeInp.children('label');
		$(check_label).hide();
		$checkedArray.each(function(){
			$(check_label).filter(':contains('+$.trim($(this).text())+')').css('display', 'inline-block').prop('checked', true);
		});
		fullscreenObj.fullscreenHide();
		tanchuangObj.$brands_alert.fadeOut(0);
	});


	$(".brands-alert").keydown(function() {
		if (event.keyCode == "13") {  //回车键
			$('.commit').click();
		}
	});

	$(".tijiao").keydown(function() {
		if (event.keyCode == "13") {  //回车键
			return false;  //禁止回车提交表单
		}
	})

	/*=============商品推荐 批量选择操作 ↓↓=========*/

	//商品全选\反选
	var $goodsall = $("#goodscheck-all");
	$('.goods-all').on('click' , '#goodscheck-all' ,'.goodscheck-all' ,function(){

		$(".goods-cont input[name='test']").each(function(index, el) {
			$(".goods-cont input[name='test']").prop('checked' , $goodsall.prop('checked'))

		//var checkIdArray = [];
		$(".goods-cont input[name='test']").each(function(index, el) {
			$(".goods-cont input[name='test']").prop('checked' , $goodsall.prop('checked'))
			//checkIdArray.push($(".goods-number").html())
		});

	})
	//如果全选后，再点击下面的复选框input，将自动清除全选
	$(".goods-cont").on('click' , 'input' ,function(){
		var CheckedLength = $("input[name='test']:checked").length;
		var CheckboxLength = $(".goods-cont input").length;
		if(CheckedLength<CheckboxLength){
			$("#goodscheck-all").prop('checked', false);
		}else{
			$("#goodscheck-all").prop('checked', true);
		}
	})

	//批量更新
	/*var checkedObj = {
	 array : [],
	 }
	 $(".goods-cont").on("click", ".goods-check" ,function(){
	 var $this = $(this);
	 if($this.prop("checked")){
	 var $goodsId = $this.closest(".goods-cont").siblings(".goods-number").html();
	 checkedObj.array.push($goodsId);
	 };
	})*/

	//批量更新

/*	$(".batch-update").on("click",function(){
		var $goodsIpt = $(".goods-check");
		var $goodsNum = $(".goods-number");
		var array = [];
		for(var i = 0 ; i < $goodsIpt.length ; i++){
			var $goodsArray = $($goodsIpt[i]);
			if($goodsArray.prop('checked')){
				array.push($($goodsNum[i]).html())
			}
		};
		$.unique(array);//数组去重
	});*/

	//批量删除
	$('.batch-del').on("click" , function(){
		var $goodsIpt = $(".goods-check");
		var $goodsNum = $(".goods-number");
		var array = [];
		for(var i = 0 ; i < $goodsIpt.length ; i++){
			var $goodsArray = $($goodsIpt[i]);
			if($goodsArray.prop('checked')){
				array.push($($goodsNum[i]).html())
			}
		};
		$.unique(array);//数组去重
	})
	
	//批量修改
	$('.rightbtn').on('click' ,function(){
		var $goodsIpt = $(".goods-check");
		var $goodsall = $("#goodscheck-all");
		var $goodsNum = $(".goods-number");//商品号
		var $selTypeid = $(".form-wrap option:selected").val();//选中的option中的val
		var $selIndex = $('.form-wrap option:selected').index();
		$(".iptinfo").attr({"placeholder":"请输入0（不展现）或1（展现）"});
		$('.closewindow').on('click' ,function(){
			fullscreenObj.fullscreenHide();
			$('.modal').hide();
		})
	})

	//获取select中的值
	$('.form-wrap').click(function(){
		var $selIndex = $('.form-wrap option:selected').index();
		if($selIndex==0){
			$(".iptinfo").attr({"placeholder":"请输入0（不展现）或1（展现）"});
		}
		if($selIndex==1){
			$(".iptinfo").attr({"placeholder":"请输入排序号（1-10）"});
		}
		if($selIndex==2){
			$(".iptinfo").attr({"placeholder":"请输入品牌名称"});
		}
		if($selIndex==3){
			$(".iptinfo").attr({"placeholder":"请输入品牌Id（必须是整数）"});
		}
		if($selIndex==4){
			$(".iptinfo").attr({"placeholder":"请输入性别"});
		}
		if($selIndex==5){
			$(".iptinfo").attr({"placeholder":"请输入折扣（必须是整数）"});
		}
		if($selIndex==6){
			$(".iptinfo").attr({"placeholder":"请输入标签"});
		}
		if($selIndex==7){
			$(".iptinfo").attr({"placeholder":"请输入类目Id（必须是整数）"});
		}
		if($selIndex==8){
			$(".iptinfo").attr({"placeholder":"请输入类目名称"});
		}
	});
	//批量修改
	$('.rightbtn').on('click' ,function(){
		var $goodsIpt = $(".goods-check");
		var $goodsNum = $(".goods-number");//商品号
		var $selTypeid = $(".form-wrap option:selected").val();//选中的option中的val
		var $selIndex = $('.form-wrap option:selected').index();
		var $ipttxt = $(".iptinfo").val();//input输入内容
		var array = [];
		var jsonData = {};
		for(var i = 0 ; i < $goodsIpt.length ; i++){
			var $goodsArray = $($goodsIpt[i]);
			if($goodsArray.prop('checked')){
				array.push($($goodsNum[i]).html())
			}
		};
		if(array.length == 0){
			alert('对不起，您还未选择商品，请选中商品再试！');
			return ;
		}
		if($ipttxt.length == 0){
			alert('对不起，您还未输入内容！');
			return ;
		}
		$.unique(array);//数组去重
		jsonData = JSON.stringify({"goodsNum":array,"selTypeid":$selTypeid,"ipttxt":$ipttxt});
		window.location.href="batch-operation?batch="+jsonData;
		fullscreenObj.fullscreenHide();
		$('.modal').hide();
		$goodsIpt.prop("checked",false);//清除选中
		$goodsall.prop("checked",false);//清除全选
		$(".iptinfo").val("")//清除input中文本
	})

	//rightbtn绑定回车事件
	$("body").keydown(function() {
		if (event.keyCode == "13") {
			$('.rightbtn').click();
		}
	});
});