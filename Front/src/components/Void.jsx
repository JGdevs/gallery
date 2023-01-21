const Void = ({origin}) => {
	
	let title = '';

	switch (origin) {

		case "gallery": {

			title = "no hay imagenes todavia agrega algunas";

			break;

		}

		case "trash": {

			title = "la papelera esta vacia";

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

			{origin === 'gallery' && <p className="text-center">Haz click en "subir imagenes" para subir algunas</p>}

		</section>

	);

}

export default Void;