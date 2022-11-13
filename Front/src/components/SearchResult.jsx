import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {HelpHttp} from '../helpers/HelpHttp';
import ModalContext from '../context/ModalContext';
import Image from './Image';
import Loader from './Loader';
import ImageModal from './ImageModal';
import SearchModal from './SearchModal';
import useModals from '../context/ModalContext';

const SearchResult = ({Delete}) => {

	const [searchImages,setSearchImages] = useState(null),

	{imageModal,searchModal} = useModals(),

	api = HelpHttp(),

	url = 'http://localhost:4069';

	let {filter,search} = useParams();

	useEffect(() => {

		switch (filter) {

			case 'name': {

				let searchUrl = `${url}/Search/${filter}/${search}`;

				api.get(searchUrl).then(res => {

					if(!res.err) setSearchImages(res);

					else console.log(res.err);

				});

				break;

			}

			case 'date': {

				let searchUrl = `${url}/Search/${filter}/${search}`;

				api.get(searchUrl).then(res => {

					if(!res.err) setSearchImages(res);

					else console.log(res.err,'hubo un error');

				});

				break;

			}

			case 'type': {

				let searchUrl = `${url}/Search/${filter}/${search}`;

				api.get(searchUrl).then(res => {

					if(!res.err) setSearchImages(res);

					else console.log(res.err);

				});

				break;

			}

		}

	},[filter,search]);

	return (

		<>

			{searchImages && <p className="text-center fs-1 mr-tp-2">resultados para: {search}</p>}

			<section className="grid-gallery">

				{

					(!searchImages) ? <Loader/>

					: (searchImages.length > 0) 

						? searchImages.map((image,i) => <Image pos={i} key={i} image={image}/>) 

						: <h2 className="text-center">No hay resultados para su busqueda</h2> 

				}

				{(imageModal === 0 || imageModal) && <ImageModal images={searchImages} Delete={Delete}/>}

				{searchModal && <SearchModal/>}

			</section>

		</>

	)

}

export default SearchResult;