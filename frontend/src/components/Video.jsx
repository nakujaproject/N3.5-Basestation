import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import {VIDEO_IP} from './defs.js'


const Video = () => {
    const imageRef = useRef(null);
    const [stream, setStream] = useState(false);
    const [frame, setFrame] = useState("");

    const animate = () => {
        gsap.to(imageRef.current, {
            rotation: '+=360',
            scale: 0.5,
            repeat: -1,
            yoyo: true,
            duration: 0.7,
            ease: 'power2.inOut',
        });
    };

   
    useEffect(() => {
        animate();
        setStream(true); // Assuming the stream is always available from the server

        return () => {
            setStream(false);
        };
    }, []);

    return (
        <div className="w-full h-[297px] md:h-[603px] lg:h-[500px] bg-black flex justify-center items-center">
            {!stream && (
                <div ref={imageRef}>
                    <img
                        alt="logo"
                        src="/nakuja_logo.png"
                        width="90"
                        height="80"
                    />
                </div>
            )}
            {stream && (
                <img className="text-white w-full h-full" src={'http://' + VIDEO_IP + '/stream.mjpg'} alt="streaming..." />
            )}
        </div>
    );
};

export default Video;
