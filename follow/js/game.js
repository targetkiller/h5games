/*
 * @author:tqtan;
 * @organize:托尼托尼研究所;
 * @game:点点点;
 * @time:2014/8/11;
 */

var score = 0;
var totalTime = 15;
var time = totalTime;
var time_cut = 0.01;
var lastTime = 500;
var occurTime = 350;
var num = $('.block').length;
var timeInter;
var startInter;

$('.start').bind('tap',function(event) {
	startGame();
});


$('.again').bind('tap',function(event) {
	time = totalTime;
	score = 0;
	$('.time-wrap').removeClass('hide');
	$('.result-wrap').addClass('hide');
	updateTime();
	updateScore();
	startGame();
});

$('.share-btn').bind('tap',function(event) {
	$('.share-wrap').removeClass('hide');
});

$('.cancel-btn').bind('tap',function(event) {
	$('.share-wrap').addClass('hide');
});

$('.go-btn').bind('tap',function(event) {
	$('.start-wrap').addClass('hide');
});

function startGame(){
	$('.start').addClass('hide');
	$('#score').removeClass('hide');

	// 开启时间计时器
	timeInter = setInterval(function(){
		if(time < 8 && time > 3){
			occurTime = 250;
		}
		else if(time < 3 && time > 0){
			$('#loader').css('background-color','red');
			if(navigator.vibrate){
				navigator.vibrate(3000);
			}
		}
		else if(time < 0){
			gameover();
		}
		time -= time_cut;
		updateTime();

	},10);

	// 开始格子变动计时器
	startInter = setInterval(function(){
		var $this = $('.block').eq(ran());
		$this.addClass('first');
		setTimeout(function(){$this.removeClass('first')},lastTime);
	},occurTime);
}

function gameover(){
	$('.time-wrap').addClass('hide');
	clearInterval(timeInter);
	clearInterval(startInter);
	$('#result-score').text(score);
	$('#result-percent').text(getPercent());
	$('.result-wrap').removeClass('hide');

	var shareMsg = '我在游戏<follow>中得了'+score+'分，打败了全国“'+getPercent()+'”的人，骚年不服来战？';
	shareInfo.shareTitle = shareMsg;
}

function getPercent(){
	var per = '0%';
	if(score > 40){per = '100%';}
	else if(score > 35){per = '95%';}
	else if(score > 30){per = '90%';}
	else if(score > 25){per = '85%';}
	else if(score > 20){per = '60%';}
	else if(score > 15){per = '40%';}
	else if(score > 10){per = '30%';}
	else if(score > 5){per = '12%';}
	else if(score > 0){per = '1%';}

	return per;
}

function ran(){
	return parseInt(Math.random()*num+1/num);
}

function updateTime(){
	$('#time').text(time.toFixed(2));
	$('#loader').width((time/totalTime)*100+'%');
}

function updateScore(){
	$('#score').text(score);
}

$('.block').on('touchstart',function(){
	var $this = $(this);
	if($(this).hasClass('first')){
		$(this).addClass('second');
		score++;
		updateScore();
	}
	setTimeout(function(){$this.removeClass('second')},lastTime);
});

/* 分享功能 */
var shareInfo = {
	appid: '',
    imgUrl: 'http://qzonestyle.gtimg.cn/aoi/sola/20131230112721_zNDSJlJLeB.jpg',
    lineLink: 'http://m.isux.us/follow/index.html',
	descContent: '你能抓住多少个格子？有能力来试试！',
	shareTitle: '决战15秒，看谁的手指更快！'
}
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": shareInfo.appid,
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
           //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": shareInfo.descContent,
        "url": shareInfo.lineLink,
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