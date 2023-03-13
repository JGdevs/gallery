export const HelpHttp = (baseURL) => {

	const customFetch = (endpoint,options) => {

		if (baseURL) endpoint = (endpoint) ? baseURL + endpoint : baseURL;

		if (typeof endpoint !== 'string') throw new Error(`excepected a URL but got ${typeof endpoint}`);

		options.method = options.method || "GET";

		if(!options.body) delete options.body;

		return fetch(endpoint,options)

		.then(res => (res.ok) ? res.json() : Promise.reject({err:true,status:res.status || "00",statusText:res.statusText || "ocurrio un error"}))

		.catch(err => err);

	}

	const get = (url,options = {}) => {

		return customFetch(url,options);

	}


	const post = (url,options = {}) => {

		options.method = "POST";

		return customFetch(url,options);

	} 

	const put = (url,options = {}) => {

		options.method = "PUT";

		return customFetch(url,options);

	} 

	const del = (url,options = {}) => {

		options.method = "DELETE";

		return customFetch(url,options);

	} 

	
	return {

		get,
		post,
		put,
		del	

	}

}