import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {searchImages} from '../services/images';
import useConf from '../context/ConfContext';
import ModalContext from '../context/ModalContext';
import Image from './Image';
import Loader from './Loader';
import ImageModal from './ImageModal';
import SearchModal from './SearchModal';
import useModals from '../context/ModalContext';

const SearchResult = () => {

	const [images,setImages] = useState(null),

	{imageModal,searchModal} = useModals(),

	{conf} = useConf();

	let {filter,search} = useParams();

	useEffect(() => {

		searchImages(filter,search).then(res => {

			if(!res.err) setImages(res);

			else console.log(res.err);

		});

	},[filter,search]);

	return (

		<>

			{images && <p className="text-center fs-1 mr-tp-2">results for: {search}</p>}

			<section className={`${conf.gridStyle}`}>

				{

					(!images) ? <Loader/>

					: (images.length > 0) 

						? images.map((image,i) => <Image pos={i} key={i} image={image}/>) 

						: <h2 className="text-center">There are no matches for your search</h2> 

				}

				{(imageModal === 0 || imageModal) && <ImageModal images={images}/>}

				{searchModal && <SearchModal/>}

			</section>

		</>

	)

}

export default SearchResult;