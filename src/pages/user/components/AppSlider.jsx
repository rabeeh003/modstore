import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppCart from './AppCart';

function AppSlider({ list, title, idd, route }) {
    const rightMove = () => {
        var slider = document.getElementById(idd);
        slider.scrollLeft = slider.scrollLeft + 500;
    };
    const leftMove = () => {
        var slider = document.getElementById(idd);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const [showButtons, setShowButtons] = useState(false);

    return (
        <div>
            <Link to={route}>
                <div className="flex align-middle justify-between">
                    <span className="text-2xl font-bold">{title}</span>
                    <ChevronRight className="my-auto" />
                </div>
            </Link>
            <div
                className="flex gap-3 mt-4 align-middle items-center justify-between relative group"
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
            >
                <button
                    className={`hidden sm:flex bg-green-400 p-2 rounded-full font-bold absolute top-[40%] z-20 -left-3 transition-opacity duration-300 ${
                        showButtons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={leftMove}
                >
                    <ArrowLeft />
                </button>
                <div
                    id={idd}
                    className="h-full flex gap-5 md:gap-10 w-full py-3 sm:px-8 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide md:scrollbar-default"
                >
                    {list?.map((item, index) => (
                        <div key={index} className="max-w-[180px] flex-none">
                            <AppCart key={index} item={item} />
                        </div>
                    ))}
                </div>
                <button
                    className={`hidden sm:flex bg-green-400 p-2 rounded-full font-bold absolute top-[40%] z-20 -right-5 transition-opacity duration-300 ${
                        showButtons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={rightMove}
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
}

export default AppSlider;
