import React, { useEffect } from 'react';

const AdsComponent = () => {
    // useEffect(() => {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    // }, []);

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        catch (e) {
            console.log("google add windo push error");
            
        }
    },[]);

    return (
        <div>
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-1420590906206814"
                data-ad-slot="4281835525"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdsComponent;