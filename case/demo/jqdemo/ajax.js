function ajaxWrap(ajaxData, callback) {
	if (!ajaxData.data) ajaxData.data = {};
	$.extend(ajaxData.data);
	$.ajax(ajaxData).done(function (data) {
		callback(data);
	});
};