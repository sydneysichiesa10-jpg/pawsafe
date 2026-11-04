import React from 'react';

export interface AnimalBadgeProps {
  animalType: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const getAnimalDetails = (animalType: string) => {
  switch (animalType.toLowerCase()) {
    case 'dog':
    case 'dogs':
      return {
        label: 'Dog',
        emoji: '🐕',
        symbol: 'pets',
        bg: 'bg-amber-100 text-amber-900 border-amber-300',
        pinBg: 'bg-[#ffdad2] text-[#822714]',
        pinRing: 'ring-amber-400',
      };
    case 'puppies':
    case 'puppy':
    case 'litter':
      return {
        label: 'Puppies',
        emoji: '🐾',
        symbol: 'pets',
        bg: 'bg-orange-100 text-orange-900 border-orange-300',
        pinBg: 'bg-[#ffdad2] text-[#822714]',
        pinRing: 'ring-orange-400',
      };
    case 'cat':
    case 'cats':
    case 'kitten':
      return {
        label: 'Cat',
        emoji: '🐱',
        symbol: 'pets',
        bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        pinBg: 'bg-[#e0e0ff] text-[#2c2069]',
        pinRing: 'ring-indigo-400',
      };
    case 'reptile':
    case 'reptiles':
    case 'tortoise':
    case 'turtle':
      return {
        label: 'Reptile / Tortoise',
        emoji: '🐢',
        symbol: 'shield',
        bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        pinBg: 'bg-[#d1f2e2] text-[#004732]',
        pinRing: 'ring-emerald-400',
      };
    case 'bird':
    case 'birds':
      return {
        label: 'Bird',
        emoji: '🦜',
        symbol: 'feather',
        bg: 'bg-sky-100 text-sky-900 border-sky-300',
        pinBg: 'bg-[#d8f0ff] text-[#003d5c]',
        pinRing: 'ring-sky-400',
      };
    case 'small-animal':
    case 'small':
    case 'rabbit':
    case 'bunny':
      return {
        label: 'Rabbit / Small Pet',
        emoji: '🐰',
        symbol: 'cruelty_free',
        bg: 'bg-rose-100 text-rose-900 border-rose-300',
        pinBg: 'bg-[#ffd9e3] text-[#711634]',
        pinRing: 'ring-rose-400',
      };
    default:
      return {
        label: 'Rescue Animal',
        emoji: '🐾',
        symbol: 'pets',
        bg: 'bg-teal-100 text-teal-900 border-teal-300',
        pinBg: 'bg-[#e6f0eb] text-[#004732]',
        pinRing: 'ring-teal-400',
      };
  }
};

export const AnimalSpeciesIcon: React.FC<{ animalType: string; className?: string }> = ({
  animalType,
  className = 'text-[18px]',
}) => {
  const details = getAnimalDetails(animalType);
  return (
    <span className={`inline-flex items-center justify-center leading-none select-none ${className}`} title={details.label}>
      {details.emoji}
    </span>
  );
};

export const AnimalSpeciesTag: React.FC<AnimalBadgeProps> = ({
  animalType,
  showLabel = true,
}) => {
  const details = getAnimalDetails(animalType);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${details.bg}`}
    >
      <span className="text-[12px] leading-none">{details.emoji}</span>
      {showLabel && <span>{details.label}</span>}
    </span>
  );
};
