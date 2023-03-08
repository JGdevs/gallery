import useConf from '../context/ConfContext';
import styles from '../styles/DetailsModal.module.css';

const DetailsModal = ({image,close}) => {

	let {conf} = useConf(),

	{createDate,name,size,type} = image,

	extend = (size > 1000000) ? 'MB' : 'KB';

	type = type.slice(indexOf('/'));

	createDate = new Intl.DateTimeFormat("es-ES",{

  	dateStyle: "short",
  	timeStyle: "short"

	}).format(createDate);

	size = (size > 1000000) ? Math.round((size/1024) / 1024).toString().substring(0,3) : Math.round(size/1024);

	return(

		<article className={`${styles.imageDetails} child-bg-${conf.theme}`}>
				
			<section className={`${styles.detailsOptions}`}>
				
				<i className="bi-x" onClick={() => close(false)}></i>

			</section>

			<section className={styles.detailsField}>

				<label>Name:</label>
				<span>{name}</span>

			</section>

			<section className={styles.detailsField}>

				<label>Create Date:</label>
				<span>{CreateDate}</span>

			</section>

			<section className={styles.detailsField}>

				<label>Size:</label>
				<span>{`${size} ${extend}`}</span>

			</section>

			<section className={styles.detailsField}>

					<label>Type:</label>
				<span>{type}</span>

			</section>

		</article>

	);

}

export default DetailsModal;

