const INITIAL_STATE = {
	id: 0,
	username: '',
	password: '',
	role: '',
	loginStatus: false,
	cart: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			// console.log('LOGIN_SUCCESS');
			return {
				...state,
				...action.payload,
				loginStatus: true
			};

		case 'LOGOUT_SUCCESS':
			// console.log('LOGOUT_SUCCESS');
			return INITIAL_STATE;

		case 'CHANGEPASS_SUCCESS':
			// console.log('CHANGEPASS_SUCCESS)
			return {
				...state,
				...action.payload
			};

		case 'ADD_CART':
			return {
				...state,
				cart: action.payload
			};

		default:
			return state;
	}
};
