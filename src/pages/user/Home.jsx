import React, { useEffect } from 'react'
import AvatarComponent from './components/AvatarComponent';
import AppSlider from './components/AppSlider';
import Banner from './components/Banner';
import listData from '../../assets/Applist.json'

function Home() {

    return (
        <>
            <Banner />
            <div className='container mx-auto px-5 sm:px-10 mt-4'>
                <AppSlider list={listData} title={'Android mods'} idd={'android'} route={'/android'} />
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
                <AppSlider list={listData} title={'Windows mods'} idd={"windo"} route={'/windows'} />
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