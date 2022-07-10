import Link from 'next/link';
import { ImFacebook, ImTwitter, ImYoutube } from 'react-icons/im';

export default function Header() {
  return (
    <header className='bg-gray-50'>
      <div className='xl:container xl:mx-auto flex flex-col items-center sm:py-0 sm:flex-row sm:justify-between text-center py-3'>
        <div className='md:flex-none w-96 order-2 sm:order-1 flex justify-center py-0 sm:py-0 my-2'>
          <input type='text' className='input-text' placeholder='Search...' />
        </div>
        <div className='shrink w-80 sm:order-2 my-2'>
          <Link href={'/'}>
            <a className='font-bold uppercase text-3xl'>keo</a>
          </Link>
        </div>
        <div className='w-96 order-3 flex justify-center'>
          <div className='flex gap-6 my-2'>
            <Link href={'/'}>
              <a><ImFacebook color='#888' /></a>
            </Link>
            <Link href={'/'}>
              <a><ImTwitter color='#888' /></a>
            </Link>
            <Link href={'/'}>
              <a><ImYoutube color='#888' /></a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
