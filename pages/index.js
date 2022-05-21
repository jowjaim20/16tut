import styles from '../styles/Home.module.css'
import Feed from '../components/Feed'


export default function Home({posts}) {
  return (
			<main className=''>
				{posts.length? (<Feed posts={posts}/>): 
				(<p>
				No post to display
				</p>)}
			</main>
  );
}
