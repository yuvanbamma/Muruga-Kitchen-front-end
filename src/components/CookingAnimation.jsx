import React, { useState } from 'react';
import './CookingAnimation.css';
import { KitchenAssets } from '../constants/KitchenAssets';

const CookingAnimation = () => {
    // Initial positions for the items
    const [positions, setPositions] = useState({
        jar: { x: 0, y: 0, r: -3, scale: 1 },
        pan: { x: 0, y: 100, r: 0, scale: 1 },
        chef: { x: 0, y: 200, r: 0, scale: 1 },
        boiling: { x: 0, y: 0, r: 0, scale: 1 }
    });

    const [scattered, setScattered] = useState({
        jar: false,
        pan: false,
        chef: false,
        boiling: false
    });

    const scatterItem = (item) => {
        // Generate random position in the landscape
        const randomX = (Math.random() - 0.5) * (window.innerWidth * 0.8);
        const randomY = (Math.random() - 0.5) * (window.innerHeight * 0.6);
        const randomRotate = (Math.random() - 0.5) * 90;
        const randomScale = 0.5 + Math.random() * 0.5;

        setPositions(prev => ({
            ...prev,
            [item]: { x: randomX, y: randomY, r: randomRotate, scale: randomScale }
        }));

        setScattered(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const resetGallery = () => {
        setPositions({
            jar: { x: 0, y: 0, r: -3, scale: 1 },
            pan: { x: 0, y: 0, r: 0, scale: 1 },
            chef: { x: 0, y: 150, r: 0, scale: 1 },
            boiling: { x: 0, y: 0, r: 0, scale: 1 }
        });
        setScattered({
            jar: false,
            pan: false,
            chef: false,
            boiling: false
        });
    };

    return (
        <section className="scatter-gallery-section">
            <div className="gallery-header">
                <h2>Click to Scatter the Magic</h2>
                <p>Play with Muruga's kitchen tools! Click any item to throw it around.</p>
                <button className="reset-gallery-btn" onClick={resetGallery}>Reset Gallery</button>
            </div>

            <div className="scatter-container">
                {/* JAR */}
                <div
                    className={`scatter-item ${scattered.jar ? 'is-scattered' : ''}`}
                    style={{ transform: `translate3d(${positions.jar.x}px, ${positions.jar.y}px, 0) rotate(${positions.jar.r}deg) scale(${positions.jar.scale})` }}
                    onClick={() => scatterItem('jar')}
                >
                    <img src={KitchenAssets.images.jar} alt="Jar" className="gallery-asset" />
                    {!scattered.jar && <span className="click-hint">Click Me ✨</span>}
                </div>

                {/* PAN */}
                <div
                    className={`scatter-item ${scattered.pan ? 'is-scattered' : ''}`}
                    style={{ transform: `translate3d(${positions.pan.x}px, ${positions.pan.y}px, 0) rotate(${positions.pan.r}deg) scale(${positions.pan.scale})` }}
                    onClick={() => scatterItem('pan')}
                >
                    <div className="pan-glow-effect"></div>
                    <img src={KitchenAssets.images.pan} alt="Pan" className="gallery-asset" />
                    {!scattered.pan && <span className="click-hint">Sizzle 🔥</span>}
                </div>

                {/* BOILING */}
                <div
                    className={`scatter-item ${scattered.boiling ? 'is-scattered' : ''}`}
                    style={{ transform: `translate3d(${positions.boiling.x}px, ${positions.boiling.y}px, 0) rotate(${positions.boiling.r}deg) scale(${positions.boiling.scale})` }}
                    onClick={() => scatterItem('boiling')}
                >
                    <img src={KitchenAssets.images.boiling} alt="Boiling" className="gallery-asset circular" />
                    {!scattered.boiling && <span className="click-hint">Cook 🍲</span>}
                </div>

                {/* CHEF */}
                <div
                    className={`scatter-item ${scattered.chef ? 'is-scattered' : ''}`}
                    style={{ transform: `translate3d(${positions.chef.x}px, ${positions.chef.y}px, 0) rotate(${positions.chef.r}deg) scale(${positions.chef.scale})` }}
                    onClick={() => scatterItem('chef')}
                >
                    <img src={KitchenAssets.images.chef} alt="Chef" className="gallery-asset" />
                    {!scattered.chef && <span className="click-hint">Hello! 👋</span>}
                </div>
            </div>

            <div className="gallery-footer-text">
                <p>In Every Sizzle, Every Flame, Love is the ingredient, Heart is the name.</p>
            </div>
        </section>
    );
};

export default CookingAnimation;
