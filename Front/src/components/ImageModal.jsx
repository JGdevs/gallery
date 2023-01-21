import {useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import useModals from '../context/ModalContext';
import useImages from '../context/ImagesContext';
import DetailsModal from './DetailsModal';
import {HelpHttp} from '../helpers/HelpHttp';
import styles from '../styles/ImageModal.module.css';

const ImageModal = ({images}) => {

	const {imageModal,setImageModal} = useModals(),

	{deleteImage,setImages,setTrash,eraseImage} = useImages(),

	location = useLocation().pathname,

	[position,setPos] = useState(imageModal),

	[details,setDetails] = useState(false),

	nav = useNavigate(),

	api = HelpHttp(),

	url = 'http://localhost:4069';

	function previous () {

		if(position === 0) return false;
		setPos(position - 1);

	}

	function next () {

		if(position + 1 == images.length) return false;
		setPos(position + 1);

	}

	function Edit () {

		nav(`/Editar/${position}`);

		setImageModal(null);

	}

	function Restore () {

		let restoreUrl = `${url}/restore`,

		image = images[position],

		options = {
		
			body:image,
			headers:{"content-type":"application/json"}
		
		}	

		api.del(restoreUrl,options).then(res => {

			if(!res.err) {

				delete image.deleteDate;

				setImageModal(null);

				setTrash(prevTrash => prevTrash.filter(img => img._id !== image._id));

				setImages(prevImages => [...prevImages,image]);

			}

			else console.log(res.err);

		})
	}

	function DeleteOf () {

		if(location === "/Trash") {

			eraseImage(images[position]);

			setImageModal(null);
			
		}

		else {

			deleteImage(images[position]);

			setImageModal(null);

		}

	}

	return(

		<div className={styles.modalImgContainer}>

			<i className="bi-caret-left-fill fs-3 before" onClick={previous}></i>

			<img className={styles.imageModal} src={images[position].src}/>

			<i className="bi-x fs-3 close in-mobile" onClick={() => setImageModal(null)}></i>

			<i className="bi-caret-right-fill fs-3 after" onClick={next}></i>

			<nav className={styles.modalOptions}>
				
				<div className={styles.modalOption} onClick={() => setDetails(true)}>
					
					<i className="bi-info-circle fs-2"></i>

					<span>Detalles</span>

				</div>

				<div className={styles.modalOption} onClick={(location === "/Trash") ? Restore : Edit}>
					
					{

						(location === "/Trash") 

						? <>
							
								<i className="bi-reply-fill fs-2"></i> 

								<span>Restaurar</span> 

							</>


						: <>

							<i className="bi-pencil fs-2"></i> <span>Editar</span>

							</>

					}

				</div>

				<div className={styles.modalOption} onClick={DeleteOf}>

					<i className="bi-trash fs-2"></i>

					<span>Borrar</span>

				</div>

			</nav>

			{details && <DetailsModal image={images[position]} close={setDetails}/>}

		</div>

	);

}

export default ImageModal;