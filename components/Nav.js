import Link from 'next/link'

const Nav =({search, setSearch})=>{
	return (
		<nav className='flex p-1 text-gray-900 font-bold bg-gray-800 '>
		<form className='' onSubmit={(e)=>e.preventDefault()}>
			<label HTMLFor='search' className='hidden'>
			search post
			</label>
			<input 
				id='search'
				type='text'
				placeholder='search post'
				value={search}
				onChange={(e)=>{setSearch(e.target.value)}}
			>
			</input>
			<ul className='flex gap-3 text-white'>
				<li><Link href="/"><a>Home</a></Link></li>
				<li><Link href="/postpage"><a>Post</a></Link></li>
				<li><Link href="/about"><a>About</a></Link></li>
			</ul>
		
		</form>
		</nav>
		)
}


export default Nav;