const UploadForm = ({formRef,setFiles}) => {

	const change = (e) => {

		formRef.current.classList.add('invisible');
		setFiles(Array.from(e.target.files));

	}

	return (

		<form className="upload-form" ref={formRef} encType="multipart/form-data">
			
			<label className="button" htmlFor="file" >
				
				<p>Haz click para subir imagenes</p>
				<i className="bi-camera fs-3"></i>		

			</label>
			
			<input 
				className="invisible" 
				id="file" 
				type="file" 
				name="images" 
				accept="image/*" 
				multiple 
				onChange={change}
			/>

		</form>

	);

}

export default UploadForm;