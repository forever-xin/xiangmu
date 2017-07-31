	featuredcontentslider.init({
		id: "slider4", //指定ID
		contentsource: ["inline", ""], //有效值: ["inline", ""] 嵌入html or ["ajax", "path_to_file"] 嵌入utf-8文件
		toc: "#increment", //有效值: "#increment" 标记序号, "markup", ["label1", "label2", etc]标记具体内容
		nextprev: ["", ""], //标记 for "上一条" and "下一条" 设置为 "" 为不出现.
		revealtype: "mouseover", //鼠标事件有效值: "click" or "mouseover"
		enablefade: [true, 0.1], //[true/false, 切换褪色度]
		autorotate: [true, 3500], //[true/false, 切换停留时间]
		onChange: function(previndex, curindex){ //触发处理； previndex 触发处理上一个记录； curindex 触发处理上一个记录 可以自定义函数控制
	}
})