import {useState,useRef} from 'react';
import UploadForm from './UploadForm';
import useImages from '../context/ImagesContext';
import {saveImages} from '../services/images';
import Image from './Image';
import styles from '../styles/ConfModal.module.css';
	
const NewImages = () => {

	const [files,setFiles] = useState(null),

	[modal,setModal] = useState(false),

	{setImages} = useImages(),

	formRef = useRef();

	function uploadImages () {

		if (files == null) return;

		let save = window.confirm('¿guardar imagenes?');

		if (save) {

			saveImages(formRef.current).then(res => {

				if(!res.err) {

					setTimeout(() => {

						formRef.current.classList.remove('invisible');
						setModal(null);
						setFiles(null);

					},3000);

					setModal(files.length);
					setImages(prevImages => [...prevImages,...files]);

				}

				else console.log(res.err)

			});

		}

	}

	return (

		<article>
			
			{files && <label className="button in-desktop fs--1" htmlFor="save">Save images</label>}

			<section className="normal">
				
				<UploadForm formRef={formRef} setFiles={setFiles}/>

				{(files) && files.map((image,i = 0) => <Image key={i + 1} image={image}/>)}

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