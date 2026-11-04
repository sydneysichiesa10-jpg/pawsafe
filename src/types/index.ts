export type PetSpecies = 'dog' | 'cat' | 'reptile' | 'bird' | 'small-animal';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: string;
  ageShort: string;
  gender: 'Male' | 'Female';
  weight: string;
  size: 'Small' | 'Medium' | 'Large';
  location: string;
  rescuedTime: string;
  badges: string[];
  status: 'Ready for Home' | 'Adoptable' | 'In Foster' | 'Pending';
  photos: string[];
  photoAlts: string[];
  temperamentTags: string[];
  story: string[];
  bestMatchFor: string;
  healthPassport: {
    name: string;
    status: string;
    icon: string;
  }[];
  shelter: {
    name: string;
    type: string;
    city: string;
    campus: string;
    distance: string;
    address: string;
    hours: string;
    fee: string;
    phone: string;
    coordinator: string;
    mapImage: string;
  };
  roadmapSteps: {
    step: number;
    title: string;
    desc: string;
  }[];
}

export interface RadarSavedProof {
  photoUrl: string;
  rescuerName: string;
  rescuedAt: string;
  notes?: string;
  clinicOrShelter?: string;
}

export interface RadarSighting {
  id: string;
  animalType: 'dog' | 'cat' | 'puppies' | 'reptile' | 'bird' | 'small-animal' | 'other';
  title: string;
  description: string;
  location: string;
  coordinates: { x: number; y: number }; // Percentage on radar map 0-100
  distance: string;
  timeAgo: string;
  urgency: 'critical' | 'urgent' | 'moderate' | 'secured';
  status: 'Searching' | 'Volunteer En Route' | 'Triage' | 'Secured' | 'Rescued';
  respondersCount: number;
  image: string;
  reportedBy: string;
  isSaved?: boolean;
  savedProof?: RadarSavedProof;
}

export interface EmergencyClinic {
  id: string;
  name: string;
  category: '24/7 Emergency' | 'Shelter Partner' | 'Low-Cost Vet' | 'Microchip Station';
  address: string;
  distance: string;
  hours: string;
  phone: string;
  rating: number;
  services: string[];
  verified: boolean;
}

export interface RedeemedVoucher {
  id: string;
  voucherId: string;
  title: string;
  partner: string;
  code: string;
  discount: string;
  redeemedAt: string;
  expiresAt: string;
  pointsSpent: number;
  qrValue: string;
  category: 'vet' | 'grooming' | 'supplies' | 'cafe';
}

export interface VoucherReward {
  id: string;
  title: string;
  partner: string;
  category: 'vet' | 'grooming' | 'supplies' | 'cafe';
  pointsCost: number;
  discount: string;
  description: string;
  icon: string;
  badge: string;
  terms: string;
}

export interface UserProfile {
  id: string;
  isLoggedIn: boolean;
  username: string;
  nickname: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  phone: string;
  city: string;
  role: 'Volunteer Rescuer' | 'Foster Parent' | 'Pet Adopter' | 'Animal Advocate';
  rescuesAssisted: number;
  petsFostered: number;
  joinedDate: string;
  achievementPoints: number;
  redeemedVouchers: RedeemedVoucher[];
}

