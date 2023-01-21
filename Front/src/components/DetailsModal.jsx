import useConf from '../context/ConfContext';
import styles from '../styles/DetailsModal.module.css';

const DetailsModal = ({image,close}) => {

	let {conf} = useConf(),

	{CreateDate,name,size,type} = image,

	extend = (size > 1000000) ? 'MB' : 'KB';

	size = (size > 1000000) ? Math.round((size/1024) / 1024).toString().substring(0,3) : Math.round(size/1024);

	return(

		<article className={`${styles.imageDetails} child-bg-${conf.theme}`}>
				
			<section className={`${styles.detailsOptions}`}>
				
				<i className="bi-x" onClick={() => close(false)}></i>

			</section>

			<section className={styles.detailsField}>

				<label>Nombre:</label>
				<span>{name}</span>

			</section>

			<section className={styles.detailsField}>

				<label>fecha de creacion:</label>
				<span>{CreateDate}</span>

			</section>

			<section className={styles.detailsField}>

				<label>Tamanio:</label>
				<span>{`${size} ${extend}`}</span>

			</section>

			<section className={styles.detailsField}>

					<label>Tipo de imagen:</label>
				<span>{type}</span>

			</section>

		</article>

	);

}

export default DetailsModal;

