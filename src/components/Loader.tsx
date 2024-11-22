import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
    const { active, progress, item } = useProgress();
    const [smoothProgress, setSmoothProgress] = React.useState(0);

    React.useEffect(() => {
        // Only update when actively loading
        if (active) {
            // If the actual progress is higher, smoothly increment towards it
            if (progress > smoothProgress) {
                const interval = setInterval(() => {
                    setSmoothProgress(prev => {
                        const newProgress = prev + 0.1;
                        // Stop when we reach actual progress
                        if (newProgress >= progress) {
                            clearInterval(interval);
                            return progress;
                        }
                        return newProgress;
                    });
                }, 10); // Update every 10ms

                return () => clearInterval(interval);
            }
        } else {
            // Reset when loading is complete
            setSmoothProgress(0);
        }
    }, [progress, active, smoothProgress]);

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
                        width: `${smoothProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(to right, #ff0023, #FF2C5A)',
                        transition: 'width 0.5s',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }} />
                </div>
                <div style={{
                    width: '200px',
                    textAlign: 'center',
                    marginTop: '10px',
                }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {active ? (
                            `Loading${item ? ':' : ''} (${smoothProgress.toFixed(1)}%)`
                        ) : (
                            'Loading complete'
                        )}
                    </span>
                </div>
            </div>
        </Html>
    );
};

export default Loader;
