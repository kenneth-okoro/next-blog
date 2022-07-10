import Image from "next/image";
import Link from "next/link";
import Fetcher from "../lib/fetcher";
import Author from "./_child/Author";
import Error from "./_child/Error";
import Spinner from "./_child/Spinner";

export default function Category() {
  
  const { data, isLoading, isError } = Fetcher('api/popular');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
 return (
   <section className='layout py-16'>
     <div className='grid lg:grid-cols-2'>

       <div className='item'>
         <h1 className='font-bold text-4xl py-12'>Business</h1>
         <div className="flex flex-col gap-6">          
          {data[1] ? <Post data={data[1]} /> : <></>}
          {data[2] ? <Post data={data[2]} /> : <></>}
          {data[3] ? <Post data={data[3]} /> : <></>}
         </div>
       </div>

       <div className='item'>
         <h1 className='font-bold text-4xl py-12'>Travel</h1>
         <div className="flex flex-col gap-6">
          {data[4] ? <Post data={data[4]} /> : <></>}          
          {data[2] ? <Post data={data[2]} /> : <></>}
         </div>
       </div>

     </div>
   </section>
 );
}

function Post({ data }){
  const { id, img, category, published, title, author } = data
 return (
   <div className='flex gap-5'>
     <div className='image flex flex-col justify-start'>
       <Link href={`/posts/${id}`}>
         <a>
           <Image
             src={img || '/'}
             width={300}
             height={250}
             className='rounded'
             alt=''
           />
         </a>
       </Link>
     </div>

     <div className='info flex justify-center flex-col'>
       <div className='category'>
         <Link href={'/'}>
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
           <a className='text-xl font-bold text-gray-800 hover:text-gray-600'>
             {title || 'title'}
           </a>
         </Link>
       </div>
       {author ? <Author {...author} /> : <></>}
     </div>
   </div>
 );
}