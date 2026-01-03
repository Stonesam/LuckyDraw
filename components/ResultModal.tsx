import React, { useEffect, useState, useMemo } from 'react';

interface ResultModalProps {
  number: number;
  color: string;
  maxNumber: number;
  onClose: () => void;
}

// 20 Selected Representative Pokemon with refined colors
const CREATURE_DEX = [
  { id: 'bulbasaur', name: '妙蛙種子', type: 'Grass', color: 'from-teal-400 to-emerald-600', bg: 'bg-teal-500', border: 'border-teal-700', text: 'text-white' },
  { id: 'charmander', name: '小火龍', type: 'Fire', color: 'from-orange-400 to-red-500', bg: 'bg-orange-500', border: 'border-orange-700', text: 'text-white' },
  { id: 'squirtle', name: '車厘龜', type: 'Water', color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-500', border: 'border-blue-700', text: 'text-white' },
  { id: 'butterfree', name: '巴大蝶', type: 'Bug', color: 'from-indigo-300 to-purple-500', bg: 'bg-indigo-500', border: 'border-indigo-700', text: 'text-white' },
  { id: 'pikachu', name: '皮卡丘', type: 'Electric', color: 'from-yellow-300 to-yellow-500', bg: 'bg-yellow-400', border: 'border-yellow-600', text: 'text-yellow-900' },
  { id: 'vulpix', name: '六尾', type: 'Fire', color: 'from-orange-600 to-red-700', bg: 'bg-orange-700', border: 'border-orange-900', text: 'text-white' },
  { id: 'jigglypuff', name: '胖丁', type: 'Fairy', color: 'from-pink-200 to-rose-300', bg: 'bg-pink-300', border: 'border-pink-500', text: 'text-pink-900' },
  { id: 'oddish', name: '走路草', type: 'Grass', color: 'from-indigo-600 to-blue-800', bg: 'bg-indigo-700', border: 'border-indigo-900', text: 'text-white' },
  { id: 'meowth', name: '喵喵怪', type: 'Normal', color: 'from-stone-100 to-amber-100', bg: 'bg-yellow-100', border: 'border-yellow-600', text: 'text-stone-800' },
  { id: 'psyduck', name: '可達鴨', type: 'Water', color: 'from-yellow-300 to-amber-400', bg: 'bg-yellow-400', border: 'border-yellow-600', text: 'text-yellow-900' },
  { id: 'poliwag', name: '蚊香蝌蚪', type: 'Water', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-600', border: 'border-blue-800', text: 'text-white' },
  { id: 'machop', name: '腕力', type: 'Fighting', color: 'from-gray-300 to-cyan-700', bg: 'bg-cyan-600', border: 'border-cyan-800', text: 'text-white' },
  { id: 'geodude', name: '小拳石', type: 'Rock', color: 'from-stone-400 to-gray-500', bg: 'bg-gray-500', border: 'border-gray-700', text: 'text-white' },
  { id: 'slowpoke', name: '小呆獸', type: 'Psychic', color: 'from-pink-300 to-rose-400', bg: 'bg-pink-400', border: 'border-pink-600', text: 'text-white' },
  { id: 'magnemite', name: '小磁怪', type: 'Steel', color: 'from-slate-300 to-slate-400', bg: 'bg-slate-400', border: 'border-slate-600', text: 'text-slate-900' },
  { id: 'gengar', name: '耿鬼', type: 'Ghost', color: 'from-purple-700 to-indigo-900', bg: 'bg-purple-800', border: 'border-purple-950', text: 'text-white' },
  { id: 'cubone', name: '卡拉卡拉', type: 'Ground', color: 'from-amber-700 to-stone-700', bg: 'bg-stone-600', border: 'border-stone-800', text: 'text-white' },
  { id: 'magikarp', name: '鯉魚王', type: 'Water', color: 'from-red-500 to-orange-600', bg: 'bg-red-500', border: 'border-red-700', text: 'text-white' },
  { id: 'eevee', name: '伊布', type: 'Normal', color: 'from-amber-400 to-orange-600', bg: 'bg-amber-500', border: 'border-amber-700', text: 'text-white' },
  { id: 'snorlax', name: '卡比獸', type: 'Normal', color: 'from-teal-700 to-slate-800', bg: 'bg-teal-800', border: 'border-teal-950', text: 'text-white' },
];

// High-detail SVG illustrations
const CreatureIllustration: React.FC<{ id: string }> = ({ id }) => {
  const commonProps = "w-40 h-40 drop-shadow-xl transition-transform duration-500 hover:scale-110 filter";
  
  switch (id) {
    case 'bulbasaur': 
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Bulb */}
            <path d="M50,15 C75,5 90,30 85,50 C80,65 60,65 50,65 C40,65 20,65 15,50 C10,30 25,5 50,15" fill="#4ADE80" stroke="#15803D" strokeWidth="2"/>
            <path d="M50,15 L50,45" stroke="#15803D" strokeWidth="1" opacity="0.4" />
            <path d="M25,30 Q35,40 30,50" fill="none" stroke="#15803D" strokeWidth="1" opacity="0.4" />
            <path d="M75,30 Q65,40 70,50" fill="none" stroke="#15803D" strokeWidth="1" opacity="0.4" />
            {/* Body */}
            <path d="M20,50 C10,65 15,90 35,92 L65,92 C85,90 90,65 80,50 C85,35 70,25 50,25 C30,25 15,35 20,50" fill="#2DD4BF" stroke="#0F766E" strokeWidth="2" />
            {/* Spots */}
            <path d="M30,35 Q38,40 32,48 Q25,45 30,35" fill="#115E59" opacity="0.3" />
            <path d="M68,38 Q75,45 68,52 Q60,48 68,38" fill="#115E59" opacity="0.3" />
            <path d="M45,75 Q55,80 60,72" fill="#115E59" opacity="0.2" />
            {/* Eyes */}
            <path d="M28,52 L40,62 L30,70 L25,60 Z" fill="#FFF" stroke="#0F766E" strokeWidth="1.5" />
            <path d="M36,60 L32,64" fill="#000" /> <circle cx="35" cy="58" r="1.5" fill="#000" />
            <path d="M72,52 L60,62 L70,70 L75,60 Z" fill="#FFF" stroke="#0F766E" strokeWidth="1.5" />
            <path d="M64,60 L68,64" fill="#000" /> <circle cx="65" cy="58" r="1.5" fill="#000" />
            {/* Mouth */}
            <path d="M42,75 Q50,78 58,75" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
            {/* Legs */}
            <path d="M25,85 Q25,95 35,95" fill="none" stroke="#0F766E" strokeWidth="2" />
            <path d="M75,85 Q75,95 65,95" fill="none" stroke="#0F766E" strokeWidth="2" />
        </svg>
      );
    case 'charmander': 
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Tail & Flame */}
            <path d="M85,75 Q100,65 95,45 Q90,30 95,20" fill="none" stroke="#F97316" strokeWidth="0" />
            <path d="M82,65 Q92,55 88,35 Q95,45 98,25 Q105,40 95,55 Q100,65 92,72" fill="#EF4444" className="animate-pulse" opacity="0.8" />
            <path d="M85,60 Q90,50 88,40 Q92,48 94,35" fill="#FCD34D" className="animate-pulse" /> 
            {/* Body */}
            <path d="M35,25 Q50,15 65,25 Q75,35 72,55 L78,75 Q75,85 65,90 L35,90 Q25,85 22,75 L28,55 Q25,35 35,25" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            {/* Belly */}
            <path d="M35,55 Q50,45 65,55 Q62,80 50,85 Q38,80 35,55" fill="#FED7AA" /> 
            {/* Eyes */}
            <path d="M35,40 Q40,35 45,40" fill="none" stroke="#000" strokeWidth="1.5" />
            <path d="M55,40 Q60,35 65,40" fill="none" stroke="#000" strokeWidth="1.5" />
            <circle cx="40" cy="45" r="3" fill="#000" /> <circle cx="39" cy="44" r="1" fill="#FFF" />
            <circle cx="60" cy="45" r="3" fill="#000" /> <circle cx="59" cy="44" r="1" fill="#FFF" />
            {/* Mouth */}
            <path d="M45,55 Q50,58 55,55" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M54,56 L55,54" fill="#FFF" /> {/* Tooth */}
            {/* Arms/Legs */}
            <path d="M28,55 Q15,45 20,40" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
            <path d="M72,55 Q85,45 80,40" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'squirtle':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Tail */}
             <path d="M15,55 Q5,35 25,30 Q40,30 30,55" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
             <path d="M22,35 Q30,35 28,45" fill="none" stroke="#1E40AF" strokeWidth="1" />
             {/* Legs/Arms */}
             <circle cx="25" cy="75" r="8" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
             <circle cx="75" cy="75" r="8" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
             <path d="M20,55 Q10,65 15,70" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
             <path d="M80,55 Q90,65 85,70" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
             {/* Shell */}
             <path d="M30,55 Q50,45 70,55 L70,80 Q50,90 30,80 Z" fill="#FDE047" stroke="#FFF" strokeWidth="3" /> 
             <path d="M30,55 Q50,45 70,55 L70,80 Q50,90 30,80 Z" fill="none" stroke="#B45309" strokeWidth="1" opacity="0.5" />
             <path d="M40,65 L60,65 M50,55 L50,85" stroke="#B45309" strokeWidth="1" opacity="0.5" />
             {/* Head */}
             <path d="M25,45 C25,20 75,20 75,45 C75,55 65,60 50,60 C35,60 25,55 25,45" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2" />
             {/* Eyes */}
             <path d="M35,35 Q40,30 45,35 L45,42 Q40,45 35,42 Z" fill="#FFF" stroke="#000" strokeWidth="1" />
             <circle cx="42" cy="38" r="1.5" fill="#000" />
             <path d="M65,35 Q60,30 55,35 L55,42 Q60,45 65,42 Z" fill="#FFF" stroke="#000" strokeWidth="1" />
             <circle cx="58" cy="38" r="1.5" fill="#000" />
             {/* Mouth */}
             <path d="M45,50 Q50,53 55,50" fill="none" stroke="#000" strokeWidth="1" />
        </svg>
      );
    case 'butterfree':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Wings Lower */}
            <path d="M45,60 Q20,80 30,90 Q45,95 50,70" fill="#DDD6FE" stroke="#1E1B4B" strokeWidth="2" />
            <path d="M55,60 Q80,80 70,90 Q55,95 50,70" fill="#DDD6FE" stroke="#1E1B4B" strokeWidth="2" />
            {/* Wings Upper */}
            <path d="M45,55 Q10,60 5,20 Q30,5 45,40" fill="#Ffffff" stroke="#1E1B4B" strokeWidth="2" />
            <path d="M55,55 Q90,60 95,20 Q70,5 55,40" fill="#Ffffff" stroke="#1E1B4B" strokeWidth="2" />
            {/* Wing Patterns */}
            <path d="M10,25 L20,30 M8,35 L15,38" stroke="#1E1B4B" strokeWidth="1" />
            <path d="M90,25 L80,30 M92,35 L85,38" stroke="#1E1B4B" strokeWidth="1" />
            {/* Body */}
            <ellipse cx="50" cy="60" rx="10" ry="20" fill="#6366F1" stroke="#312E81" strokeWidth="2" />
            <circle cx="50" cy="40" r="12" fill="#6366F1" stroke="#312E81" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="44" cy="40" rx="4" ry="5" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
            <ellipse cx="56" cy="40" rx="4" ry="5" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
            <circle cx="45" cy="38" r="1.5" fill="#FFF" /> <circle cx="55" cy="38" r="1.5" fill="#FFF" />
            {/* Antennae */}
            <path d="M42,30 L35,15" stroke="#1E1B4B" strokeWidth="2" />
            <path d="M58,30 L65,15" stroke="#1E1B4B" strokeWidth="2" />
            {/* Mouth */}
            <path d="M48,46 L50,45 L52,46" fill="none" stroke="#FFF" strokeWidth="1" />
            {/* Hands/Feet */}
            <path d="M40,60 L35,55" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
            <path d="M60,60 L65,55" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
            <path d="M45,80 L40,85" stroke="#312E81" strokeWidth="2" strokeLinecap="round" />
            <path d="M55,80 L60,85" stroke="#312E81" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'pikachu': 
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
           {/* Tail */}
           <path d="M70,70 L80,60 L75,50 L90,40 L85,20 L95,30" fill="none" stroke="#FACC15" strokeWidth="8" strokeLinejoin="round" />
           <path d="M70,70 L72,68" stroke="#854D0E" strokeWidth="8" /> {/* Brown base */}
           {/* Ears */}
           <path d="M25,15 L35,40 L15,35 Z" fill="#000" />
           <path d="M35,40 L25,15 L45,35" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
           <path d="M75,15 L65,40 L85,35 Z" fill="#000" />
           <path d="M65,40 L75,15 L55,35" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
           {/* Head/Body */}
           <path d="M25,55 Q20,80 35,90 L65,90 Q80,80 75,55 Q80,30 50,30 Q20,30 25,55" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
           {/* Face */}
           <circle cx="38" cy="55" r="4" fill="#000" /> <circle cx="39" cy="53" r="1.5" fill="#FFF" />
           <circle cx="62" cy="55" r="4" fill="#000" /> <circle cx="63" cy="53" r="1.5" fill="#FFF" />
           <circle cx="28" cy="65" r="6" fill="#EF4444" opacity="0.9" /> {/* Cheek */}
           <circle cx="72" cy="65" r="6" fill="#EF4444" opacity="0.9" />
           <path d="M47,66 Q50,68 53,66" fill="none" stroke="#000" strokeWidth="1.5" />
           <path d="M49,60 L51,60" fill="#000" /> {/* Nose */}
           {/* Arms */}
           <ellipse cx="35" cy="75" rx="4" ry="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" transform="rotate(30 35 75)" />
           <ellipse cx="65" cy="75" rx="4" ry="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" transform="rotate(-30 65 75)" />
           {/* Feet */}
           <ellipse cx="35" cy="90" rx="5" ry="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
           <ellipse cx="65" cy="90" rx="5" ry="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
        </svg>
      );
    case 'vulpix':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Tails */}
            <path d="M10,40 Q20,20 30,50" fill="none" stroke="#C2410C" strokeWidth="8" strokeLinecap="round" />
            <path d="M20,30 Q30,10 40,45" fill="none" stroke="#C2410C" strokeWidth="8" strokeLinecap="round" />
            <path d="M80,30 Q70,10 60,45" fill="none" stroke="#C2410C" strokeWidth="8" strokeLinecap="round" />
            <path d="M90,40 Q80,20 70,50" fill="none" stroke="#C2410C" strokeWidth="8" strokeLinecap="round" />
            <path d="M25,35 Q30,15 35,50" fill="none" stroke="#9A3412" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
            <path d="M75,35 Q70,15 65,50" fill="none" stroke="#9A3412" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
            {/* Body */}
            <path d="M30,60 Q25,85 40,90 L60,90 Q75,85 70,60" fill="#9A3412" stroke="#7C2D12" strokeWidth="2" />
            {/* Head */}
            <circle cx="50" cy="50" r="22" fill="#9A3412" stroke="#7C2D12" strokeWidth="2" />
            {/* Hair Curls */}
            <path d="M40,30 Q50,20 60,30 Q65,25 60,20 Q50,10 40,20 Q35,25 40,30" fill="#EA580C" stroke="#7C2D12" strokeWidth="1" />
            <path d="M45,32 Q50,25 55,32" fill="#EA580C" />
            {/* Eyes */}
            <ellipse cx="42" cy="50" rx="4" ry="6" fill="#451A03" /> <circle cx="43" cy="48" r="1.5" fill="#FFF" />
            <ellipse cx="58" cy="50" rx="4" ry="6" fill="#451A03" /> <circle cx="57" cy="48" r="1.5" fill="#FFF" />
            {/* Nose/Mouth */}
            <circle cx="50" cy="58" r="1" fill="#000" />
            {/* Legs */}
            <path d="M35,85 L35,92 M65,85 L65,92" stroke="#7C2D12" strokeWidth="3" />
        </svg>
      );
    case 'jigglypuff':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Ears */}
            <path d="M25,25 L35,45 L45,30" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2" />
            <path d="M30,30 L35,40 L40,32" fill="#4B5563" opacity="0.8" /> {/* Inner Ear */}
            <path d="M75,25 L65,45 L55,30" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2" />
            <path d="M70,30 L65,40 L60,32" fill="#4B5563" opacity="0.8" />
            {/* Body */}
            <circle cx="50" cy="55" r="35" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2" />
            {/* Curl */}
            <path d="M45,25 C60,20 65,35 55,35 C48,35 48,25 55,20" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="35" cy="50" r="9" fill="#FFF" stroke="#BE185D" strokeWidth="1" />
            <circle cx="65" cy="50" r="9" fill="#FFF" stroke="#BE185D" strokeWidth="1" />
            <circle cx="37" cy="50" r="5" fill="#0EA5E9" />
            <circle cx="67" cy="50" r="5" fill="#0EA5E9" />
            <circle cx="38" cy="48" r="2" fill="#FFF" /> <circle cx="68" cy="48" r="2" fill="#FFF" />
            {/* Mouth */}
            <path d="M48,65 L52,65" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            {/* Arms/Feet */}
            <ellipse cx="25" cy="65" rx="5" ry="3" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1" />
            <ellipse cx="75" cy="65" rx="5" ry="3" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1" />
            <ellipse cx="40" cy="85" rx="8" ry="3" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1" />
            <ellipse cx="60" cy="85" rx="8" ry="3" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1" />
        </svg>
      );
    case 'oddish':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Leaves */}
            <path d="M50,40 Q30,10 10,25 Q30,35 45,45" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            <path d="M50,40 Q70,10 90,25 Q70,35 55,45" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            <path d="M50,40 Q50,5 50,5 Q50,5 50,40" fill="#4ADE80" stroke="#15803D" strokeWidth="4" /> {/* Center stem/leaf */}
            <path d="M50,40 Q20,20 20,5 Q40,30 48,42" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            <path d="M50,40 Q80,20 80,5 Q60,30 52,42" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            {/* Body */}
            <circle cx="50" cy="65" r="25" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="40" cy="60" r="3" fill="#EF4444" /> <circle cx="41" cy="59" r="1" fill="#FFF" />
            <circle cx="60" cy="60" r="3" fill="#EF4444" /> <circle cx="61" cy="59" r="1" fill="#FFF" />
            {/* Mouth */}
            <path d="M48,68 L50,66 L52,68" fill="none" stroke="#000" strokeWidth="1" />
            {/* Feet */}
            <ellipse cx="40" cy="88" rx="6" ry="3" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
            <ellipse cx="60" cy="88" rx="6" ry="3" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
        </svg>
      );
    case 'meowth':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Ears */}
            <path d="M25,25 L35,45 L45,30" fill="#FEF3C7" stroke="#000" strokeWidth="1.5" />
            <path d="M30,30 L35,40 L40,32" fill="#78350F" />
            <path d="M75,25 L65,45 L55,30" fill="#FEF3C7" stroke="#000" strokeWidth="1.5" />
            <path d="M70,30 L65,40 L60,32" fill="#78350F" />
            {/* Head */}
            <ellipse cx="50" cy="50" rx="35" ry="30" fill="#FEF3C7" stroke="#000" strokeWidth="2" />
            {/* Coin */}
            <ellipse cx="50" cy="25" rx="10" ry="14" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
            <path d="M46,25 L54,25 M48,20 L48,30 M52,20 L52,30" stroke="#854D0E" strokeWidth="1" />
            {/* Face */}
            <circle cx="35" cy="50" r="6" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="35" cy="50" r="1.5" fill="#000" />
            <circle cx="65" cy="50" r="6" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="65" cy="50" r="1.5" fill="#000" />
            {/* Whiskers */}
            <path d="M15,45 L25,48 M15,52 L25,52" stroke="#000" strokeWidth="1" />
            <path d="M85,45 L75,48 M85,52 L75,52" stroke="#000" strokeWidth="1" />
            {/* Mouth */}
            <path d="M45,62 Q50,65 55,62" fill="none" stroke="#000" strokeWidth="1" />
            <path d="M48,62 L48,60 L52,60 L52,62" fill="none" stroke="#000" strokeWidth="1" /> {/* Teeth */}
        </svg>
      );
    case 'psyduck':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
            {/* Hair */}
            <path d="M45,15 Q45,25 48,25" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M50,10 Q50,22 50,22" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M55,15 Q55,25 52,25" fill="none" stroke="#000" strokeWidth="2" />
            {/* Body */}
            <path d="M25,50 Q25,30 50,30 Q75,30 75,50 Q80,80 50,90 Q20,80 25,50" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
            {/* Arms holding head */}
            <path d="M25,40 Q15,30 30,25 L35,35" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
            <path d="M75,40 Q85,30 70,25 L65,35" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="40" cy="45" r="7" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="40" cy="45" r="1" fill="#000" />
            <circle cx="60" cy="45" r="7" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="60" cy="45" r="1" fill="#000" />
            {/* Beak */}
            <path d="M35,55 Q50,65 65,55 Q65,50 50,52 Q35,50 35,55" fill="#FEF9C3" stroke="#A16207" strokeWidth="1.5" />
            <path d="M45,56 L47,58 M53,58 L55,56" stroke="#A16207" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case 'poliwag':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Tail */}
             <path d="M80,50 Q100,50 95,70 Q85,75 75,60" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" opacity="0.9" />
             <path d="M78,55 Q90,55 88,65" fill="none" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
             {/* Body */}
             <circle cx="50" cy="50" r="30" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
             {/* Swirl Area */}
             <circle cx="50" cy="55" r="20" fill="#E0F2FE" opacity="0.2" />
             <path d="M50,55 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="60" transform="rotate(45 50 55)" />
             <path d="M50,55 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0" fill="none" stroke="#000" strokeWidth="1.5" transform="rotate(45 50 55)" />
             {/* Eyes */}
             <circle cx="45" cy="35" r="5" fill="#000" /> <circle cx="43" cy="33" r="1.5" fill="#FFF" />
             <circle cx="65" cy="35" r="5" fill="#000" /> <circle cx="63" cy="33" r="1.5" fill="#FFF" />
             {/* Mouth */}
             <ellipse cx="55" cy="48" rx="4" ry="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
             {/* Feet */}
             <path d="M35,75 L30,85 L40,85 Z" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
             <path d="M65,75 L70,85 L60,85 Z" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
        </svg>
      );
    case 'machop':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Crest */}
             <path d="M45,15 Q50,10 55,15 L55,25 L45,25 Z" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
             {/* Body/Head */}
             <path d="M30,30 Q30,20 50,20 Q70,20 70,30 L70,50 Q80,50 85,70 L75,80 L70,70 L70,90 L60,95 L40,95 L30,90 L30,70 L25,80 L15,70 Q20,50 30,50 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
             {/* Chest Muscles */}
             <path d="M40,50 Q50,55 60,50" fill="none" stroke="#475569" strokeWidth="1" />
             <path d="M50,55 L50,80" fill="none" stroke="#475569" strokeWidth="1" />
             {/* Face */}
             <circle cx="42" cy="35" r="3" fill="#000" /> <circle cx="43" cy="34" r="1" fill="#FFF" />
             <circle cx="58" cy="35" r="3" fill="#000" /> <circle cx="59" cy="34" r="1" fill="#FFF" />
             <path d="M40,30 L45,33" stroke="#000" strokeWidth="1" />
             <path d="M60,30 L55,33" stroke="#000" strokeWidth="1" />
             <path d="M48,45 L52,45" stroke="#000" strokeWidth="1" />
        </svg>
      );
    case 'geodude':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Arms */}
             <path d="M25,50 Q10,30 20,20 Q30,15 35,35" fill="#D6D3D1" stroke="#57534E" strokeWidth="2" />
             <path d="M15,20 L10,25 M18,18 L15,10 M22,18 L25,10" stroke="#57534E" strokeWidth="2" strokeLinecap="round" /> {/* Fingers */}
             <path d="M75,50 Q90,30 80,20 Q70,15 65,35" fill="#D6D3D1" stroke="#57534E" strokeWidth="2" />
             <path d="M85,20 L90,25 M82,18 L85,10 M78,18 L75,10" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
             {/* Body */}
             <path d="M30,35 L70,35 L85,55 L70,85 L30,85 L15,55 Z" fill="#D6D3D1" stroke="#57534E" strokeWidth="2" />
             {/* Texture */}
             <path d="M25,60 L35,65 L30,70" fill="none" stroke="#A8A29E" strokeWidth="1" />
             <path d="M75,60 L65,65 L70,70" fill="none" stroke="#A8A29E" strokeWidth="1" />
             <circle cx="30" cy="40" r="2" fill="#A8A29E" />
             <circle cx="70" cy="40" r="2" fill="#A8A29E" />
             {/* Face */}
             <path d="M35,50 L45,55" stroke="#000" strokeWidth="2" />
             <path d="M65,50 L55,55" stroke="#000" strokeWidth="2" />
             <path d="M40,70 Q50,75 60,70" fill="none" stroke="#000" strokeWidth="2" />
        </svg>
      );
    case 'slowpoke':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Ears */}
             <circle cx="20" cy="25" r="6" fill="#F9A8D4" stroke="#BE185D" strokeWidth="1.5" />
             <circle cx="80" cy="25" r="6" fill="#F9A8D4" stroke="#BE185D" strokeWidth="1.5" />
             <circle cx="20" cy="25" r="3" fill="#FCE7F3" />
             {/* Body */}
             <rect x="25" y="60" width="50" height="30" rx="15" fill="#F9A8D4" stroke="#BE185D" strokeWidth="2" />
             {/* Head */}
             <circle cx="50" cy="50" r="30" fill="#F9A8D4" stroke="#BE185D" strokeWidth="2" />
             {/* Muzzle */}
             <ellipse cx="50" cy="60" rx="14" ry="10" fill="#FCE7F3" stroke="#BE185D" strokeWidth="1" />
             {/* Eyes */}
             <circle cx="40" cy="45" r="5" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="40" cy="45" r="1.5" fill="#000" />
             <circle cx="60" cy="45" r="5" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="60" cy="45" r="1.5" fill="#000" />
             {/* Mouth */}
             <path d="M45,60 Q50,63 55,60" stroke="#000" strokeWidth="1" fill="none" />
             {/* Tail tip visible */}
             <path d="M75,70 Q85,60 90,70 Q95,80 85,85" fill="#F9A8D4" stroke="#BE185D" strokeWidth="2" />
             <path d="M85,85 L90,80" fill="#FFF" />
        </svg>
      );
    case 'magnemite':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Magnets */}
             <path d="M10,50 Q5,50 5,70 M25,50 Q30,50 30,70" fill="none" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
             <path d="M5,70 L30,70 L30,75 L5,75 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
             <path d="M90,50 Q95,50 95,70 M75,50 Q70,50 70,70" fill="none" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
             <path d="M70,70 L95,70 L95,75 L70,75 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
             {/* Body */}
             <circle cx="50" cy="50" r="22" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
             {/* Screws */}
             <rect x="45" y="20" width="10" height="10" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
             <rect x="42" y="22" width="16" height="4" fill="#CBD5E1" rx="2" />
             <circle cx="30" cy="65" r="4" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
             <path d="M28,65 L32,65 M30,63 L30,67" stroke="#475569" strokeWidth="1" />
             <circle cx="70" cy="65" r="4" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
             <path d="M68,65 L72,65 M70,63 L70,67" stroke="#475569" strokeWidth="1" />
             {/* Eye */}
             <circle cx="50" cy="50" r="10" fill="#FFF" stroke="#000" strokeWidth="1.5" />
             <circle cx="50" cy="50" r="3" fill="#000" />
        </svg>
      );
    case 'gengar':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Body Shape */}
             <path d="M25,30 L35,20 L45,28 L55,28 L65,20 L75,30 Q90,40 85,70 Q75,90 50,90 Q25,90 15,70 Q10,40 25,30" fill="#6B21A8" stroke="#3B0764" strokeWidth="2" />
             {/* Spikes */}
             <path d="M30,30 L25,20" stroke="#3B0764" strokeWidth="2" fill="none" />
             <path d="M70,30 L75,20" stroke="#3B0764" strokeWidth="2" fill="none" />
             {/* Eyes */}
             <path d="M30,45 L40,50 L35,55 L28,50 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
             <path d="M70,45 L60,50 L65,55 L72,50 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
             {/* Smile */}
             <path d="M30,65 Q50,85 70,65" fill="#FFF" stroke="#3B0764" strokeWidth="1.5" />
             <path d="M35,68 L65,68 M40,75 L60,75" stroke="#3B0764" strokeWidth="1" opacity="0.3" /> {/* Teeth Lines */}
             {/* Arms/Legs */}
             <path d="M15,60 L5,50 M85,60 L95,50" stroke="#3B0764" strokeWidth="3" strokeLinecap="round" />
             <path d="M35,90 L30,95 M65,90 L70,95" stroke="#3B0764" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'cubone':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Body */}
             <path d="M35,60 Q25,80 30,90 L70,90 Q75,80 65,60" fill="#D97706" stroke="#78350F" strokeWidth="2" />
             <path d="M40,70 Q50,80 60,70" fill="#FDE68A" /> {/* Belly */}
             {/* Bone in hand */}
             <path d="M75,60 L90,40" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
             <circle cx="75" cy="60" r="3" fill="#E5E7EB" /> <circle cx="90" cy="40" r="3" fill="#E5E7EB" />
             {/* Skull Helmet */}
             <path d="M25,50 L20,30 Q30,10 50,15 Q70,10 80,30 L75,50 Q75,65 50,65 L45,60 L40,65 Q25,65 25,50" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
             <path d="M35,45 Q40,40 45,45" fill="none" stroke="#9CA3AF" strokeWidth="1" /> {/* Eye Socket */}
             <circle cx="42" cy="46" r="2" fill="#000" /> {/* Eye */}
             <path d="M60,45 Q65,40 70,45" fill="none" stroke="#9CA3AF" strokeWidth="1" />
             <path d="M45,30 L50,25 L55,30" stroke="#9CA3AF" strokeWidth="1" /> {/* Cracks */}
             <path d="M25,35 L20,38" stroke="#9CA3AF" strokeWidth="2" /> {/* Horns L */}
             <path d="M75,35 L80,38" stroke="#9CA3AF" strokeWidth="2" /> {/* Horns R */}
             <path d="M48,58 L52,58" stroke="#9CA3AF" strokeWidth="1" /> {/* Nostrils */}
        </svg>
      );
    case 'magikarp':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Fins */}
             <path d="M50,20 L30,5 L40,30" fill="#FCD34D" stroke="#B45309" strokeWidth="2" /> {/* Top Fin */}
             <path d="M50,80 L30,95 L40,70" fill="#FCD34D" stroke="#B45309" strokeWidth="2" /> {/* Bottom Fin */}
             <path d="M85,50 L95,30 L95,70 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="2" /> {/* Tail */}
             {/* Body */}
             <path d="M20,50 Q30,20 85,50 Q30,80 20,50" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
             {/* Scales */}
             <path d="M40,40 Q45,50 40,60" fill="none" stroke="#FCA5A5" strokeWidth="1" opacity="0.6" />
             <path d="M50,35 Q55,50 50,65" fill="none" stroke="#FCA5A5" strokeWidth="1" opacity="0.6" />
             <path d="M60,40 Q65,50 60,60" fill="none" stroke="#FCA5A5" strokeWidth="1" opacity="0.6" />
             {/* Face */}
             <path d="M20,50 Q10,60 15,70 Q25,70 30,60" fill="#FCD34D" stroke="#B45309" strokeWidth="1" /> {/* Lips */}
             <circle cx="35" cy="40" r="5" fill="#FFF" stroke="#000" strokeWidth="1" /> <circle cx="35" cy="40" r="1.5" fill="#000" />
             {/* Whiskers */}
             <path d="M25,55 Q10,70 20,85" fill="none" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
             <path d="M25,55 Q15,40 5,45" fill="none" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'eevee':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Ears */}
             <path d="M20,20 Q15,40 35,40 L45,30" fill="#92400E" stroke="#451A03" strokeWidth="2" />
             <path d="M25,28 Q25,35 32,35" fill="#451A03" opacity="0.6" />
             <path d="M80,20 Q85,40 65,40 L55,30" fill="#92400E" stroke="#451A03" strokeWidth="2" />
             <path d="M75,28 Q75,35 68,35" fill="#451A03" opacity="0.6" />
             {/* Head */}
             <circle cx="50" cy="50" r="22" fill="#B45309" stroke="#78350F" strokeWidth="2" />
             {/* Collar */}
             <path d="M30,65 Q50,85 70,65 Q85,60 80,75 Q50,95 20,75 Q15,60 30,65" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
             {/* Face */}
             <circle cx="42" cy="50" r="3" fill="#000" /> <circle cx="43" cy="49" r="1" fill="#FFF" />
             <circle cx="58" cy="50" r="3" fill="#000" /> <circle cx="59" cy="49" r="1" fill="#FFF" />
             <circle cx="50" cy="58" r="1" fill="#000" />
             <path d="M48,60 Q50,62 52,60" fill="none" stroke="#000" strokeWidth="1" />
        </svg>
      );
    case 'snorlax':
      return (
        <svg viewBox="0 0 100 100" className={commonProps}>
             {/* Ears */}
             <path d="M25,25 L35,40" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
             <path d="M75,25 L65,40" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
             {/* Body/Head */}
             <circle cx="50" cy="55" r="35" fill="#334155" stroke="#0F172A" strokeWidth="2" />
             {/* Face Shape */}
             <path d="M35,40 Q50,30 65,40 Q68,50 65,65 Q50,75 35,65 Q32,50 35,40" fill="#FEF3C7" stroke="#0F172A" strokeWidth="1" />
             {/* Eyes (Sleep) */}
             <path d="M40,50 L48,50" stroke="#000" strokeWidth="2" strokeLinecap="round" />
             <path d="M52,50 L60,50" stroke="#000" strokeWidth="2" strokeLinecap="round" />
             {/* Mouth */}
             <path d="M45,60 L55,60" stroke="#000" strokeWidth="1" strokeLinecap="round" />
             <path d="M42,60 L42,57" stroke="#000" strokeWidth="1" /> {/* Tooth */}
             <path d="M58,60 L58,57" stroke="#000" strokeWidth="1" />
             {/* Feet */}
             <ellipse cx="30" cy="85" rx="10" ry="6" fill="#FEF3C7" stroke="#0F172A" strokeWidth="2" />
             <circle cx="30" cy="85" r="3" fill="#78350F" />
             <ellipse cx="70" cy="85" rx="10" ry="6" fill="#FEF3C7" stroke="#0F172A" strokeWidth="2" />
             <circle cx="70" cy="85" r="3" fill="#78350F" />
        </svg>
      );
    default:
      return <div className="text-4xl">?</div>;
  }
};

