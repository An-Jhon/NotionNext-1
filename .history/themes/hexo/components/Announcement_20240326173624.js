import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (post?.blockMap) {
<<<<<<< HEAD
    return <div className={className}>
        <section id='announcement-wrapper' className="dark:text-gray-300 border dark:border-black rounded-xl px-2 py-4 bg-white dark:bg-hexo-black-gray">
=======
    return <div
        className={className}>
        <section id='announcement-wrapper' className="hover:shadow-md dark:text-gray-300 border dark:border-black rounded-xl px-2 py-4 bg-white dark:bg-hexo-black-gray">
>>>>>>> main
            <div><i className='mr-2 fas fa-bullhorn' />{locale.COMMON.ANNOUNCEMENT}</div>
            {post && (<div id="announcement-content">
            <NotionPage post={post} className='text-left' />
        </div>)}
        </section>
    </div>
  } else {
    return <></>
  }
}
export default Announcement