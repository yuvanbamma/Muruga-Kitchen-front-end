import React, { useEffect, useRef, useState } from 'react';
import './CookingAnimation.css';
import { KitchenAssets } from '../constants/KitchenAssets';

const CookingAnimation = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const requestRef = useRef();

    // Smoother scroll progress tracking (rAF)
    const updateProgress = () => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate progress within local bounds
        const start = rect.top - viewportHeight;
        const totalHeight = rect.height + viewportHeight;
        let progress = Math.min(1, Math.max(0, -start / totalHeight));

        setScrollProgress(progress);
        requestRef.current = requestAnimationFrame(updateProgress);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    // Optimized range calculator
    const range = (p, s, e, rs, re) => {
        if (p < s) return rs;
        if (p > e) return re;
        return rs + (re - rs) * ((p - s) / (e - s));
    };

    // Scroll Ranges for 400vh (Fast & Snappy)
    // 0.0 - 0.3: Jar Visible & Ingredients Falling
    // 0.25 - 0.6: Pan Appears
    // 0.55 - 0.85: Boiling Final Dish
    // 0.85 - 1.0: Chef Mascot

    const jarOpacity = range(scrollProgress, 0, 0.2, 0, 1) * range(scrollProgress, 0.3, 0.4, 1, 0);
    const ingredientY = range(scrollProgress, 0.05, 0.45, -500, 600); // Falling from way above

    const panOpacity = range(scrollProgress, 0.35, 0.5, 0, 1) * range(scrollProgress, 0.6, 0.7, 1, 0);
    const panScale = range(scrollProgress, 0.35, 0.6, 0.8, 1.2);

    const boilingOpacity = range(scrollProgress, 0.65, 0.8, 0, 1) * range(scrollProgress, 0.85, 0.95, 1, 0);
    const chefOpacity = range(scrollProgress, 0.88, 0.98, 0, 1);

    return (
        <section className="gold-medal-journey-scroll" ref={sectionRef}>
            <div className="immersive-container">

                {/* Stage 1: The Glass Jar & Falling Ingredients */}
                <div className="scenic-layer" style={{ opacity: jarOpacity }}>
                    <div className="scenic-content">
                        <img src={KitchenAssets.images.jar} alt="Jar" className="pro-asset jar-img" />
                        <h2 className="scenic-title">Purity Starts Here</h2>
                    </div>
                </div>

                <div className="scenic-layer" style={{ pointerEvents: 'none' }}>
                    <div className="scenic-content">
                        <div className="drifting-spices">
                            {KitchenAssets.ingredients.map((ing, idx) => (
                                <span
                                    key={idx}
                                    className="spice"
                                    style={{
                                        transform: `translate3d(${Math.sin(idx * 1.5) * 150}px, ${ingredientY * (1 + idx * 0.08)}px, 0) rotate(${ingredientY * 0.5}deg)`,
                                        opacity: range(scrollProgress, 0.1, 0.5, 1, 0)
                                    }}
                                >
                                    {ing.char}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stage 2: The Sizzling Pan (NO FLAME) */}
                <div className="scenic-layer" style={{
                    opacity: panOpacity,
                    transform: `scale3d(${panScale}, ${panScale}, 1) translate3d(0, ${range(scrollProgress, 0.35, 0.6, 50, -50)}px, 0)`
                }}>
                    <div className="scenic-content">
                        <div className="pan-glow-static" style={{ opacity: panOpacity * 0.5 }}></div>
                        <img src={KitchenAssets.images.pan} alt="Pan" className="pro-asset pan-img" />
                        <h2 className="scenic-title" style={{ top: '80%', color: '#ffd43b' }}>Crafted with Heart</h2>
                    </div>
                </div>

                {/* Stage 3: The Boiling Final Dish */}
                <div className="scenic-layer" style={{ opacity: boilingOpacity }}>
                    <div className="scenic-content full-screen">
                        <img src={KitchenAssets.images.boiling} alt="Boiling" className="pro-asset boiling-img" />
                        <div className="love-text-box">
                            <h3 className="serving-love-title">Serving Love</h3>
                            <div className="poem-v2">
                                In Every Sizzle, Every Flame,<br />
                                Love is the ingredient, Heart is the name.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stage 4: Chef Mascot Finale */}
                <div className="scenic-layer" style={{ opacity: chefOpacity }}>
                    <div className="scenic-content">
                        <img src={KitchenAssets.images.chef} alt="Chef" className="pro-asset chef-img" />
                        <div className="finale-badge">
                            <h3>Kitchen Master</h3>
                            <p>Hand-crafted Experience</p>
                        </div>
                    </div>
                </div>

                <div className="scroll-odyssey-hint">
                    <span className="indicator">↓</span> SCROLL TO CONTROL THE MAGIC
                </div>
            </div>
        </section>
    );
};

export default CookingAnimation;
