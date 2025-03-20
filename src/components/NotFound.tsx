"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '@/app/style/NotFound.module.css';

function NotFound() {
    const [visibleFlowers, setVisibleFlowers] = useState<number[]>([]);

    useEffect(() => {
        const handleVisibility = () => {
            setVisibleFlowers(
                Array.from({ length: 10 }, (_, index) => index)
            );
        };

        handleVisibility();
        window.addEventListener("resize", handleVisibility);
        return () => window.removeEventListener("resize", handleVisibility);
    }, []);

    return (
        <main className='overflow-hidden h-screen text-primary'>
            <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
                <div className='w-[500px] h-[400px] text-center'>
                    <h1 className='text-[128px] font-bold text-primary '>
                        ៤០៤
                    </h1>
                    <h1 className='text-header text-black mt-[9px] mb-[33px]'>Opps! Page not found</h1>
                    <p className='text-paragraph16_regular text-placeholder_color'>The page you were looking for doesn’t exist. You may have mistypes the address or the page may have moved. </p>
                    <div className='ml-[35%] mt-10'>
                        <div>
                            <Link className='bg-red-700 ' href={"/admin/dashboard"}>
                                <div className='bg-primary w-[150px] py-[13px] px-[28px] rounded-[50px] text-white text-paragraph14_medium'>
                                    &#10094;&emsp;Back
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <img src="/icons/flower2.svg" alt="" className='absolute top-0 left-2 w-[180px] fallingImage'/>
                <img src="/icons/flower2.svg" alt="" className='absolute top-[-40px] left-[580px] '/>
                <img src="/icons/flower2.svg" alt="" className='absolute top-20 left-[600px]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute top-[-70px] left-[640px]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute top-[-120px] left-[710px]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-[45%] -rotate-90 left-0'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-[30%] left-[-120px]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-[-100px] -rotate-90 left-[670px]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-[-170px] left-[-180px] '/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-32 rotate-45 h-[100px] left-[380px]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-[-50px]  left-[500px] -z-40'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-[-50px]  left-[50%]'/>
                <img src="/icons/flower2.svg" alt="" className='absolute bottom-0 rotate-90 right-[-40px] w-[250px] fallingImage'/>

            {/* Rain Drops with text-primary color */}
            {Array.from({ length: 50 }).map((_, index) => (
                <div
                    key={index}
                    className={`${styles.rainDrop} absolute`}
                    style={{
                        left: `${Math.random() * 100}vw`,
                        top: `${Math.random() * -10}vh`,
                        "--i": index
                    } as React.CSSProperties}
                />
            ))}
            </div>
        </main>
    );
}

export default NotFound;
