import { Button, Textarea } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from './utils/constData';
import Axios from './utils/axios';

function Advertisement() {
    const [ads, setAds] = useState([]);
    const [adHome, setAdHome] = useState("");
    const [adDownload, setAdDownload] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get(BaseUrl + 'ads/')
            .then((res) => {
                console.log(res.data);
                setAds(res.data.results);
                res.data.results.forEach(ad => {
                    if (ad.title === "home") {
                        setAdHome(ad.code);
                    } else if (ad.title === "download") {
                        setAdDownload(ad.code);
                    }
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const updateAd = (title, content) => {
        const adToUpdate = ads.find(ad => ad.title === title);

        if (adToUpdate) {
            // Ad exists, update it
            Axios.put(`${BaseUrl}ads/${adToUpdate.id}/`, { code: content })
                .then((res) => {
                    console.log('Ad updated:', res.data);
                    setAds(ads.map(ad => ad.id === adToUpdate.id ? res.data : ad));
                })
                .catch(err => console.error(err));
        } else {
            // Ad does not exist, create it
            Axios.post(`${BaseUrl}ads/`, { title, code: content })
                .then((res) => {
                    console.log('Ad created:', res.data);
                    setAds([...ads, res.data]);
                    // Update the relevant state
                    if (title === "home") {
                        setAdHome(res.data.content);
                    } else if (title === "download") {
                        setAdDownload(res.data.content);
                    }
                })
                .catch(err => console.error(err));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container m-auto py-10 px-3'>
            <span className='text-xl font-semibold'>Home Advertisement</span>
            <div className='pt-5 pb-10'>
                <Textarea
                    placeholder="Paste your advertisement iframe code"
                    value={adHome}
                    onChange={(e) => setAdHome(e.target.value)}
                    description="This advertisement displays on the Home page."
                />
                <Button
                    variant='bordered'
                    className='bg-success-400 font-bold mt-2'
                    onClick={() => updateAd('home', adHome)}
                >
                    {ads.find(ad => ad.title === 'home') ? "Update" : "Create"}
                </Button>
            </div>
            <span className='text-xl font-semibold'>Download Advertisement</span>
            <div className='pt-5 mb-10'>
                <Textarea
                    placeholder="Paste your advertisement iframe code"
                    value={adDownload}
                    onChange={(e) => setAdDownload(e.target.value)}
                    description="This advertisement displays on the download popup."
                />
                <Button
                    variant='bordered'
                    className='bg-success-400 font-bold mt-2'
                    onClick={() => updateAd('download', adDownload)}
                >
                    {ads.find(ad => ad.title === 'download') ? "Update" : "Create"}
                </Button>
            </div>
        </div>
    );
}

export default Advertisement;
