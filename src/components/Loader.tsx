import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Arial, sans-serif',
                color: '#333'
            }}>
                <div style={{
                    width: '200px',
                    height: '2px',
                    background: 'linear-gradient(to right, #C0C0C0, #FFD700)',
                    borderRadius: '1px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(to right, #FFD700, #C0C0C0)',
                        transition: 'width 0.5s',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        boxShadow: '0 0 10px #FFD700'
                    }} />
                </div>
                <div style={{
                    width: '40px',
                    height: '40px',
                    // borderRadius: '50%',
                    // border: '2px solid #FFD700',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    // background: 'radial-gradient(circle, #FFD700, #C0C0C0)',
                    //   boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
                }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {progress.toFixed(0)}%
                    </span>
                </div>
                {/* <p style={{
                    marginTop: '15px',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(to right, #C0C0C0, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Loading Elegance
                </p> */}
            </div>
        </Html>
    );
};

export default Loader;
