import {HelpHttp} from '../helpers/HelpHttp';

const api = HelpHttp(import.meta.env.VITE_API);

export async function getImages (url) {

	try {

		const result = await api.get(url);
		return result;

	}

	catch (err) {console.log(err)}

}

export async function deleteImage (id) {

	try {

		const res = await api.del(`/Delete/${id}`);

		return res;

	}

	catch (err) {console.log(err)}

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

export async function saveEdit(image) {
	
	try {

		const body = JSON.stringify(image);

		console.log(body);

		const options = {

			headers:{'content-type':'application/json'},
			body

		},

		res = await api.post('/Edit',options);
		return res;

	}

	catch (err) {console.log(err);}

}