/**
 * WebSocket 接收数据的顺序和会发送的顺序保持一致
 * 可能同时发送多个请求，但是接收到的 response 会和发送的一致
 *
 */
var NetConnect;
(function (NetConnect) {
    var httpRequest = null;
    var window;
    var url = "http://ggsporestudio.com/";
    // var url = "http://httpbin.org/post";
    //保存数据，发送的时候做md5加密
    var token;
    //是否打开了http请求
    var isOpen = 0;
    //记录发送的请求
    var msg_list = [];
    //每条请求的回调
    var action_map = {};
    function init(msg) {
        if (isOpen == 1 || httpRequest) {
            return;
        }
        //新建http请求
        httpRequest = new egret.HttpRequest();
        //设置数据格式为文本
        httpRequest.responseType = egret.HttpResponseType.TEXT;
        //打开一个为GET的http请求
        httpRequest.open(url, egret.HttpMethod.POST);
        _send(msg);
        //设置响应头
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //加载完成，通过事件的respond属性获取返回的信息
        httpRequest.addEventListener(egret.Event.COMPLETE, onPostComplete, NetConnect);
        //加载失败
        httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, NetConnect);
        //加载进度
        httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, onPostProgress, NetConnect);
        //关闭http请求
        httpRequest.addEventListener(egret.Event.CLOSE, onPostClose, NetConnect);
    }
    function send(act_id, data, callBack) {
        // token = new md5().hex_md5(token);
        if (action_map[act_id]) {
            Common.log("repeat request 重复请求");
            return;
        }
        var msg = dataProcess(act_id, data);
        action_map[act_id] = callBack;
        if (isOpen == 0) {
            // msg_list.push(msg)
            init(msg);
        }
        else {
            _send(msg);
        }
    }
    NetConnect.send = send;
    function _send(msg) {
        httpRequest.send(msg);
    }
    //发送请求前的数据处理
    function dataProcess(act_id, data) {
        var msg;
        var time = Math.floor(new Date().getTime() / 1000);
        var token = "channel=9166&appid=1112169032&time=" + time + "&uid=33330379e0b1e31e4a5d8d7fee224168bc";
        token = new md5().hex_md5(token);
        Common.log("token----->", token);
        msg = data + "&sign=" + token;
        // var msg = window["pack"](data);
        return msg;
    }
    //打开http请求回调
    function onPostOpen() {
        Common.log("open");
        isOpen = 1;
        for (var i = 0; i < msg_list.length; i++) {
            _send(msg_list[i]);
            delete msg_list[i];
        }
    }
    //请求加载完成
    function onPostComplete(event) {
        var request = event.currentTarget;
        Common.log(request.response);
        // let act_id = window["unpack"](request.response);
        // if (act_id && action_map[act_id]) {
        //     action_map[act_id]();
        //     delete action_map[act_id];
        // }
    }
    //请求失败
    function onPostIOError() {
        Common.log("get Error");
        onPostClose();
    }
    //请求进度(可通过event.bytesLoaded和event.bytesTotal统计进度信息)
    function onPostProgress(event) {
        Common.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
    //关闭http请求
    function onPostClose() {
        Common.log("http Close");
        isOpen = 0;
        httpRequest = null;
    }
})(NetConnect || (NetConnect = {}));
//# sourceMappingURL=NetConnect.js.map