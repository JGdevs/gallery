import {useState} from 'react';
import {HelpHttp} from '../helpers/HelpHttp';
import UploadForm from './UploadForm';
import Image from './Image';
	
const NewImages = ({images,setImages}) => {

	const [files,setFiles] = useState(null),

	[modal,setModal] = useState(false),

	api = HelpHttp(),

	url = 'http://localhost:4069';

	function saveImages () {

		let Images = Array.from(document.querySelectorAll('.image'));

		if (Images.length == 0) return false; 

		let save = window.confirm('¿guardar imagenes?');

		if (save) {

			Images = Images.map((image,i = 0) => {
				
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

			let options = {

				body:Images,
				headers:{"content-type":"application/json"}

			}

			api.post(url,options).then(res => {

				if(!res.err) {

					setTimeout(() => {setModal(null);setFiles(null)},3000);

					setModal(files.length);

					setImages([...images,...Images]);

				}

				else console.log(res.err)

			});

		}

	}

	return (

		<article>
			
			{files && <label className="button in-desktop" htmlFor="save">guardar imagenes</label>}

			<section className="grid-gallery">
				
				{(files) ? files.map((image,i = 0) => <Image key={i + 1} image={image}/>) : <UploadForm setFiles={setFiles}/>}

				<input className="invisible" id="save" type="radio" onClick={saveImages}/>

				{modal && 

					<div className="modal animation-none bg-modal">
						
						<p>se han guardado {modal} imagenes</p>

					</div>

				}

			</section>

		</article>

	);

}

export default NewImages;