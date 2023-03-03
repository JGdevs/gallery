import {useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import useModals from '../context/ModalContext';
import useImages from '../context/ImagesContext';
import DetailsModal from './DetailsModal';
import {deleteImage,eraseImage,restoreImage} from '../services/images';
import styles from '../styles/ImageModal.module.css';

const ImageModal = ({origin}) => {

	const {imageModal,setImageModal} = useModals(),

	{setImages,setTrash,getImage,getTrash} = useImages(),

	location = useLocation().pathname,

	[position,setPos] = useState(imageModal),

	[details,setDetails] = useState(false),

	image = (origin === "trash") ? getTrash(position) : getImage(position),

	nav = useNavigate();

	function previous () {

		if(position === 0) return false;
		setPos(prevPosition => prevPosition - 1);

	}

	function next () {

		if(position + 1 == images.length) return false;
		setPos(prevPosition => prevPosition + 1);

	}

	function Edit () {

		nav(`/Edit/${position}`);

		setImageModal(null);

	}

	function Restore (image) {

		restoreImage(image).then(res => {

			if(!res.err) {

				delete image.deleteDate;

				setImageModal(null);

				setTrash(prevTrash => prevTrash.filter(img => img._id !== image._id));

				setImages(prevImages => [...prevImages,image]);

			}

			else console.log(res.err);

		})
	}

	function DeleteOf (image) {

		if(location === "/Trash") {

			let confirm = window.confirm('la imagen se borrara de forma permanente');

			if(!confirm) return;

			eraseImage(image).then(res => {

				if(!res.err) {

					setTrash(prevTrash => prevTrash.filter((img) => img._id != image._id));

					setImageModal(null);

				}
		
				else console.log('ocurrio un error al intentar borrar la imagen');

			});
			
		}

		else {

			let confirm = window.confirm('la imagen se movera a la papelera');

			if(!confirm) return;

			deleteImage(image).then(res => {

				if(!res.err) {
			
					setImages(prevState => prevState.filter((img) => img._id != image._id));

					setTrash(prevTrash => [...prevTrash,image]);

					setImageModal(null);

				}

				else console.log(res.err);

			})

		}

	}

	return(

		<div className={styles.modalImgContainer}>

			<i className="bi-caret-left-fill fs-3 before" onClick={previous}></i>

			<img className={styles.imageModal} src={image.src}/>

			<i className="bi-x fs-3 close" onClick={() => setImageModal(null)}></i>

			<i className="bi-caret-right-fill fs-3 after" onClick={next}></i>

			<nav className={styles.modalOptions}>
				
				<div className={styles.modalOption} onClick={() => setDetails(true)}>
					
					<i className="bi-info-circle fs-2"></i>

					<span>Detalles</span>

				</div>

				<div className={styles.modalOption} onClick={(location === "/Trash") ? () => {Restore(image)} : () => {Edit()}}>
					
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

				<div className={styles.modalOption} onClick={() => DeleteOf(image)}>

					<i className="bi-trash fs-2"></i>

					<span>Borrar</span>

				</div>

			</nav>

			{details && <DetailsModal image={image} close={setDetails}/>}

		</div>

	);

}

export default ImageModal;