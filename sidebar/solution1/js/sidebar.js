define([],function(){
	return {
		isPhone:function(phone){
			var phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
			return phoneReg.test(phone);	
		},
		isEmail:function(email){
			var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
			return emailReg.test(email);
		},
		isIDCard:function(IDCard){
			var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			return idCardReg.test(IDCard);
		}
	};
});