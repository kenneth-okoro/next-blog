import Category from '../components/Category';
import Latest from '../components/Latest';
import Popular from '../components/Popular';
import Trending from '../components/Trending';
import Format from '../layout/Layout';

export default function Home() {
  return (
    <Format>
      <Trending /> 
      <Latest />   
      <Popular />
      <Category />         
    </Format>
    )
}
