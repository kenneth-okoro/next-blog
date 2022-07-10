import Image from 'next/image';
import Link from 'next/link';
import Author from './_child/Author';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import Fetcher from '../lib/fetcher';
import Error from './_child/Error';
import Spinner from './_child/Spinner';

export default function Trending() {
  
  const { data, isLoading, isError } = Fetcher('api/trending');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  // SwiperCore.use([Autoplay]);

  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: 'right',
  };

  return (
    <section className='py-16' style={bg}>
      <div className='layout'>
        <h1 className='font-bold text-4xl pb-12 text-center'>Trending</h1>

        <Swiper
          slidesPerView={1}
          // loop={true}
          // autoplay={{
          //   delay: 2000,
          // }}
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <Post data={value} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, img, category, published, title, subtitle, author } = data
  return (
    <div className='grid md:grid-cols-2'>
      <div className='image'>
        <Link href={`/posts/${id}`}>
          <a>
            <Image src={img || '/'} width={600} height={600} alt='' />
          </a>
        </Link>
      </div>

      <div className='info flex justify-center flex-col'>
        <div className='category'>
          <Link href={`/posts/${id}`}>
            <a className='text-orange-600 hover:text-orange-800'>
              {category || 'category'}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className='text-gray-800 hover:text-gray-600'>- {published || 'published'}</a>
          </Link>
        </div>
        <div className='title'>
          <Link href={`/posts/${id}`}>
            <a className='text-3xl lg:text-6xl font-bold text-gray-800 hover:text-gray-600'>
              {title || 'title'}              
            </a>
          </Link>
        </div>
          <p className='text-gray-500 py-3'>
            {subtitle || 'subtitle'}
          </p>
          {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
