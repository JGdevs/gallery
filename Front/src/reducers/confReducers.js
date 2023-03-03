import {TYPES} from '../actions/confActions.js';

export const initialStateConf = JSON.parse(localStorage.getItem('confGallery')) || {

		theme:'dark',
		gridStyle:'normal',
		borderImgs:'square',
		typeLoad:'pagination',

}

export function confReducer (state,action) {

	switch (action.type) {

		case TYPES.changeTheme : {

			 const newConf = {...state,theme:action.payload}

			 localStorage.setItem('confGallery',JSON.stringify(newConf));

			 return newConf;

		}

		case TYPES.changeGridStyle : {

			 const newConf = {...state,gridStyle:action.payload}

			 localStorage.setItem('confGallery',JSON.stringify(newConf));

			 return newConf;

		}

		case TYPES.changeBorderImages : {

			 const newConf = {...state,borderImgs:action.payload}

			 localStorage.setItem('confGallery',JSON.stringify(newConf));

			 return newConf;

		}

		case TYPES.changeTypeLoad : {

			 const newConf = {...state,typeLoad:action.payload}

			 localStorage.setItem('confGallery',JSON.stringify(newConf));

			 return newConf;

		}

		default : return state;

	}

}  

