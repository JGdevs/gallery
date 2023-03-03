import {useState} from 'react';
import UploadForm from './UploadForm';
import useImages from '../context/ImagesContext';
import {saveImages} from '../services/images';
import Image from './Image';
import styles from '../styles/ConfModal.module.css';
	
const NewImages = () => {

	const [files,setFiles] = useState(null),

	[modal,setModal] = useState(false),

	{setImages} = useImages();

	function uploadImages () {

		let Images = Array.from(document.querySelectorAll('.image'));

		if (Images.length == 0) return; 

		let save = window.confirm('¿guardar imagenes?');

		if (save) {

			Images = Images.map((image,i) => {
				
				let date = new Date().toLocaleString(),

				{name,size,type} = files[i];

				name = files[i].name.substring(0,name.indexOf('.'));

				type = type.slice(type.indexOf('/') + 1);

				const obj = {

					CreateDate:date,
					name,
					src:image.firstElementChild.src,
					size,
					type

				}

				return obj;

			});

			saveImages(Images).then(res => {

				if(!res.err) {

					setTimeout(() => {setModal(null);setFiles(null)},3000);

					setModal(files.length);

					setImages(prevImages => [...prevImages,...Images]);

				}

				else console.log(res.err)

			});

		}

	}

	return (

		<article>
			
			{files && <label className="button in-desktop" htmlFor="save">guardar imagenes</label>}

			<section className="normal">
				
				{(files) ? files.map((image,i = 0) => <Image key={i + 1} image={image}/>) : <UploadForm setFiles={setFiles}/>}

				<input className="invisible" id="save" type="radio" onClick={uploadImages}/>

				{modal && 

					<div className={`${styles.modal} animation-none bg-modal`}>
						
						<p>{`${modal} ${modal > 1 ? 'images' : 'image'} have been saved`} </p>

					</div>

				}

			</section>

		</article>

	);

}

export default NewImages;