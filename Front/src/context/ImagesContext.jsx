import {useState,useEffect,createContext,useContext} from 'react';
import {getImages} from '../services/images';
import useConf from './ConfContext';

const ImagesContext = createContext(),

useImages = () => useContext(ImagesContext),

ImagesProvider = ({children}) => {

	const [images,setImages] = useState(null),

	[hasMore,setHasMore] = useState(false),

	{conf} = useConf(),

	getImage = (index) => images[index],

	getTrash = (index) => trash[index],

	data = {

		images,
		setImages,
		hasMore,
		setHasMore,
		getImage,

	}

	useEffect(() => {

		let url = (conf.typeLoad == 'pagination') ? '/Page/1' : '/infinite/0';

		getImages(url).then(res => {

			if(!res.err) {

				if(conf.typeLoad == 'pagination') {

					setImages(res.docs);

					setHasMore(res.hasMore);

				}

				else {setImages(res);}

			}

			else console.log(res.err);

		});

	},[]);

	return <ImagesContext.Provider value={data}>{children}</ImagesContext.Provider>

}

export default useImages;
export {ImagesProvider}