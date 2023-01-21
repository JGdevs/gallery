import styles from '../styles/PhotoEditor.module.css';

const sidebarItem = ({name,index}) => {

	return (

		<option className={styles.sidebarItem} value={index}>{name}</option>

	)

}

export default sidebarItem;