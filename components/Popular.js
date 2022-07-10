import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import Author from './_child/Author';
import Error from './_child/Error';
import Spinner from './_child/Spinner';
import Fetcher from '../lib/fetcher';

export default function Popular() {
  const { data, isLoading, isError } = Fetcher('api/popular');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className='layout py-16'>
      <h1 className='font-bold text-4xl py-12 text-center'>Popular Post</h1>

      <Swiper 
      breakpoints={{
        640:{
          slidesPerView: 2,
          spaceBetween: 30
        }
      }}
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Post data={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Post({ data }) {
  const { id, img, category, published, title, subtitle, author } = data;
  return (
    <div className='grid'>
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

      <div className='info flex justify-center flex-col py-4 mr-1'>
        <div className='category'>
          <Link href={`/posts/${id}`}>
            <a className='text-orange-600 hover:text-orange-800'>
              {category || 'category'}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className='text-gray-800 hover:text-gray-600'>
              - {published || 'published'}
            </a>
          </Link>
        </div>

        <div className='title'>
          <Link href={`/posts/${id}`}>
            <a className='text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600'>
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
