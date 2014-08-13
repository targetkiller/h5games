
(function(){
	var step=0;
	var max=0;
	var life=10;
	var help=3;
	var diffDom;
	var windowSize={w:$(window).width(),h:$(window).height()};
	var data=[
		["田","甲"],
		["本","夲"],
		["薛","薜"],
		["戌","戍"],
		["鸟","乌"],
		["壿","樽"],
		["茶","荼"],
		["西","酉"],
		["律","津"],
		["兔","免"],
		["夫","天"],
		["办","为"],
		["毐","毒"],
		["赢","羸"],
		["毫","亳"],
		["第","笫"],
		["荥","荣"],
		["市","巿"],
		["宦","宧"],
		["拔","拨"],
		["郄","郗"],
		["竟","竞"],
		["恩","思"],
		["吴","昊"],
		["延","廷"],
		["日","曰"],
		["柬","束"],
		["桶","捅"],
		["槐","愧"],
		["夏","复"],
		["锡","鍚"],
		["壶","壸"],
		["茶","荼"],
		["末","未"],
		["懦","儒"],
		["妺","妹"],
		["杜","社"],
		["钩","钓"],
		["优","忧"],
		["悄","俏"],
		["借","惜"],
		["大","太"],
		["己","已"],
		["幂","幕"]
	];

	var dom=$("#game_area");
	$(document).ready(function(){
		init();
	})


	function windowResize(){
		 windowSize={w:$(window).width(),h:$(window).height()};
		 stageTest();
		 gameStart();
	}
	function init(){
		$(".welcome").show().click(function(){$(this).hide();});
		setTimeout(function(){
			$(".welcome").hide();
		}, 3000);

		$(window).resize(windowResize);
		stageTest();
		gameStart();
	}

	function stageTest(){
		var stepDom="";
		for(var i=0;i<1000;i++){
			stepDom+="<span>口</span>"
		}
		$(".stage").html(stepDom);
		for(var i=100;i<1000;i++){
			var offsetTop=$(".stage span")[i].offsetTop;
			if(offsetTop+30>windowSize.h){
				max=i;
				break;
			}
		}
		$("#game_area .step .step-help").click(function(){
			gameHelp();
		})
	}
	function gameStart(){
		var stepData=data[step];
		$("#game_area .step .step-info").text("第 "+(step+1)+" 关");
		$("#game_area .step .step-life").text("生命 "+life);
		$("#game_area .step .step-help").text("帮助 "+help);
		var stepDom="";
		for(var i=0;i<max;i++){
			stepDom+="<span>"+stepData[0]+"</span>"
		}
		$(".stage").html(stepDom)
		$(".stage span").click(function(){
			$(".stage").addClass("shake");
			life--;
			$("#game_area .step .step-life").text("生命 "+life);
			setTimeout(function(){
				$(".stage").removeClass("shake");
			}, 600);
			if(life==0){
				gameOver();
			}

		})
		var diffIndex=Math.floor(Math.random()*max);
		diffDom=$(".stage span")[diffIndex];
		$(diffDom).text(stepData[1]);
		$("#game_area .step .step-word").text("寻找："+stepData[1]);

		//$(diffDom).css({"color":"#f00"});
		$(diffDom).unbind("click").click(function(){
			tip();
		})
	}

	function tip(){
		if(step>=data.length-1){
			$(".tip .tip-inner").text("通关了，你已超神！！")
			$(".tip").show();
			$(".tip").unbind("click");
			return;
		}
		$(".tip").show();
		$(".tip .tip-inner").html("<span class=\"tip-text\">恭喜你突破</span>第<span class=\"num\">"+(step+1)+"</span>关！<br />有胆挑战下一关！");



		$(".tip").unbind("click").click(function(){
			nextStep();
		});

		
	}
	function gameHelp(){
		if(help<1)return;
		help--;
		$("#game_area .step .step-help").text("帮助 "+help);
		$(diffDom).css({"color":"#FFCB52"});
	}

	function nextStep(){
		$(".tip").hide();
		step++;
		gameStart();
	}

	function gameRestart(){
		life=10;
		step=0;
		help=3;
		$(".tip").hide();
		gameStart();
	}

	function gameOver(){
		$(".tip").show();
		$(".tip .num").text(step+1);
		$(".tip .tip-inner").html("当前记录：第<span class=\"num\">"+(step+1)+"</span>关<Br />GAME OVER");
		$(".tip").unbind("click").click(function(){
			gameRestart();
		});
	}


		var imgUrl = "http://m.isux.us/qz-act/test/w/img.jpg";
        var lineLink = "http://m.isux.us/qz-act/test/w/index.html";
        var descContent = '';
        var shareTitle = '史上最无聊的游戏，没有之一！';
        var appid = '';
         
        function shareFriend() {
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid": appid,
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);
            })
        }
        function shareTimeline() {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                   //_report('timeline', res.err_msg);
            });
        }
        function shareWeibo() {
            WeixinJSBridge.invoke('shareWeibo',{
                "content": descContent,
                "url": lineLink,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        }
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                shareTimeline();
            });
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                shareWeibo();
            });
        }, false);




})()




























