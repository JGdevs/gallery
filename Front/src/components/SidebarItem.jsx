const sidebarItem = ({name,index}) => {

	return (

		<option className="sidebar-item" value={index}>{name}</option>

	)

}

export default sidebarItem;