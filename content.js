var mayo = chrome.extension.getURL('mayo.png');
var isImage = /\.(jpg|jpeg|png|gif|svg)$/;

chrome.webRequest.onBeforeRequest.addListener(function (details) {
	if (isImage.test(details.url)) {
	    return {
	        redirectUrl: mayo
	    };
	}
}, {
    urls: ["*://*/*"]
}, ["blocking"]);

chrome.webRequest.onHeadersReceived.addListener(function (details) {
	for (var i = 0; i < details.responseHeaders.length; ++i) {
		if (details.responseHeaders[i].name.toLowerCase() === 'content-type') {
			if (/image\//.test(details.responseHeaders[i].value)) {
			    return {
			        redirectUrl: mayo
			    };
			}
			break;
		}
	}
}, {
    urls: ["*://*/*"]
}, ["blocking", "responseHeaders"]);