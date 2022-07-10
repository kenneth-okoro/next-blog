import Image from 'next/image';
import Link from 'next/link';
import Author from './_child/Author';
import Fetcher from '../lib/fetcher';
import Spinner from './_child/Spinner';
import Error from './_child/Error';

export default function Latest() {
  const { data, isLoading, isError } = Fetcher('api/posts');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className='layout py-10'>
      <h1 className='font-bold text-4xl py-12 text-center'>Latest Post</h1>
      {/* grid columns */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-14'>
        {data.map((value, index) => (
          <Post data={value} key={index} />
        ))}
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, img, category, published, subtitle, title, author } = data;
  return (
    <div className='item'>
      <div className='images'>
        <Link href={`/posts/${id}`}>
          <a>
            <Image
              src={img || '/'}
              width={500}
              height={350}
              className='rounded'
              alt=''
            />
          </a>
        </Link>
      </div>

      <div className='info flex justify-center flex-col py-4'>
        <div className='category'>
          <Link href={`/posts/${id}`}>
            <a className='text-orange-600 hover:text-orange-800'>
              {category || 'category'}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className='text-gray-800 hover:text-gray-600'>
              - {published || 'category'}
            </a>
          </Link>
        </div>

        <div className='title'>
          <Link href={`/posts/${id}`}>
            <a className='text-xl font-bold text-gray-800 hover:text-gray-600'>
              {title || 'title'}
            </a>
          </Link>
        </div>
        <p className='text-gray-500 py-3'>{subtitle || 'subtitle'}</p>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
