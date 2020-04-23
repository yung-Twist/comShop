export default {
	// 固定电话或手机验证
	validatePhoneTwo(value) {
		const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
		if (value == '' || value == undefined || value == null) {
			return false
		} else {
			if ((!reg.test(value)) && value != '') {
				return false
			} else {
				return true
			}
		}
	},
	//手机号码验证
	validatePhone(value) {
		const reg = /^[1][3-9][0-9]{9}$/;
		if (value == '' || value == undefined || value == null) {
			return false
		} else {
			if ((!reg.test(value)) && value != '') {
				return false
			} else {
				return true
			}
		}
	},
	// 身份证验证
	validateIdNo(value) {
		const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (value == '' || value == undefined || value == null) {
			return false
		} else {
			if ((!reg.test(value)) && value != '') {
				return false
			} else {
				return true
			}
		}
	},
	// 邮箱验证
	validateEMail(value) {
		const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
		if (value == '' || value == undefined || value == null) {
			return false
		} else {
			if (!reg.test(value)) {
				return false
			} else {
				return true
			}
		}
	}
}