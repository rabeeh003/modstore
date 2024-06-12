import { LoaderIcon, Search, ShieldAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SuggestBlogCard from './components/SuggestBlogCard';
import { BaseUrl } from '../admin/utils/constData';

function BlogList() {
    const [isLoading, setIsLoading] = useState(true);
    const [apps, setApps] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [down, setDown] = useState(false);
    const [next, setNext] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(BaseUrl+"blog/")
            .then((res) => {
                console.log("apps", res.data);
                setApps(res.data.results);
                setNext(res.data.next);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDown(true);
                setIsLoading(false);
            });
    }, []);

    const moreData = () => {
        if (!next) return;
        axios.get(next)
            .then((res) => {
                setApps((prev) => [...prev, ...res.data.results]);
                setNext(res.data.next);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (searchQuery) {
            const filtered = apps.filter((app) =>
                app.head.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredApps(filtered);
        } else {
            setFilteredApps(apps);
        }
    }, [searchQuery, apps]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (down) {
        return <div>Error loading data</div>;
    }

    return (
        <div className='container mx-auto px-5 sm:px-10 mt-4'>
            <div className='flex justify-between items-center'>
                <span className='text-xl font-bold font-mono'>Blog</span>
                <div className='flex items-center'>
                    <Input
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        clearable
                    />
                    <Search className='ml-2' />
                </div>
            </div>
            {filteredApps.length > 0 ? (
                <InfiniteScroll
                    dataLength={filteredApps.length}
                    next={moreData}
                    hasMore={!!next}
                    loader={<div className='text-center'><LoaderIcon /> Loading...</div>}
                    endMessage={
                        <div className='text-center py-3'>
                            <b>Yay! You have seen it all</b>
                        </div>
                    }
                >
                    <div className='pt-3 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {filteredApps.map((data) => (
                            <Link key={data.id} to={`/blog/${data.id}`}>
                                <SuggestBlogCard data={data} />
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
        </div>
    );
}

export default BlogList;
