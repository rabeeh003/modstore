import React, { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react';
import AvatarComponent from './components/AvatarComponent';
import AppSlider from './components/AppSlider';
import Banner from './components/Banner';
import listData from '../../assets/Applist.json'
import axios from 'axios';
import serverDown from '../../assets/serverdown.png'

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isDown, setDown] = useState(false)
    const [labels, setLabels] = useState([])
    const [apps, setApps] = useState([])
    const [android, setAndroid] = useState([])
    const [windows, setWindows] = useState([])


    useEffect(() => {
        setIsLoading(true);
        console.log("start to fetch data ");
        axios.get("http://127.0.0.1:8000/labels/").then((res)=>setLabels(res.data)).catch((err)=>setDown(true))
        axios.get("http://127.0.0.1:8000/apps/").then((res) => {
            console.log("apps", res.data)
            setApps(res.data)
            setIsLoading(false);
        }).catch((err) => {
            console.log(err)
            setDown(true)
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        const and = apps.filter((data) => data.category == "android")
        const win = apps.filter((data) => data.category == "windows")
        setWindows(win)
        setAndroid(and)
    }, [apps, setWindows, setAndroid])

    return (
        <div>
            {isLoading ? (
                <div className='flex justify-center'>
                    <Spinner color="success"></Spinner>
                </div>
            ) : (
                <>
                    {!isDown ? (
                        <div>
                            <Banner />
                            <div className='container mx-auto px-5 sm:px-10 mt-4'>
                                {android.length > 0 && (
                                    <>
                                        <AppSlider list={android} title={'Android mods'} idd={'android'} route={'/android'} />
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
                                    </>
                                )}
                                {windows.length > 0 && (
                                    <>
                                        <AppSlider list={windows} title={'Windows mods'} idd={"windo"} route={'/windows'} />
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
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center h-[70vh]'>
                            <img src={serverDown} alt="server down" />
                            <h3 className='text-center'>sorry, server down</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home