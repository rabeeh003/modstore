import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';
import AppSlider from './components/AppSlider';
import Banner from './components/Banner';
import axios from 'axios';
import serverDown from '../../assets/serverdown.png';
import AppCart from './components/AppCart';
import { Link } from 'react-router-dom';
import BlogCard from './components/BlogCard';
import { BaseUrl } from '../admin/utils/constData';
import { ChevronRight } from 'lucide-react';
// import { error } from 'jodit/types/core/helpers';

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isDown, setDown] = useState(false);
    const [labels, setLabels] = useState([]);
    const [apps, setApps] = useState([]);
    const [android, setAndroid] = useState([]);
    const [windows, setWindows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [blog, setBlog] = useState([]);
    const [filteredApps, setFilteredApps] = useState([])
    const [searchErr, setSearchErr] = useState('')

    useEffect(() => {
        setIsLoading(true);
        console.log("Start to fetch data");
        axios.get(BaseUrl + "labels/")
            .then((res) => setLabels(res.data.results))
            .catch((err) => setDown(true));
        axios.get(BaseUrl + "apps/")
            .then((res) => {
                console.log("apps", res.data);
                setApps(res.data.results);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDown(true);
                setIsLoading(false);
            });
        axios.get(BaseUrl + "blog/?length=3")
            .then((res) => {
                console.log("blog", res.data);
                setBlog(res.data.results);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDown(true);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const and = apps.filter((data) => data.category.toLowerCase() === "android");
        const win = apps.filter((data) => data.category.toLowerCase() === "windows");
        setWindows(win);
        setAndroid(and);
    }, [apps]);

    // const filteredApps = apps.filter((app) =>
    //     app.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const filtering = () => {
        console.log("searching to backend");
        const params = new URLSearchParams();
        // if (category) params.append('category', category);
        // if (labels) labels.forEach(label => params.append('labels', label));
        if (searchQuery) params.append('search', searchQuery);
        // if (searchQuery) params.append('labels', 2);
        setSearchErr('')
        axios.get(BaseUrl+`apps/?${params.toString()}`)
            .then((res) => {
                console.log('Filtered Apps:', res.data)
                if (res.data.results.length == 0) {
                    setSearchErr("sorry data not fond !")
                } else {
                    setSearchErr('')
                }
                setFilteredApps(res.data.results)

            })
            .catch(err => console.log(" err ", err))
    }

    return (
        <div>
            {isLoading ? (
                <div className='flex justify-center h-screen'>
                    <Spinner color="success"></Spinner>
                </div>
            ) : (
                <>
                    {!isDown ? (
                        <div>
                            <Banner searchQuery={searchQuery} filtering={filtering} setSearchQuery={setSearchQuery} />
                            <div className='container mx-auto px-5 sm:px-10 mt-4'>
                                {searchQuery && filteredApps ? (
                                    <>
                                        <h2 className='text-2xl'>Search result :</h2>
                                        <div className='pt-3 grid gap-4 pb-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                                            {filteredApps.length > 0 ? (
                                                filteredApps.map((item, index) => (
                                                    <Link key={index} to={`/apps/${item.id}`} state={{ appData: item }} className='max-w-[180px] flex-none'>
                                                        <AppCart key={index} item={item} />
                                                    </Link>
                                                ))
                                            ) : (
                                                <div>{searchErr}</div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {android.length > 0 && (
                                            <>
                                                <AppSlider list={android} title={'Android mods'} idd={'android'} route={'/android'} />
                                                {/* <div className='flex flex-wrap m-auto justify-between'>
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
                                                </div> */}
                                            </>
                                        )}
                                        {windows.length > 0 && (
                                            <>
                                                <AppSlider list={windows} title={'Windows mods'} idd={"windo"} route={'/windows'} />
                                                {/* <div className='flex flex-wrap m-auto justify-between'>
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
                                                </div> */}
                                            </>
                                        )}
                                        <div className='container m-auto'>
                                            <Link to={'/blog'} >
                                                <div className='flex flex-wrap py-6 align-middle justify-between'>
                                                    <span className='text-3xl font-bold'>Blogs</span>
                                                    <ChevronRight className='my-auto' />
                                                </div>
                                            </Link>
                                            <div className='flex gap-2 flex-wrap justify-around flex-reverse'>
                                                {blog.map((data) => (
                                                    <div key={data.id} className='flex-none px-1 sm:px-0 w-full sm:max-w-[45%] lg:max-w-[30%]'>
                                                        <BlogCard data={data} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-full mt-4 rounded-t-2xl bg-black/5 p-4 text-center sticky">
                                            © 2024 Copyright:
                                            <Link to="/"> Modapps</Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center h-[70vh]'>
                            <img src={serverDown} className='max-w-52 m-auto' alt="server down" />
                            <h3 className='text-center'>Sorry, Network error</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;
