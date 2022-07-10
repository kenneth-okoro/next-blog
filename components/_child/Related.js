import Image from "next/image";
import Link from "next/link";
import Fetcher from "../../lib/fetcher";
import Author from "./Author";
import Error from "./Error";
import Spinner from "./Spinner";

export default function Related() {
  
  const { data, isLoading, isError } = Fetcher('api/popular');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
 return (
   <section className='pt-20'>
     <h1 className='font-bold text-3xl py-10'>Related</h1>
     <div className="flex flex-col gap-10">
     {
      data.map((value, index) => (
        <Post data={value} key={index} />
      ))
     }
     </div>
   </section>
 );
}

function Post( { data }){
  const { id, title, img, category, published, author } = data

 return (
   <div className='flex gap-5'>
     <div className='image flex flex-col justify-start'>
       <Link href={`/posts/${id}`}>
         <a>
           <Image
             src={img || '/'}
             width={300}
             height={220}
             className='rounded'
             alt=''
           /> 
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