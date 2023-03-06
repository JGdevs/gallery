import {HelpHttp} from '../helpers/HelpHttp';

const api = HelpHttp(import.meta.env.VITE_API);

export async function getImages (url) {

	try {

		const result = await api.get(url);
		return result;

	}

	catch (err) {console.log(err)}

}

export async function deleteImage (image) {

	try {

		image.DeleteDate = new Date().toLocaleString();

		let options = {
	
			body:image,
			headers:{"content-type":"application/json"}
	
		}

		const res = await api.del('',options);

		console.log(res);

		return res;

	}

	catch (err) {console.log(err)}

}

export async function eraseImage (image) {

	try {

		let options = {

			body:image,
			headers:{"content-type":"application/json"}
		
		}

		const res = await api.del('/Papelera',options);
		return res;

	}

	catch (err) {console.log(err)}

}

export async function restoreImage (image) {

	try {

		let options = {
	
			body:image,
			headers:{"content-type":"application/json"}
	
		}

		const res = await api.del('/restore');
		return res;

	}

	catch(err) {console.log(err)}

}

export async function searchImages(filter,search) {
	
	try {

		const res = await api.get(`/Search/${filter}/${search}`);
		return res;

	}

	catch(err) {console.log(err);}

}

export async function saveImages(form) {
	
	try {

		const formData = new FormData(form);

		let options = {

			body:formData,

		}

		const res = await api.post('/Upload',options);
		return res;

	}

	catch (err) {

		console.log(err);

	}

}

export async function getAllTrash(image) {
	
	try {

		const res = api.get('/Papelera');
		return res;

	}

	catch (err) {

		console.log(err)

	}

}