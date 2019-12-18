export const loginAction = data => {
	// console.log('loginAction');
	return {
		type: 'LOGIN_SUCCESS',
		payload: data
	};
};

export const logoutAction = () => {
	// console.log('logoutAction');
	return {
		type: 'LOGOUT_SUCCESS'
	};
};

export const changePass = data => {
	// console.log('ChangepasAction');
	return {
		type: 'CHANGEPASS_SUCCESS',
		payload: data
	};
};

export const addCartAction = data => {
	return {
		type: 'ADD_CART',
		payload: data
	};
};
