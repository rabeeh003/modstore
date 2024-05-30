import { Search, ShieldAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AppCart from './components/AppCart';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';

function Category() {
    const { category } = useParams();  // Access category from the URL

    const [isLoading, setIsLoading] = useState(true);
    const [apps, setApps] = useState([]);
    const [crApps, setCrApps] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [down, setDown] = useState(false);

    const validCategories = ['android', 'windows']; // Define valid categories

    useEffect(() => {
        if (!validCategories.includes(category.toLowerCase())) {
            setCrApps([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        console.log("Start to fetch data ");
        axios.get("http://127.0.0.1:8000/apps/")
            .then((res) => {
                console.log("apps", res.data);
                setApps(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDown(true);
                setIsLoading(false);
            });
    }, [category]);

    useEffect(() => {
        if (category.toLowerCase() === 'android') {
            const and = apps.filter((data) => data.category.toLowerCase() === 'android');
            setCrApps(and);
        } else if (category.toLowerCase() === 'windows') {
            const win = apps.filter((data) => data.category.toLowerCase() === 'windows');
            setCrApps(win);
        }
    }, [apps, category]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = crApps.filter((app) =>
                app.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredApps(filtered);
        } else {
            setFilteredApps(crApps);
        }
    }, [searchQuery, crApps]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (down) {
        return <div>Error loading data</div>;
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
                    <Search className='ml-2' />
                </div>
            </div>
            {crApps.length > 0 ? (

                <>
                    {filteredApps.length > 0 ? (
                        <div className='pt-3 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                            {filteredApps.map((item, index) => (
                                <Link key={index} to={`/apps/${item.id}`} state={{ appData: item }} className='max-w-[180px] flex-none' >
                                    <AppCart key={index} item={item} />
                                </Link>
                            ))}
                        </div>
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
                <div className='flex flex-col justify-center h-[80vh] items-center'>
                    <div className='flex justify-center pb-5'>
                        <ShieldAlert />
                        <span className='px-2'> "{category}" data not found. Change URL.</span>
                    </div>
                    <Link to={'/'}>
                        <Button variant='shadow' className='bg-green-500'>Home</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Category;
