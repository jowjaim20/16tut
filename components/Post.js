import Link from 'next/link'
const Post =({title, body, datetime, id})=>{
	return (
		<div className='rounded bg-white w-11/12 flex flex-col justify-center shadow items-center overflow-hidden'>
			<Link  href={`/postpage/${id}`}>
				<a className='w-full text-center'>
					<h1 className=" bg-blue-600 w-full ">{title}</h1>
					<time>{datetime}</time>
					<p>{body.length <= 25? body : `${body.slice(0, 25)}...` }
					</p>
				</a>
			</Link>
		</div>
		)
}


export default Post;