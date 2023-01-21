import {useState,useEffect,createContext,useContext} from 'react';
import {HelpHttp} from '../helpers/HelpHttp';
import useConf from './ConfContext';

const ImagesContext = createContext(),

useImages = () => useContext(ImagesContext),

ImagesProvider = ({children}) => {

	let basePath = 'http://localhost:4069';

	const [images,setImages] = useState(null),

	[initialImages,setInitialImages] = useState(null),

	[trash,setTrash] = useState(null),

	[hasMore,setHasMore] = useState(false),

	api = HelpHttp(),

	{conf} = useConf(),

	deleteImage = (image) => {

		let erase = window.confirm('estas seguro de borrar esta imagen');

		if(erase) {

			image.DeleteDate = new Date().toLocaleString();

			let options = {
		
				body:image,
				headers:{"content-type":"application/json"}
		
			}
		
			api.del(basePath,options).then(res => {
		
				if(!res.err) {
		
					const newState = images.filter((img) => img._id != image._id);
		
					setImages(newState);

					setTrash([...trash,image]);
		
				}
		
				else console.log('ocurrio un error al intentar borrar la imagen');
		
			});

		}

	},

	eraseImage = (image) => {

		let erase = window.confirm('esta imagen se borrara de forma permanente'),

		trashUrl = `${basePath}/Papelera`;

		if(erase) {

			let options = {
		
				body:image,
				headers:{"content-type":"application/json"}
		
			}
		
			api.del(trashUrl,options).then(res => {
		
				if(!res.err) setTrash(prevTrash => prevTrash.filter((img) => img._id != image._id));
		
				else console.log('ocurrio un error al intentar borrar la imagen');
		
			});

		}
		
	},

	data = {

		images,
		setImages,
		deleteImage,
		initialImages,
		trash,
		setTrash,
		eraseImage,
		hasMore,
		setHasMore

	}

	let url = (conf.typeLoad == 'forPage') ? `${basePath}/Page/1` : `${basePath}/infinite/0`

	useEffect(() => {

		api.get(url).then(res => {

			if(!res.err) {

				if(conf.typeLoad == 'forPage') {

					setImages(res.docs);

					setInitialImages(res.docs);

					setHasMore(res.hasMore);

				}

				else {

					setImages(res);

					setInitialImages(res);

				}

			}

			else console.log(res.err);

		});

	},[]);

	return <ImagesContext.Provider value={data}>{children}</ImagesContext.Provider>

}

export default useImages;
export {ImagesProvider};