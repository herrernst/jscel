window.onerror = function (_msg, _url, _num, _col) {
	var res = {}, extra = '', query = '', m, tmpTarget, 
		/* don't report errors from scripts from the following urls */
		scriptsToIgnore = ['http://connect.facebook.net/en_US/all.js'],
		/* url to report to, has to be on same domain */
		serverURL = 'jscel.php',
		/* only report if included in current location, leave empty if don't care */
		reportingSite = '';

	/* if we are not on targeted site, return immediately */
	if (window.location.href.indexOf(reportingSite) === -1) {
		return false;
	}
	/* don't report errors that have no useful info
        this may be the case if not same origin according to http://dev.w3.org/html5/spec/webappapis.html#report-the-error 
 		or in an extension*/
	if (_msg === "Script error." && !_url && !_num) {
		return false;
	}
	/* most browsers provide three arguments, but some others return an object */
	if (typeof _msg === "string") {
		res.msg = _msg;
		res.script = _url;
	} else if (typeof arguments[0] === "object") {
		extra += "!!argument is object!!";
		tmpTarget = (arguments[0].target || arguments[0].srcElement);
		if (tmpTarget && (tmpTarget instanceof HTMLScriptElement || tmpTarget.constructor.name === 'HTMLScriptElement')) {
			res.script = tmpTarget.src;
		} else {
			extra += "[";
			for (m in arguments[0]) {
				if (arguments[0].hasOwnProperty(m)) extra += m + ": " + arguments[0][m] + ", ";
			}
			extra += "]";
			if (arguments[0].constructur) extra += "|constructor: " + arguments[0].constructor;
			if (tmpTarget && tmpTarget.src) {
				res.script = tmpTarget.src;
			}
			if (tmpTarget.constructor) extra += "|target.constructor.name: " + tmpTarget.constructor.name;
			if (tmpTarget && tmpTarget.prototype) extra += "|target.prototype: " + tmpTarget.prototype;
			if (tmpTarget && tmpTarget.__proto__) extra += "|target.__proto__: " + tmpTarget.__proto__;
			if (tmpTarget && Object.getPrototypeOf(tmpTarget)) extra += "|getPrototypeOf: " + Object.getPrototypeOf(tmpTarget);
		}
	}
	for (var i = 0; i < scriptsToIgnore.length; i++) {
		if (res.script.indexOf(scriptsToIgnore[i]) ===  0 ) {
			return false;
		}
	}
	res.num = _num;
	col = _col;
	if (document.referrer) {
		res.ref = document.referrer;
	}
	if (arguments && arguments.callee && arguments.callee.caller) {
		if (arguments.callee.caller.name) {
			extra += "|caller.name: " + arguments.callee.caller.name;
		} else {
			//Do you really want to report complete source (IE)?
			if (false) extra += "|caller: " + arguments.callee.caller;
		}
	}
	for (val in res) {
		if (res[val]) {
			query += "&" + val + "=" + encodeURIComponent(res[val]);
		}
	}
	query += "&timestamp="+(new Date()).getTime();
	if (col) extra +=  "|col: " + col;
	if (extra) query +=  "&extra=" + encodeURIComponent(extra);
	
	(new Image).src = serverURL + "?" + query;
	//false: browser also reports error; true: silence
    return false;
};

1 * 3 * 4 + 4;
triggerErrorInSameJsFileAfter
