import {useState,useEffect} from 'react';
import {HelpHttp} from '../helpers/HelpHttp';
import useModals from '../context/ModalContext';
import Image from './Image';
import ImageModal from './ImageModal';
import SearchModal from './SearchModal';
import Void from './Void';
import Loader from './Loader';
import useImages from '../context/ImagesContext';

const Trash = ({Delete}) => {

	const {imageModal,setImageModal,searchModal} = useModals(),

	{trash,setTrash,eraseImage} = useImages(),

	api = HelpHttp();

	useEffect(() => {

		if(trash) return;

		api.get('http://localhost:4069/Papelera').then(res => {

			if(!res.err) setTrash(res);

			else console.log(res.err);

		});

	},[])

	return (

		<section className="grid-gallery">

			{

				trash ?	(trash.length > 0) ? trash.map((image,i = 0) => <Image pos={i} key={i + 1} image={image}/>) : <Void origin="trash"/>

				: <Loader/>

			}

			{(imageModal === 0 || imageModal) && <ImageModal images={trash} Delete={eraseImage}/>}

			{searchModal && <SearchModal/>}

		</section>

	);

}

export default Trash;