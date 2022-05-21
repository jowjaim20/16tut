import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'


const Layout =({children, search, setSearch})=>{
	return (
		<div>
		<Header/>
		<Nav search={search} setSearch={setSearch} />
		
	{children}
	
	<Footer/>
		</div>
		)
}


export default Layout;