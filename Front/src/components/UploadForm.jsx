const UploadForm = ({setFiles}) => {

	const change = (e) => setFiles(Array.from(e.target.files));

	return (

		<section className="upload-form">
			
			<label className="button" htmlFor="file" >
				
				<p>Haz click para subir imagenes</p>
				<i className="bi-camera fs-3 text-main-color"></i>		

			</label>
			
			<input className="invisible" id="file" type="file" multiple onChange={change}/>

		</section>

	);

}

export default UploadForm;