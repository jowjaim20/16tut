import Post from './Post'

const Feed =({posts})=>{
	return (
		<article className='p-2 flex flex-col items-center text-gray-900 font-bold bg-blue-300 gap-2'>
			{
				posts.map((post)=> (<Post key={post.id} {...post} />))
			}
		</article>
		)
}


export default Feed;