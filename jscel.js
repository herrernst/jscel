window.onerror = function (_msg, _url, _num, _col) {
	var msg, num, col, ref, script, extra = "", query = "", m, tmpTarget, scriptsToIgnore = ["http://google.com/plus2.js"];

	/* if we are not on live system, return immediately */
	if (window.location.href.indexOf("://localhost/") === -1) {
//		return false;
	}
	/* don't report errors that have no useful info
           this may be the case if not same origin according to http://dev.w3.org/html5/spec/webappapis.html#report-the-error  */
	if (_msg === "Script error." && !_url && !_num) {
		return false;
	}
	/* different browsers, different arguments */
	if (typeof _msg === "string") {
		msg = _msg;
		script = _url;
	} else if (typeof arguments[0] === "object") {
		tmpTarget = (arguments[0].target || arguments[0].srcElement);
		if (tmpTarget && (tmpTarget instanceof HTMLScriptElement || tmpTarget.constructor.name === 'HTMLScriptElement')) {
			script = tmpTarget.src;
		} else {
			extra += "[";
			for (m in arguments[0]) {
				if (arguments[0].hasOwnProperty(m)) extra += m + ": " + arguments[0][m] + ", ";
			}
			extra += "]";
			if (arguments[0].constructur) extra += "|constructor: " + arguments[0].constructor;
			if (tmpTarget && tmpTarget.src) {
				script = tmpTarget.src;
			}
			if (tmpTarget.constructor) extra += "|target.constructor.name: " + tmpTarget.constructor.name;
			if (tmpTarget && tmpTarget.prototype) extra += "|target.prototype: " + tmpTarget.prototype;
			if (tmpTarget && tmpTarget.__proto__) extra += "|target.__proto__: " + tmpTarget.__proto__;
			if (tmpTarget && Object.getPrototypeOf(tmpTarget)) extra += "|getPrototypeOf: " + Object.getPrototypeOf(tmpTarget);
		}
	}
	for (var i = 0; i < scriptsToIgnore.length; i++) {
		if (script.indexOf(scriptsToIgnore[i]) ===  0 ) {
			return false;
		}
	}
	num = _num;
	col = _col;
	if (document.referrer) {
		ref = document.referrer;
	}
	if (arguments && arguments.callee && arguments.callee.caller) {
		if (arguments.callee.caller.name) {
			extra += "|caller.name: " + arguments.callee.caller.name;
		} else {
			//Really? Logs complete source
			if (false) extra += "|caller: " + arguments.callee.caller;
		}
	}
	if (msg) query +=  "&msg=" + encodeURIComponent(msg);
	if (num) query +=  "&num=" + num;
	if (col) extra +=  "|col: " + col;
	if (ref) query +=  "&ref=" + encodeURIComponent(ref);
	if (script) query +=  "&script=" + encodeURIComponent(script);
	query += "&timestamp="+(new Date()).getTime();
	if (extra) query +=  "&extra=" + encodeURIComponent(extra);
	
	(new Image).src = "/jscel/jscel.php?" + query;
    return false; //if false, firebug also shows it; if true, not
};

1 * 3 * 4 + 4;
triggerErrorInSameJsFileAfter
