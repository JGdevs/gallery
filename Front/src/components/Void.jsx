const Void = ({origin}) => {
	
	let title = '';

	switch (origin) {

		case "gallery": {

			title = "No images yet add some";

			break;

		}

		case "trash": {

			title = "The trash is empty";

			break;

		}

	}

	return (

		<section className="void">

			{(origin === "trash")


				? <div>
					
						<h2 className="text-center fs-2">{title}</h2>
						<div className="text-center"><i className="bi-trash2-fill fs-6 text-center"></i></div>			

					</div>

				:	<div>
					
						<div className="text-center"><i className="bi-image fs-6 "></i></div>			
						<h2 className="text-center fs-2">{title}</h2>

					</div>


			}

			{origin === 'gallery' && <p className="text-center">Click on "upload images" to upload some</p>}

		</section>

	);

}

export default Void;