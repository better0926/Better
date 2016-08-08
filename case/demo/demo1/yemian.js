$(function(){
	var $add_close = $(".alert-add-close");
	var $modal_backdrop = $(".modal-backdrop");
	var $check_tit = $(".check-tit");
	var $section_item_sec = $(".section-item-sec");
	var $currentLi = $(".check-list li");
	var $section_item = $(".section-item");
	var $submit_btn = $(".submit-btn");
	var $midbox_wrapper = $(".midbox-wrapper");
	var $add_ipt = $("#add-ipt").val();
	var $iframeAtrr = $("#frame_r");
	var modalHidefn = function(){
		$(".modal").fadeOut(0);
	}

	function ajaxWrap(ajaxData, callback) {
		if (!ajaxData.data) ajaxData.data = {};
		$.extend(ajaxData.data);
		$.ajax(ajaxData).done(function (data) {
			callback(data);
		});
	};
	/*========== 遮罩层Object ↓↓ ==========*/
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

	var addyemiantcobj = {
		section_add: $(".section-add"),
		alert_add : $(".alert-add"),
		int : function(){
			$modal_backdrop.show();
			addyemiantcobj.alert_add.fadeIn(300);
		},
	};

	/*========== 点击弹出添加页面窗口 ↓↓ ==========*/
	addyemiantcobj.section_add.on("click",function(){
		addyemiantcobj.int();
	});

	/*========== 关闭添加页面窗口 ↓↓ ==========*/
	$add_close.on("click",function(){
		that = $(this);
		$modal_backdrop.hide();
		that.parent().fadeOut(300)
	});

	/*========== 点击显示模型目录 ↓↓ ==========*/
	$(".midbox-wrapper").on("click", ".check-tit" , function(){
		var $this = $(this);
		var $section_item_sec = $(".section-item-sec");
		var $section_item = $(".section-item");
		var $webId =  $this.closest($section_item).children(".section-no").html();
		var oSiblings = $this.closest($section_item).next($section_item_sec);
		oSiblings.toggleClass('item-hide');
		$iframeAtrr.attr("src","modify?id="+$webId+"&page=1&sorting=id&desc=DESC");
		console.log($webId)
	});

	/*========== 双击模型目录可编辑 ↓↓ ==========*/
	$midbox_wrapper.on("dblclick", ".check-list li" , function() {
		var $this = $(this).find('input');
		$this.removeAttr('disabled').css("background","#fff");
	});
	$midbox_wrapper.on("blur",".model" , function() {
		$(this).attr('disabled', 'disabled').css("background","transparent");
	});

	/*========== 双击三级目录可编辑 ↓↓ ==========*/
	$midbox_wrapper.on("dblclick", ".lev-three" ,".lev-inp" ,function() {$midbox_wrapper
		var $this = $(this).find('input');
		$this.removeAttr('disabled').css("background","#fff");
	});
	$midbox_wrapper.on("blur", ".lev-three" ,".lev-inp" ,function() {
		var $this = $(this).find('input');
		$this.attr('disabled', 'disabled').css("background","transparent");
	});

	/*========== 当前状态 ↓↓ ==========*/
	$(".check-list").on("click" ,".check-item", function(){
		var that = $(this);
		that.addClass("current").siblings().removeClass("current");
		var thisIptVal = that.find('.model-value').val();
		var thisTypeVal = that.find('.type-value').val();
		$iframeAtrr.attr("src","../app-model/modify?id="+thisIptVal+"&type="+thisTypeVal);
	});

	$(".midbox-wrapper").on("click" , '.model-sort' ,function(){
		var $this = $(this);
		$this.closest(".check-item").nextAll(".hidebox").toggleClass('lev-hide');
	})
	/*========== 获取左侧页面结构和样式 ↓↓ ==========*/
	var toCloneObj = {
		nIndex : 0,
		oIndex : 0,
		liIdex : 0,
		selTypeid : 0,
		oMidBox : $(".midbox-wrapper"),
		oCheckList : $(".check-list"),
		hidebox : $(".hidebox "),
		fnWriteHtml : function(nIndex,titval,isShow){
			var that = this;
			var oMidBox = that.oMidBox;
			var nIndex = nIndex;
			var isShow = isShow;
			this.CloneWrap = $('<div></div>',{class:'main-wrapper'}).appendTo(oMidBox);
			this.sectionItem = $('<div></div>',{class:'section-item inline-wrap'}).prependTo(this.CloneWrap);
			this.sectionItemSec = $('<div></div>',{class:'section-item-sec'}).appendTo(this.CloneWrap);
			this.checkList = $('<ul></ul>',{class:'check-list'}).appendTo(this.sectionItemSec);
			this.sectionNo = $('<div></div>',{class:"section-no inline-box"}).appendTo(this.sectionItem);
			this.sectionTit = $('<div></div>',{class:"section-title inline-box"}).appendTo(this.sectionItem);
			this.sectionBtn = $('<div></div>',{class:'section-btn inline-box clearfix'}).appendTo(this.sectionItem);
			this.sectionCheck = $('<div></div>',{class:"section-check clearfix"}).appendTo(this.sectionTit)
			this.checkTit = $('<span></span>',{class:'check-tit'}).appendTo(this.sectionCheck)
			this.checkBox = $('<div></div>',{class:'checkbox'}).appendTo(this.sectionCheck);
			if(isShow == 1 ){
				//this.iptCheck = $('<input type="checkbox" id="checko_'+nIndex+'" checked>').appendTo(this.checkBox);
				this.iptCheck = $('<a href="show?id='+nIndex+'&isShow='+isShow+'"><strong style="color: #58d68d;margin: 5px;font-size: 14px;">展现</strong></a>').appendTo(this.checkBox);
			}else{
				//this.iptCheck = $('<input type="checkbox" id="checko_'+nIndex+'">').appendTo(this.checkBox);
				this.iptCheck = $('<a href="show?id='+nIndex+'&isShow='+isShow+'"><span style="color: red;font-size: 14px;">不展现</span></a>').appendTo(this.checkBox);
			}
			//this.iptLabel = $('<label for="checko_'+nIndex+'">').appendTo(this.checkBox);
			this.secBtnImg = $('<span></span>',{class:"add-modle-btn fr"}).appendTo(this.sectionBtn);
			this.secBtnImg = $('<a href="del?id='+nIndex+'" class="sc" style="float: right;margin: 10px;"><img src="../assets/images/sc.png" alt="删除"/></a>').appendTo(this.sectionBtn);

			this.sectionNo.text(nIndex);
			this.checkTit.text(titval);
		},
		fnwritemodel : function(){
			var that = this;
			var oCheckList = $(".main-wrapper").eq(that.oIndex-1).find(".check-list");
			var $selTypeid = that.selTypeid;
			this.Clonechild= $('<li></li>',{class:'check-item clearfix'}).appendTo(oCheckList);
			//this.iptBox = $('<div></div>',{class:'iptbox'}).appendTo(this.Clonechild)
			this.modelInput = $('<input type="text" disabled="disabled" value="新增模型" class="model fl">').appendTo(this.Clonechild);
			this.hideInput = $('<input type="hidden" class="model-value" value='+$selTypeid+'>').appendTo(this.Clonechild);
			this.hideDate = $('<input type="hidden" class="model-date" value = "">').appendTo(this.Clonechild)
			this.modelSort = $('<span></span>',{class:'model-sort fl'}).appendTo(this.Clonechild);
		},
		fnlevthree : function(){
			var that = this;
			var oCheckList = $(".main-wrapper").eq(that.oIndex-1).find(".check-list");
			console.log(that.oIndex);
			this.hideBox = $('<div></div>',{class:'hidebox'}).appendTo(oCheckList);
			this.levThree = $('<div></div>',{class:'lev-three cu'}).appendTo(this.hideBox);
			this.levInp = $('<input class="model lev-inp fl" type="text" disabled="disabled" value="新增三级类目">').appendTo(this.levThree);
		}
	};

	/*========== 添加三级目录lev-add  ↓↓ ==========*/
	$midbox_wrapper.on("click" ,".lev-add",function() {
		var $this = $(this);
		var $rightWin = window.confirm("确定添加？");
		toCloneObj.liIdex = $this.closest(".check-item").index();
		if($rightWin == true){
			toCloneObj.fnlevthree();
		}else{
			return false;
		}
	});

	// 三级目录当前状态
	$(".hidebox").on("click" ,".lev-three" ,".lev-inp" ,function(){
		var $this = $(this);
		$this.addClass("current").siblings().removeClass('current')
	})

	$(".midbox-wrapper").on("click",".add-modle-btn",function(){
		var $this = $(this);
		toCloneObj.oIndex = $this.closest(".main-wrapper").index();
	})

	/*========== 确认添加页面，追加到左侧显示栏中 ↓↓ ==========*/
	$submit_btn.click(function() {
		var titval = $("#add-ipt-alert").val();
		var isShow = $("input[name='add-name-radio']:checked").val();
		ajaxWrap({
			url : "api-add",
			type : "get",
			dataType : "json" ,
			data : {
				name : titval,
				isShow : isShow
			}
		},function(data){
			if(data.code == "2000"){
				var nIndex = data.data.id;
				toCloneObj.fnWriteHtml(nIndex,titval,isShow);
			}else{
				alert(" 添加失败")
			}
		})
		addyemiantcobj.alert_add.hide();
		$modal_backdrop.hide();

	});

	/*========== 显示/关闭添加模型窗口 ↓↓ ==========*/
	$midbox_wrapper.on('click', '.add-modle-btn', function(){
		fullscreenObj.fullscreenShow();
		$(".modal").fadeIn(0);
	});

	/*========== 关闭添加模型弹窗 ↓↓ ==========*/
	$(".close").click(function(){
		fullscreenObj.fullscreenHide();
		modalHidefn()
	});

	/*========== 单击调转新页面 ↓↓ ==========*/
	$(".modal").on("click" , ".btn-primary" ,function(){
		var $selTypeid = $(".form-control option:selected").val();
		var mydate = new Date();
		var mytime=mydate.toLocaleString();
		toCloneObj.selTypeid = $selTypeid;
		toCloneObj.fnwritemodel();
		$iframeAtrr.attr("src","http://ymht.houtai.com/app-model/type?type="+$selTypeid+"");
		fullscreenObj.fullscreenHide();
		modalHidefn();
		return false;
	});

	/*========== 单击删除，左侧菜单栏中删除对应的节点 ↓↓ ==========*/
	var delYemianObj = {
		showDelyemianfn : function(){
			fullscreenObj.fullscreenShow();//显示弹层
			$(".alert-del").fadeIn(300); //显示操作弹窗
		},
		hideDelyemianfn : function(){
			fullscreenObj.fullscreenHide();//隐藏弹层
			$(".alert-del").fadeOut(300); //隐藏操作弹窗
		}
	};

	/*========== 单击按钮删除按钮del ↓↓ ==========*/
	var $oParent = null;
	var $numIndex = 0;
	var $oMidBox = $(".midbox-wrapper");
	$midbox_wrapper.on("click", ".del-btn", function(){
		$oParent = $(this).closest(".main-wrapper");
		delYemianObj.showDelyemianfn();
	});

	/*========== 弹窗取消删除 ↓↓ ==========*/
	$(".cancel-btn").click(function(){
		delYemianObj.hideDelyemianfn();
	});

	/*========== 单击弹窗确认删除按钮 ↓↓ ==========*/
	$(".submit-confirm-btn").click(function(){
		var $this = $(this);
		delYemianObj.hideDelyemianfn();
		$oParent.remove();
		$('.main-wrapper .section-no.inline-box').each(function(i){
			$(this).html(i+1);
		});
	});

	/*========== drag拖动模型名称排序 ↓↓ ==========*/
	/*$('.section-item-sec').on('mousedown',".check-list li",function(ev){
	 var oldTop=$(this).offset().top;
	 var iH=$(this).height();
	 var $this=$(this);
	 document.onmousemove=function(ev){
	 var clientY=ev.pageY+$(document).scrollTop();
	 if(clientY>oldTop){
	 if(clientY>oldTop+iH+iH/2){
	 $this.next().insertBefore($this)
	 oldTop=$this.offset().top;
	 }
	 }else{
	 if(clientY<oldTop-iH/2){
	 $this.prev().insertAfter($this);
	 oldTop=$this.offset().top;
	 }
	 }
	 }
	 document.onmouseup=function(){
	 document.onmousemove=null;
	 document.onmouseup=null;
	 }
	 //return false;
	 });*/
});	

