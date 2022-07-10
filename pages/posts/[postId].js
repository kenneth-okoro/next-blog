import Image from 'next/image';
import Author from '../../components/_child/Author';
import Error from '../../components/_child/Error';
import Related from '../../components/_child/Related';
import Spinner from '../../components/_child/Spinner';
import Format from '../../layout/Layout';
import Fetcher from '../../lib/fetcher';
import getPost from '../../lib/helper';
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'

export default function Page({ fallback }){
  const router = useRouter()
  const { postId } = router.query;
  
  const { data, isLoading, isError } = Fetcher(`api/posts/${postId}`)
  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <SWRConfig value={{ fallback }}>
      <Article {...data} />
    </SWRConfig>
  );
}

function Article({ title, img, subtitle, description, author}) {  
  return (
    <Format>
      <section className='container mx-auto md:px-2 py-16 w-1/2'>
        <div className='flex justify-center'>
          {author ? <Author {...author} /> : <></>}
        </div>

        <div className='post py-10'>
          <h1 className='font-bold text-4xl text-center pb-5'>
            {title || 'title'}
          </h1>
          <p className='text-gray-500 text-xl text-center'>
            {subtitle || 'subtitle'}
          </p>
          <div className='py-10'>
            <Image src={img || '/'} width={900} height={600} alt='' />
          </div>
          <div className='content text-gray-600 text-lg flex flex-col gap-4'>
            {description || 'description'}
          </div>
        </div>

        <Related />
      </section>
    </Format>
  );
}

export async function getStaticProps({ params }){
  const posts = await getPost(params.postId)

  return {
    props: {
      fallback: {
        'api/posts' : posts
      }
    }
  }
}

export async function getStaticPaths(){
  const posts = await getPost()

  const paths = posts.map(value => {
    return {
      params : {
        postId : value.id.toString()
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}
