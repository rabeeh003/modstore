import { Search } from 'lucide-react'
import React from 'react'
import AppCart from './components/AppCart';
import { Link } from 'react-router-dom';

function Category({ tab }) {
    const list = [
        {
            title: "Orange",
            img: "https://cdn-teams-slug.flaticon.com/google.jpg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$5.30",
        },
        {
            title: "Avocado",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$15.70",
        },
        {
            title: "Lemon 2",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$8.00",
        },
        {
            title: "Banana",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$7.50",
        },
        {
            title: "Watermelon",
            img: "https://icon-library.com/images/ios-7-app-icon/ios-7-app-icon-6.jpg",
            price: "$12.20",
        },
    ];

    return (
        <div className='container mx-auto px-5 sm:px-10 mt-4'>
            <div className='flex justify-between'>
                <span className='text-xl font-bold font-mono'>{tab}</span>
                <Search/>
            </div>
            <div className='pt-3 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {list.map((item, index)=>(
                    <Link className='m-auto' to={'/appid'}>
                        <AppCart key={index} item={item} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category