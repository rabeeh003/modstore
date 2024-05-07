import React from 'react'
import AvatarComponent from './components/AvatarComponent';
import AppSlider from './components/AppSlider';
import Banner from './components/Banner';

function Home() {
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
        <>
        <Banner/>
        <div className='container mx-auto px-10 mt-4'>
            <AppSlider list={list} title={'Android mods'} />
            <div className='flex flex-wrap m-auto justify-between'>
                <AvatarComponent title='Games' />
                <AvatarComponent />
                <div className='hidden md:flex justify-between'>
                <AvatarComponent title='Tools' />
                </div>
                <div className='hidden md:flex justify-between'>
                <AvatarComponent title='Hacking' />
                </div>
                <div className='hidden lg:flex justify-between'>
                    <AvatarComponent />
                </div>
                <div className='hidden lg:flex justify-between'>
                    <AvatarComponent />
                </div>
            </div>
            <AppSlider list={list} title={'Windows mods'} />
            <div className='flex flex-wrap m-auto justify-between'>
                <AvatarComponent title='Games' />
                <AvatarComponent />
                <div className='hidden md:flex justify-between'>
                <AvatarComponent title='Tools' />
                </div>
                <div className='hidden md:flex justify-between'>
                <AvatarComponent title='Hacking' />
                </div>
                <div className='hidden lg:flex justify-between'>
                    <AvatarComponent title='Racing' />
                </div>
                <div className='hidden lg:flex justify-between'>
                    <AvatarComponent />
                </div>
            </div>
        </div>
        </>
    );
}

export default Home