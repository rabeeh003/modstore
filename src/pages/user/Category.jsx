import { LoaderIcon, Search, ShieldAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AppCart from './components/AppCart';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Spinner } from '@nextui-org/react';
import { BaseUrl } from '../admin/utils/constData';
import InfiniteScroll from 'react-infinite-scroll-component';

function Category() {
    const { category } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    // const [apps, setApps] = useState([]);
    const [crApps, setCrApps] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [down, setDown] = useState(false);
    const [next, setNext] = useState(null);
    const [filterNext, setFilterNext] = useState(null)
    const validCategories = ['android', 'windows'];

    useEffect(() => {
        if (!validCategories.includes(category.toLowerCase())) {
            setCrApps([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        console.log("Start to fetch data ");
        axios.get(BaseUrl + `apps?category=${category.toLowerCase()}`)
            .then((res) => {
                console.log("apps", res.data);
                setCrApps(res.data.results);
                setNext(res.data.next);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDown(true);
                setIsLoading(false);
            });
    }, [category]);

    const moreData = () => {
        if (!next) return;
        axios.get(next)
            .then((res) => {
                setCrApps((prev) => [...prev, ...res.data.results]);
                setNext(res.data.next);
            })
            .catch((err) => console.error(err));
    };

    const filterMoreData = () => {
        if (!filterNext) return;
        axios.get(filterNext)
            .then((res) => {
                setFilteredApps((prev) => [...prev, ...res.data.results]);
                setFilterNext(res.data.next);
            })
            .catch((err) => console.error(err));
    };

    // useEffect(() => {
    //     if (searchQuery) {
    //         const filtered = crApps.filter((app) =>
    //             app.name.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         setFilteredApps(filtered);
    //     } else {
    //         setFilteredApps(crApps);
    //     }
    // }, [searchQuery, crApps]);

    const filtering = () => {
        console.log("searching to backend");
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        // if (labels) labels.forEach(label => params.append('labels', label));
        if (searchQuery) params.append('search', searchQuery);
        // if (searchQuery) params.append('labels', 2);
        // setSearchErr('')
        axios.get(BaseUrl + `apps/?${params.toString()}`)
            .then((res) => {
                // console.log('Filtered Apps:', res.data)
                // if (res.data.results.length == 0) {
                //     // setSearchErr("sorry data not fond !")                    
                // }else{
                //     // setSearchErr('')
                // }
                setFilteredApps(res.data.results)

            })
            .catch(err => console.log(" err ", err))
    }

    if (isLoading) {
        return (
            <div className='flex justify-center h-screen'>
                <Spinner color="success"></Spinner>
            </div>
        );
    }

    if (down) {
        return (
            <div className='flex justify-center h-screen'>
                <p className='text-center text-danger-400 m-auto'>Somthing wrong</p>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-5 sm:px-10 mt-4'>
            <div className='flex justify-between items-center'>
                <span className='text-xl font-bold font-mono'>{category}</span>
                <div className='flex items-center'>
                    <Input
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        clearable
                    />
                    <Search onClick={() => filtering()} className='ml-2' />
                </div>
            </div>
            {crApps.length > 0 ? (
                <>
                    {filteredApps && searchQuery ? (
                        <>
                            {filteredApps.length > 0 ? (
                                <InfiniteScroll
                                    dataLength={filteredApps.length}
                                    next={filterMoreData}
                                    hasMore={!!filterNext}
                                    loader={<div className='text-center'><LoaderIcon /> Loading...</div>}
                                    endMessage={
                                        <div className='text-center py-3'>
                                            <b>Yay! You have seen it all</b>
                                        </div>
                                    }
                                >
                                    <div className='pt-3 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                                        {filteredApps.map((item, index) => (
                                            <Link key={index} to={`/apps/${item.id}`} state={{ appData: item }} className='max-w-[180px] flex-none' >
                                                <AppCart key={index} item={item} />
                                            </Link>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            ) : (
                                <div className='flex flex-col justify-center h-[80vh] items-center'>
                                    <div className='flex justify-center pb-5'>
                                        <ShieldAlert />
                                        <span className='px-2'>oops!. "{searchQuery}" data not found.</span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <InfiniteScroll
                                dataLength={crApps.length}
                                next={moreData}
                                hasMore={!!next}
                                loader={<div className='text-center'><LoaderIcon /> Loading...</div>}
                                endMessage={
                                    <div className='text-center py-3'>
                                        <p>Yay! You have seen it all</p>
                                    </div>
                                }
                            >
                                <div className='pt-3 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                                    {crApps.map((item, index) => (
                                        <Link key={index} to={`/apps/${item.id}`} state={{ appData: item }} className='max-w-[180px] flex-none' >
                                            <AppCart key={index} item={item} />
                                        </Link>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </>
                    )}
                </>
            ) : (
                <div className='flex flex-col justify-center h-[80vh] items-center'>
                    <div className='flex justify-center pb-5'>
                        <ShieldAlert />
                        <span className='px-2'> "{category}" data not found. Change URL.</span>
                    </div>
                    <Link to={'/'}>
                        <Button variant='shadow' className='bg-green-500'>Home</Button>
                    </Link>
                </div>
            )
            }
        </div >
    );
}

export default Category;
