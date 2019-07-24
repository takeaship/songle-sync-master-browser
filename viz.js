// 再生したいメディアを指定
const media_url = "https://www.youtube.com/watch?v=eVwdeIDjXeM";
let player;
// APIの準備が出来ると呼ばれる
window.onSongleWidgetAPIReady = function (SongleWidgetAPI) {
	window.SW = SongleWidgetAPI;
	SW.System.defaultEndpointWebClientProtocol = "https:";
	init();
}

window.init = function () {
	player = new SW.Player({
		mediaElement: "div#widget" // プレイヤーを埋め込むDOMを指定
	});
	player.accessToken = window.accessToken;
	player.secretToken = window.secretToken;
	// 再生するメディアをセット
	player.useMedia(media_url);
	// slaveを同期させるプラグインを設定
	player.addPlugin(new SW.Plugin.SongleSync());

	// 利用するイベントのプラグインを設定
	player.addPlugin(new SW.Plugin.Beat());
	player.addPlugin(new SW.Plugin.Chorus());
	player.addPlugin(new SW.Plugin.Chord());

	// 各イベントに対応するアクションを設定
	setBeatEvent();
	setChordEvent();
	setChorusEvent();

	// mediaReadyで動画が準備完了したら実行
	player.on("mediaReady", function () {
		// プレイヤー操作ボタン設定	
		setPlayerCtrl();
		// 自動再生
		setTimeout(function () {
			player.play();
			player.seekTo(108000);
		}, 1000);
	})
}

// プレイヤー操作ボタン設定
window.setPlayerCtrl = function () {
	// 再生
	$("#widget_ctrl .play").click(function () {
		player.play();
		player.seekTo(109700);
	});
	// 停止
	$("#widget_ctrl .pause").click(function () {
		player.pause();
	});
	// 先頭
	$("#widget_ctrl .head").click(function () {
		player.seekTo(0);
	});
	// サビ出し
	$("#widget_ctrl .seekto_chorus").click(function () {
		player.seekToNextChorusSectionItem()
	});
	$("#widget_ctrl").css({ display: "table" });
	$(".memo").show();
}

// ビートでタイルの色を変える（cssで指定）
window.setBeatEvent = function () {
	player.on("beatEnter", function (e) {
		for (let i = 1; i <= 4; i++) {
			li = $("#beats li.b" + i)
			if (e.data.beat.position == i) {
				li.addClass("current");
			} else {
				li.removeClass("current");
			}
		}
	});
}

// コード左上に表示する
window.setChordEvent = function () {
	player.on("chordEnter", function (e) {
		if (e.data.chord.name != "N") {
			$("#chord").text(e.data.chord.name);
		} else {
			$("#chord").text("");
		}
	});
}

// サビはビートの色を変更(cssで指定)し、右上に「サビ」と表示させる
window.setChorusEvent = function () {
	player.on("chorusSectionEnter", function (e) {
		$("#beats").addClass("chorus");
		$("#chorus_alert").show();
	});
	player.on("chorusSectionLeave", function (e) {
		$("#beats").removeClass("chorus");
		$("#chorus_alert").hide();
	});
}

// URLの引数を取得する関数
window.getUrlVars = function () {
	let i, key, keySearch, len, p, param, val, vars;
	vars = {};
	param = location.search.substring(1).split('&');
	for (i = 0, len = param.length; i < len; i++) {
		p = param[i];
		keySearch = p.search(/=/);
		key = '';
		if (keySearch !== -1) {
			key = p.slice(0, keySearch);
			val = p.slice(p.indexOf('=', 0) + 1);
			if (key !== '') {
				vars[key] = decodeURI(val);
			}
		}
	}
	return vars;
}
