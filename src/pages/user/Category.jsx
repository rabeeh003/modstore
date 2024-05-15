import { Search } from 'lucide-react'
import React from 'react'
import AppCart from './components/AppCart';
import { Link } from 'react-router-dom';
import listData from '../../assets/Applist.json'
function Category({ tab }) {
    return (
        <div className='container mx-auto px-5 sm:px-10 mt-4'>
            <div className='flex justify-between'>
                <span className='text-xl font-bold font-mono'>{tab}</span>
                <Search/>
            </div>
            <div className='pt-3 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {listData.map((item, index)=>(
                    <Link className='m-auto' to={'/appid'}>
                        <AppCart key={index} item={item} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category