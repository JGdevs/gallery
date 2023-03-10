import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useModals from '../context/ModalContext';
import useImages from '../context/ImagesContext';
import DetailsModal from './DetailsModal';
import {deleteImage} from '../services/images';
import styles from '../styles/ImageModal.module.css';

const ImageModal = ({origin}) => {

	const {imageModal,setImageModal} = useModals(),

	{setImages,getImage,totalImages} = useImages(),

	[position,setPos] = useState(imageModal),

	[details,setDetails] = useState(false),

	image = getImage(position),

	nav = useNavigate();

	function previous () {

		if(position === 0) return;
		setPos(prevPosition => prevPosition - 1);

	}

	function next () {

		if(position + 1 === totalImages) return;
		setPos(prevPosition => prevPosition + 1);

	}

	function Edit () {

		nav(`/Edit/${position}`);

		setImageModal(null);

	}

	function Delete (id) {

		let confirm = window.confirm('la imagen se movera a la papelera');

		if(!confirm) return;

		deleteImage(id).then(res => {

			if(!res.err) {
		
				setImages(prevState => prevState.filter((img) => img._id != image._id));

				setImageModal(null);

			}

			else console.log(res.err);

		})

	}

	return(

		<div className={styles.modalImgContainer}>

			<i className="bi-caret-left-fill fs-3 before in-mobile" onClick={previous}></i>

			<img className={styles.imageModal} src={image.src}/>

			<i className="bi-x fs-3 close in-mobile" onClick={() => setImageModal(null)}></i>

			<i className="bi-caret-right-fill fs-3 after in-mobile" onClick={next}></i>

			<nav className={styles.modalOptions}>
				
				<div className={styles.modalOption} onClick={() => setDetails(true)}>
					
					<i className="bi-info-circle fs-2"></i>

					<span>Detalles</span>

				</div>

				<div className={styles.modalOption} onClick={() => {Edit()}}>

						<i className="bi-pencil fs-2"></i> 
						<span>Editar</span>

				</div>

				<div className={styles.modalOption} onClick={() => Delete(image._id)}>

					<i className="bi-trash fs-2"></i>
					<span>Borrar</span>

				</div>

			</nav>

			{details && <DetailsModal image={image} close={setDetails}/>}

		</div>

	);

}

export default ImageModal;