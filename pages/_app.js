import '../styles/globals.css'
import Layout from '../components/Layout'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults]= useState([]);
	const [posts, setPosts] = useState([]);
	
	
	useEffect(()=>{
		const fetchData = async ()=>{
			const res = await fetch('http://localhost:3500/items')
			const data = await res.json()
			
			setPosts(data)
		}
		fetchData()
	},[])
  return ( <Layout search={search} setSearch={setSearch}>
  	<Component posts={posts} {...pageProps} />
  	</Layout>
  	)
}

export default MyApp
