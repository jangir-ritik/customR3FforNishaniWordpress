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
                color: '#333',
            }}>
                <div style={{
                    width: '200px',
                    height: '2px',
                    background: '#dbdbdb',
                    borderRadius: '1px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(to right, #ff0023, #FF2C5A)',
                        transition: 'width 0.5s',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }} />
                </div>
                <div style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {progress.toFixed(0)}%
                    </span>
                </div>
            </div>
        </Html>
    );
};

export default Loader;
