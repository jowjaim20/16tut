export const getStaticPaths = async ()=>{
	const res = await fetch('http://localhost:3500/items')
	const data = await res.json()
	
	const paths = data.map((data)=>{
		return{
			params: { id: data.id.toString()}
			
		}})
	return {
		paths,
		fallback: false
	}
}
export const getStaticProps = async ({params})=>{
	const id = params.id
	const res = await fetch('http://localhost:3500/items/'+id)
	const data = await res.json()
	
	return{
		props: {post:data}
	}
}

const SinglePost =({post})=>{
	return(
		<div className='shadow p-1'>
			<h2>{post.title}</h2>
			<p>{post.datetime}</p>
			<p>{post.body}</p>
			<button className="text-white shadow bg-red-500 rounded px-4 py-1">Delete</button>
		</div>
		)
}

export default SinglePost;