const ResultModal: React.FC<ResultModalProps> = ({ number, color, maxNumber, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  // Select creature based on number (consistent for the same number)
  const creature = useMemo(() => {
    // Use (number - 1) so number 1 gets index 0
    return CREATURE_DEX[(number - 1) % CREATURE_DEX.length];
  }, [number]);

  // Calculate star count (1-5) based on percentage of maxNumber
  const starCount = useMemo(() => {
    if (maxNumber <= 0) return 5;
    const ratio = number / maxNumber;
    return Math.max(1, Math.min(5, Math.ceil(ratio * 5)));
  }, [number, maxNumber]);

  useEffect(() => {
    // Delay showing the content slightly to sync with the "Pop" animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Capsule Content */}
      <div className="relative z-10 flex flex-col items-center animate-pop">
        
        {/* The Spirit Ball Opening */}
        <div className="relative w-72 h-72 flex items-center justify-center perspective-800">
            
            {/* Burst Effect behind the creature */}
            <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse scale-150 opacity-60 ${creature.bg}`}></div>
            <div className="absolute inset-0 bg-white/40 rounded-full blur-xl animate-ping scale-110" style={{ animationDuration: '2s' }}></div>
            
            {/* Top Half of Spirit Ball */}
            <div 
                className={`absolute top-0 w-64 h-32 rounded-t-full ${color} transition-all duration-700 ease-in-out border-4 border-slate-900 border-b-[12px] shadow-2xl overflow-hidden z-30`}
                style={{ 
                    transform: showContent ? 'translateY(-140px) rotate(-20deg)' : 'translateY(0)',
                    transformOrigin: 'bottom center'
                }}
            >
                {/* Highlight */}
                <div className="absolute top-4 left-6 w-16 h-8 bg-white/30 rounded-full rotate-[-20deg]"></div>
            </div>

            {/* Bottom Half of Spirit Ball */}
            <div 
                className={`absolute bottom-0 w-64 h-32 rounded-b-full bg-white transition-all duration-700 ease-in-out border-4 border-slate-900 border-t-[12px] shadow-2xl flex items-center justify-center overflow-hidden z-30`}
                style={{ 
                    transform: showContent ? 'translateY(140px) rotate(20deg)' : 'translateY(0)',
                    transformOrigin: 'top center'
                }}
            >
                {/* Button Mechanism */}
                 <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-[6px] border-slate-900 rounded-full z-30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900/20 bg-gray-100"></div>
                 </div>
            </div>

            {/* The Creature Card (Pops out) */}
            <div 
                className={`absolute z-20 transition-all duration-700 delay-200 transform ${showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-20'}`}
            >
                <div className="animate-float">
                    {/* Pokemon Card Style Container */}
                    <div className={`w-56 h-72 rounded-xl border-[6px] ${creature.border} bg-gradient-to-br ${creature.color} shadow-[0_0_50px_rgba(255,255,255,0.5)] flex flex-col p-2 relative overflow-hidden rotate-3 hover:rotate-0 transition-transform`}>
                        
                        {/* Header */}
                        <div className="flex justify-between items-center px-1 mb-1">
                            <span className={`font-bold text-xs uppercase ${creature.text} bg-white/30 px-2 py-0.5 rounded-full`}>
                                {creature.type}
                            </span>
                            <span className={`font-black text-sm ${creature.text}`}>
                                No.{String(number).padStart(3, '0')}
                            </span>
                        </div>

                        {/* Image Area */}
                        <div className="flex-1 bg-white/40 rounded-lg border-2 border-white/50 flex items-center justify-center relative shadow-inner overflow-hidden group flex-col">
                            {/* Background Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shine"></div>
                            
                            {/* The "Creature" SVG */}
                            <div className="transform group-hover:scale-110 transition-transform duration-300 mb-2 filter drop-shadow-xl">
                                <CreatureIllustration id={creature.id} />
                            </div>
                        </div>

                        {/* Footer / Name & Stars */}
                        <div className="mt-2 text-center bg-slate-900/10 rounded-lg py-1 backdrop-blur-sm">
                            <h3 className={`text-xl font-extrabold ${creature.text} tracking-wider`}>
                                {creature.name}
                            </h3>
                            {/* Dynamic Stars */}
                            <div className="flex justify-center gap-1 mt-1 h-5">
                                {Array.from({ length: starCount }).map((_, i) => (
                                    <span 
                                        key={i} 
                                        className="text-yellow-400 text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] animate-bounce"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        ⭐
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        {/* Large Number Display below animation */}
        <div className={`mt-24 mb-6 transition-all duration-500 delay-500 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <div className="flex flex-col items-center">
                <div className={`bg-amber-100 px-12 py-4 rounded-3xl border-[6px] ${creature.border} shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center min-w-[160px]`}>
                     <span className="text-6xl font-black text-slate-800 tracking-tighter">
                        {number}
                     </span>
                </div>
             </div>
        </div>

        {/* Action Button */}
        <div className={`transition-all duration-500 delay-700 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <button 
                onClick={onClose}
                className={`px-12 py-3 ${creature.bg} ${creature.text} border-b-4 ${creature.border} brightness-110 hover:brightness-125 font-black rounded-full shadow-lg active:border-b-0 active:translate-y-1 transition-all text-xl flex items-center gap-2 mx-auto`}
             >
                收服! (OK)
             </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;