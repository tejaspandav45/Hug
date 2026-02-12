"use client";
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const narrative = [
  "In a world that often measures love by what it can get...",
  "I want to be the one place that asks for nothing but your happiness.",
  "I'm sending you this hug, Vaishnavi...",
  "Not as a promise for the future, but as a presence for right now.",
  "This warmth comes to you freely, with all my heart,",
  "And absolutely without any expectations of anything in return.",
  "Just a reminder that you are cherished, exactly as you are.",
  "But before I show you my heart... I have to ask you something..."
];

const soulQuestions = [
  "Will you let me be your favorite place to hide when the world is too loud? 🧸",
  "Can I keep giving you these digital hugs until I can give you a real one? 🐼",
  "Will you promise to always remember how much you truly matter? 🧡"
];

export default function CreativeHugJourney() {
  const container = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [hasStarted, setHasStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const spawnCreativeObj = (e: any) => {
    if (!hasStarted) return;
    const x = e.clientX || (e.touches ? e.touches[0].clientX : window.innerWidth / 2);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : window.innerHeight / 2);

    const obj = document.createElement('div');
    obj.innerHTML = ['🧸', '🐼', '💝', '✨', '🐾', '🧡'][Math.floor(Math.random() * 6)];
    obj.className = 'fixed pointer-events-none z-[60] text-7xl md:text-[11rem] select-none filter drop-shadow-[0_0_30px_rgba(251,146,60,0.4)]';
    obj.style.left = `${x}px`;
    obj.style.top = `${y}px`;
    document.body.appendChild(obj);

    gsap.fromTo(obj, 
      { scale: 0, rotation: -60, opacity: 1 }, 
      { scale: 2.5, rotation: 60, y: -window.innerHeight, x: (Math.random() - 0.5) * 800, opacity: 0, duration: 4, ease: "power2.out", onComplete: () => obj.remove() }
    );
    
    // Heart-Sync ripple effect on background
    gsap.to(bgRef.current, { backgroundColor: "#3a150d", duration: 0.1, yoyo: true, repeat: 1 });
  };

  const startJourney = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  useGSAP(() => {
    if (!hasStarted || !isMounted) return;

    // Floating Cuteness Squad Parallax
    gsap.to(".buddy", {
      y: "random(-80, 80)",
      rotation: "random(-30, 30)",
      duration: "random(5, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const tl = gsap.timeline();
    narrative.forEach((_, i) => {
      tl.to({}, {
        duration: 7,
        onStart: () => {
          setLineIndex(i);
          const targetColor = i === narrative.length - 1 ? "#2e1008" : (i % 2 === 0 ? "#140706" : "#050202");
          gsap.to(bgRef.current, { backgroundColor: targetColor, duration: 4 });
          gsap.fromTo(".msg-card", { opacity: 0, scale: 0.85, y: 80, filter: 'blur(30px)' }, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 3, ease: "expo.out" });
        },
        onComplete: () => {
          if (i === narrative.length - 1) setShowQuestions(true);
          else gsap.to(".msg-card", { opacity: 0, y: -80, filter: 'blur(30px)', duration: 2 });
        }
      });
    });
  }, { scope: container, dependencies: [hasStarted, isMounted] });

  return (
    <main ref={container} onClick={spawnCreativeObj} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050202]">
      <div ref={bgRef} className="fixed inset-0 w-full h-full transition-colors duration-[3000ms] z-[-2]" />
      
      {!hasStarted && (
        <div onClick={startJourney} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050202] cursor-pointer text-center px-6">
          <div className="text-9xl mb-12 animate-heart-pulse drop-shadow-[0_0_50px_rgba(251,146,60,0.4)]">🫂</div>
          <button className="px-16 py-6 bg-white/5 border border-white/10 rounded-full text-orange-200 font-bold tracking-[0.6em] uppercase text-[0.7rem] hover:bg-white/10 transition-all shadow-2xl">
             Open The Embrace
          </button>
          <p className="mt-8 text-[10px] tracking-[0.5em] text-white/20 uppercase font-light">Dedicated to Vaishnavi • Dil Diya Gallan</p>
        </div>
      )}

      <audio ref={audioRef} loop preload="auto"><source src="/new.mp3" type="audio/mp3" /></audio>

      {/* Floating Astral Squad */}
      {hasStarted && (
        <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.15]">
          {['🐼', '🧸', '💝', '✨', '🧸', '🐼'].map((emoji, i) => (
            <div key={i} className="buddy absolute text-[12rem] md:text-[18rem]" style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}>{emoji}</div>
          ))}
        </div>
      )}

      {/* Narrative Section */}
      {hasStarted && !showQuestions && !showSurprise && (
        <div className="relative z-20 w-full flex justify-center px-6 text-center transition-all duration-[2000ms]">
          <div className="velvet-card p-12 md:p-32 rounded-[60px] md:rounded-[150px] msg-card w-full max-w-5xl">
            <p className="italic text-3xl md:text-7xl text-orange-50/95 leading-tight font-serif tracking-tight">"{narrative[lineIndex]}"</p>
          </div>
        </div>
      )}

      {/* Interactive Questions */}
      {showQuestions && (
        <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center animate-in fade-in zoom-in duration-1000 w-full max-w-3xl">
          <div className="text-9xl md:text-[14rem] mb-12 animate-heart-pulse">🐼</div>
          <div className="velvet-card p-10 md:p-24 rounded-[40px] border border-white/10 shadow-3xl">
            <p className="text-2xl md:text-5xl text-white font-light mb-16 italic leading-relaxed font-serif">{soulQuestions[qIndex]}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => qIndex < soulQuestions.length - 1 ? setQIndex(qIndex+1) : (setShowQuestions(false), setShowSurprise(true))} className="px-16 py-7 bg-white text-black font-black rounded-full hover:scale-110 transition-transform tracking-widest uppercase text-xs">Yes, Always 🧡</button>
              <button onClick={() => qIndex < soulQuestions.length - 1 ? setQIndex(qIndex+1) : (setShowQuestions(false), setShowSurprise(true))} className="px-16 py-7 bg-black/50 text-white font-black rounded-full border border-white/20 hover:scale-110 transition-transform tracking-widest uppercase text-xs">Of Course ✨</button>
            </div>
          </div>
        </div>
      )}

      {/* Final Surprise Reveal */}
      {showSurprise && (
        <div className="relative z-50 flex flex-col items-center justify-center w-full px-6 animate-in fade-in zoom-in duration-[3000ms]">
           <div className="text-[14rem] md:text-[25rem] mb-[-6rem] z-10 drop-shadow-[0_0_150px_rgba(251,146,60,0.7)] animate-heart-pulse">💝</div>
           <div className="w-full max-w-4xl velvet-card p-12 md:p-32 rounded-[60px] md:rounded-[180px] text-center border-orange-500/30">
                <h2 className="text-5xl md:text-9xl text-orange-300 mb-12 italic font-serif">Safe In My Arms</h2>
                <p className="text-xl md:text-5xl text-orange-50/90 leading-relaxed font-light">
                  I don't need promises. My arms are a safe place for you to just 'be'.
                  <br/><br/>
                  I am here for you <span className="text-white font-bold italic underline decoration-orange-500 underline-offset-[12px]">without any expectations</span>—just 
                  the simple, pure joy of knowing you are loved.
                  <br/><br/>
                  <span className="text-white font-black italic">You're always home here, Vaishnavi.</span>
                </p>
           </div>
           <p className="mt-20 text-orange-500/30 tracking-[2.5em] text-[10px] uppercase font-bold text-center">Infinite Warmth • Tejas</p>
        </div>
      )}
    </main>
  );
}