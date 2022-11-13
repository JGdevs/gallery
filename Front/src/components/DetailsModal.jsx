import useConf from '../context/ConfContext';

const DetailsModal = ({image,close}) => {

	let {conf} = useConf(),

	{CreateDate,name,size,type} = image,

	extend = (size > 1000000) ? 'MB' : 'KB';

	size = (size > 1000000) ? Math.fround((size/1024) / 1024).toString().substring(0,3) : Math.round(size/1024);

	return(

		<article className={`image-details child-bg-${conf.theme}`}>
				
			<section className="details-options in-mobile">
				
				<i className="bi-x" onClick={() => close(false)}></i>

			</section>

			<section className="details-field">

				<label>Nombre:</label>
				<span>{name}</span>

			</section>

			<section className="details-field">

				<label>fecha de creacion:</label>
				<span>{CreateDate}</span>

			</section>

			<section className="details-field">

				<label>Tamanio:</label>
				<span>{`${size} ${extend}`}</span>

			</section>

			<section className="details-field">

					<label>Tipo de imagen:</label>
				<span>{type}</span>

			</section>

		</article>

	);

}

export default DetailsModal;

