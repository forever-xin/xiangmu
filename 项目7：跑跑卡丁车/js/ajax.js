	featuredcontentslider.init({
		id: "slider4", //ָ��ID
		contentsource: ["inline", ""], //��Чֵ: ["inline", ""] Ƕ��html or ["ajax", "path_to_file"] Ƕ��utf-8�ļ�
		toc: "#increment", //��Чֵ: "#increment" ������, "markup", ["label1", "label2", etc]��Ǿ�������
		nextprev: ["", ""], //��� for "��һ��" and "��һ��" ����Ϊ "" Ϊ������.
		revealtype: "mouseover", //����¼���Чֵ: "click" or "mouseover"
		enablefade: [true, 0.1], //[true/false, �л���ɫ��]
		autorotate: [true, 3500], //[true/false, �л�ͣ��ʱ��]
		onChange: function(previndex, curindex){ //�������� previndex ����������һ����¼�� curindex ����������һ����¼ �����Զ��庯������
	}
})