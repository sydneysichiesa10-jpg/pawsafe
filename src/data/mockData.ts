import { Pet, RadarSighting, EmergencyClinic } from '../types';

export const PAWSAFE_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuDK8_N-WZSl01MCAnJHApGp2iP3salCkmiQEFFyN2_hDRZYHRZbaDCBrsH9dge5mddoeUlZ6NHeaF3KBczuH90Fpcux_-9z6A5uVG7AymKGfhJMNuqPNqoGPo8qPvXAtDtfK3IXIVRnKLOzrfEzxMhryQpYH6-0rA9jPcNZauO2l1qkojfZYWMGt2wKfMIWf3SH1_ARz_7pQ1vMFibo7_0rU_CE-ii1n0S4B7gKj6OCEVC_RYBhSWWE";
export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuARmYRrOAavj9ZxsI1j3lDrZzRDlztKlWLdR4i33bPFJ4qYXg0d2z0JrTMGso_V05soimUfeSORTiR5jk9hy5SXdYh7l4nbtcSpLNvdNe2dPy8hxQXn9SQE4N76guGig8ntT4xU-ITwjYxfS_myp4pxLvI9yUDjTSDzd-EazMUzNJQM9ET4rheE5QQLAN3fS2xR-UnW6J4i1zrlZbenwVvGK0SYMMgSt_lb2pxPLU6kwyEuxoeogCm7";
export const SHELTER_MAP_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA4E5N_-ZJ4RB0EOVlyMp2HPxPJ1-xYTQrGAoG9UF7XBuGyDXopGZ1gtvITYOyAJCK2Y5nuinY5ypKuu4ukLvzHRl-mN1FM5zkUVEzsLI7g9toAuf9cb-Mc9PfjWHK0gYdIvkSP3hmR3vSHTWJeNpYQ1jfXgGT1fYdM2Xz7UmdVL1aGFjd6dkVdZw5ppVheJaDqwwnJprnWZhZjnKIMzAO1nedstFUTdOMfaIr3_t5RI4dL-XLaMqEP";

export const PETS_DATA: Pet[] = [
  {
    id: 'barnaby',
    name: 'Barnaby',
    species: 'dog',
    breed: 'Golden Mix',
    age: '2.2 Years',
    ageShort: '2 yrs',
    gender: 'Male',
    weight: '24.5 kg',
    size: 'Medium',
    location: 'Kemang, Jakarta Selatan',
    rescuedTime: 'Rescued 18 days ago',
    badges: ['Ready for Home', 'Adoptable'],
    status: 'Ready for Home',
    photos: [
      '/assets/aistudio/Image_1_2fec3635.jpeg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkManYdDt-TXJIjWXIZLXobnB8CJSYH-tf1XYGu3BUnsIO9S7NxmOoLiNetWtEqXVjKOL3O052CuzI9gYnzdvvfPZBlJC3c8CzVSjN1C8t26NpPb12TL4nGNUsdR7PwIvpOcpIKsKA01NyapVQnrGFyZpLa-gOK7U_0hmdvDFhiS1JYn7O-i54Mpy36g5rXtEjAOFk-JJvDjFmuixfkIVs7wy_-iV5FhGEmL2-_JySPhKj3xhRRu1g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Z6UaxZssiH2DzAnr9VtRwNv7njx204W5MNol55IIZAwrEHCObUHacmEbnjfGtVTThpcRXyYLdBwsW6V-IZdowQP6UY11mfz4mNUpVlrJEq3k97ceBJZWoIhLxBVPSqJ38_a9In0utdI9fOdaIgmnoONsc8NQje5LaM6OsvToKDBjsfh9qxVNPpvoh0GOhYKWpN4b7UOhjsZ3pKXtEEMCsZZyMVT0eFtQZj1T4b09Wht15a8qMfP8',
    ],
    photoAlts: [
      'A joyful golden retriever mix named Barnaby panting happily in a sun-drenched park with soft warm natural lighting, amber backlight, and emerald green foliage.',
      'Close up profile of a happy golden retriever mix dog with alert eyes, soft creamy amber fur, tilting head curiously on a rustic cozy shelter porch.',
      'A friendly rescue dog sitting patiently on a soft green lawn with a volunteer trainer, playful body language, wearing a teal fabric collar with brass tag.'
    ],
    temperamentTags: [
      'Gentle Soul',
      'Kid Loving',
      'Dog Friendly',
      'Leash Trained',
      'Housebroken',
      'Couch Potato'
    ],
    story: [
      'Barnaby was found wandering gently along the green pathway in Kemang after a heavy tropical rainstorm. Cold but remarkably sweet, he trotted right up to a morning jogger and offered a muddy paw. Since joining PawSafe Haven Indonesia, he has become the resident "big brother" to shy rescue pups.',
      'He loves brisk morning strolls, snoozing beside your desk during Zoom calls, and soft squeaky plush toys. His tail begins thumping gently the moment anyone makes eye contact!'
    ],
    bestMatchFor: 'Families, first-time dog owners, or homes with existing dogs.',
    healthPassport: [
      { name: 'Vaccinated (DHPP & Rabies)', status: 'Up to Date', icon: 'vaccines' },
      { name: 'Neutered & Dental Checked', status: 'Completed', icon: 'medical_services' },
      { name: 'ISO Microchipped (AVID #9822)', status: 'Registered', icon: 'qr_code_2' },
      { name: 'Heartworm & Tick Screen', status: 'Negative (Clean)', icon: 'vital_signs' },
    ],
    shelter: {
      name: 'PawSafe Haven Rescue Indonesia',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Jakarta Selatan, Indonesia',
      campus: 'Kemang Sanctuary Campus',
      distance: '1.5 km away',
      address: 'Jl. Kemang Timur No. 48, Jakarta Selatan',
      hours: 'Open Today 10:00 AM – 6:00 PM WIB',
      fee: 'Rp 450.000 All-Inclusive (Includes chip & care)',
      phone: '+62 21 719-PAWS',
      coordinator: 'Sarah Dewi',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Submit Online Application', desc: 'Takes 4 minutes. No obligation, helps us ensure Barnaby fits your living environment.' },
      { step: 2, title: 'Meet & Greet', desc: "Visit PawSafe Haven's shaded outdoor yard in Kemang to play fetch and bond with Barnaby." },
      { step: 3, title: '7-Day Trial Foster', desc: 'Experience everyday life together at home with full support and supplies provided.' },
      { step: 4, title: 'Finalize & Welcome Home!', desc: 'Sign adoption papers, transfer chip registration, and snap your welcome photo.' }
    ]
  },
  {
    id: 'cleo',
    name: 'Cleo',
    species: 'cat',
    breed: 'Calico Domestic Shorthair',
    age: '1.8 Years',
    ageShort: '1.8 yrs',
    gender: 'Female',
    weight: '3.6 kg',
    size: 'Small',
    location: 'Senopati, Jakarta Selatan',
    rescuedTime: 'Rescued 14 days ago',
    badges: ['Purr Machine', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Curious green-eyed calico cat looking gently toward the camera on sunlit windowsill',
      'Cute cat with glasses looking cozy and happy',
      'Content indoor calico cat stretching on a warm plush blanket'
    ],
    temperamentTags: [
      'Sweet Lap Warmer',
      'Litter Box Pro',
      'Gentle with Kids',
      'Apartment Friendly',
      'Calm Purrer',
      'Sunbeam Chaser'
    ],
    story: [
      'Cleo was sheltered by a boutique café in Senopati during heavy monsoon showers before arriving at our medical triage. She greeted the vet tech by curling around their wrist and purring like a gentle little motor.',
      'She is quiet, impeccably clean, and adores curling beside a keyboard or chasing wool balls. She does wonderfully in apartment spaces.'
    ],
    bestMatchFor: 'Apartment dwellers, remote professionals, or gentle homes wanting an affectionate feline companion.',
    healthPassport: [
      { name: 'FVRCP & Rabies Vaccinated', status: 'Up to Date', icon: 'vaccines' },
      { name: 'Spayed & Dental Scaled', status: 'Completed', icon: 'medical_services' },
      { name: 'ISO Microchipped (Registered)', status: 'Registered', icon: 'qr_code_2' },
      { name: 'FeLV / FIV Blood Screen', status: 'Negative (Clean)', icon: 'vital_signs' },
    ],
    shelter: {
      name: 'PawSafe Haven Rescue Indonesia',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Jakarta Selatan, Indonesia',
      campus: 'Kemang Sanctuary Campus',
      distance: '1.8 km away',
      address: 'Jl. Kemang Timur No. 48, Jakarta Selatan',
      hours: 'Open Today 10:00 AM – 6:00 PM WIB',
      fee: 'Rp 300.000 All-Inclusive (Vaccinated & Spayed)',
      phone: '+62 21 719-PAWS',
      coordinator: 'Sarah Dewi',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Submit Online Application', desc: 'Brief form checking window safety / cat screening.' },
      { step: 2, title: 'Cattery Meet & Greet', desc: 'Spend cozy time in our quiet indoor cat bonding room with Cleo.' },
      { step: 3, title: '7-Day Trial Foster', desc: 'Litter box, high-grade starter food, and carrier provided.' },
      { step: 4, title: 'Official Welcome Home', desc: 'Transfer chip records and receive adoption starter goodie pack.' }
    ]
  },
  {
    id: 'pascal',
    name: 'Pascal',
    species: 'reptile',
    breed: 'Bearded Dragon (Pogona)',
    age: '2.5 Years',
    ageShort: '2.5 yrs',
    gender: 'Male',
    weight: '480 g',
    size: 'Small',
    location: 'Canggu, Bali',
    rescuedTime: 'Rescued 3 weeks ago',
    badges: ['Gentle Lizard', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579380656108-328e4259b130?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Friendly bearded dragon with warm amber scales basking contentedly under natural light',
      'Close-up of curious reptile tilting head calmly',
      'Pascal sitting gently on a wooden basking log'
    ],
    temperamentTags: [
      'Docile & Friendly',
      'Loves Shoulder Perch',
      'Eats Bok Choy & Worms',
      'Hypoallergenic',
      'Quiet Companion',
      'Easy Habitat Routine'
    ],
    story: [
      'Pascal was brought to our Bali clinic when his expat guardian relocated abroad. Unlike wild reptiles, Pascal was captive-bred and hand-raised—he enjoys perching gently on your shoulder while you work or read.',
      'He loves basking under his warm UVB lamp, bobbing his head curiously, and eating fresh greens like mustard greens, bok choy, and occasional dusted mealworms.'
    ],
    bestMatchFor: 'Reptile enthusiasts or curious pet lovers with a 40-gallon terrarium setup.',
    healthPassport: [
      { name: 'UVB Absorption & Calcium', status: 'Optimal Bones', icon: 'vital_signs' },
      { name: 'Fecal Parasite Panel', status: 'Negative (Clean)', icon: 'medical_services' },
      { name: 'Scale & Nail Inspection', status: 'Healthy Shed', icon: 'health_and_safety' },
      { name: 'Permanent Microdot Tag', status: 'Registered', icon: 'qr_code_2' },
    ],
    shelter: {
      name: 'PawSafe Haven Bali Exotic Hub',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Denpasar & Canggu, Bali',
      campus: 'Canggu Reptile Suite',
      distance: '3.2 km away',
      address: 'Jl. Pantai Batu Bolong No. 58, Canggu, Bali',
      hours: 'Open Today 10:00 AM – 6:00 PM WITA',
      fee: 'Rp 350.000 (Includes Terrarium Care Guide)',
      phone: '+62 361 844-PAWS',
      coordinator: 'Made Arya',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Submit Setup Inquiry', desc: 'Share photo of your terrarium temperature and lighting setup.' },
      { step: 2, title: 'Hands-on Meet & Greet', desc: 'Learn Pascal’s favorite holding techniques and diet preferences.' },
      { step: 3, title: 'Habitat Transition Trial', desc: '5-day home transition with support from our exotic vet tech.' },
      { step: 4, title: 'Adoption Certification', desc: 'Finalize official certificate and care roadmap.' }
    ]
  },
  {
    id: 'rio',
    name: 'Rio',
    species: 'bird',
    breed: 'Green Conure Parakeet',
    age: '1.5 Years',
    ageShort: '1.5 yrs',
    gender: 'Male',
    weight: '115 g',
    size: 'Small',
    location: 'Menteng, Jakarta Pusat',
    rescuedTime: 'Rescued 1 month ago',
    badges: ['Hand-Tamed', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Vibrant tropical green parakeet perched happily on a wooden branch with bright intelligent eyes',
      'Colorful friendly bird stepping up to a volunteer finger'
    ],
    temperamentTags: [
      'Hand-Tamed',
      'Whistles Tunes',
      'Step-Up Trained',
      'Loves Apple & Papaya',
      'Playful Acrobatic',
      'Social & Alert'
    ],
    story: [
      'Rio was confiscated from an unpermitted roadside seller in Central Jakarta and underwent 4 weeks of nutritional rehab and wing conditioning at PawSafe Menteng.',
      'He is now fully vibrant, steps up onto fingers with enthusiasm, and makes cheerful morning chimes. He loves swinging from rope ladders and munching on fresh papaya seeds.'
    ],
    bestMatchFor: 'A bird-safe home that can offer out-of-cage supervised flight and daily interactive enrichment.',
    healthPassport: [
      { name: 'Avian Polyoma & Chlamydia', status: 'Negative (Clear)', icon: 'vital_signs' },
      { name: 'Beak, Feather & Crop Exam', status: 'Grade A Clean', icon: 'medical_services' },
      { name: 'Leg Band ID Verification', status: 'Registered ID', icon: 'qr_code_2' },
      { name: 'Nutritional Blood Panel', status: 'Full Recovery', icon: 'health_and_safety' },
    ],
    shelter: {
      name: 'PawSafe Haven Avian Sanctuary',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Jakarta Pusat, Indonesia',
      campus: 'Menteng Aviary Center',
      distance: '2.0 km away',
      address: 'Jl. Cikini Raya No. 73, Menteng, Jakarta Pusat',
      hours: 'Open Today 10:00 AM – 5:00 PM WIB',
      fee: 'Rp 250.000 (Includes Starter Pellets & Toy)',
      phone: '+62 21 319-CHIP',
      coordinator: 'Rian Hidayat',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Avian Application', desc: 'Confirm bird-safe environment (no non-stick cookware fumes).' },
      { step: 2, title: 'Aviary Play Session', desc: 'Interact with Rio in our secure indoor aviary flight room.' },
      { step: 3, title: 'In-Home Acclimation', desc: 'Safe cage integration guidance from our avian volunteer.' },
      { step: 4, title: 'Flock Membership', desc: 'Official adoption certificate and ongoing community avian check-ins.' }
    ]
  },
  {
    id: 'tortuga',
    name: 'Bima',
    species: 'reptile',
    breed: 'Sulcata Tortoise (Kura-Kura Darat)',
    age: '4.0 Years',
    ageShort: '4 yrs',
    gender: 'Male',
    weight: '8.2 kg',
    size: 'Medium',
    location: 'BSD City, Tangerang',
    rescuedTime: 'Rescued 2 weeks ago',
    badges: ['Gentle Herbivore', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1508455858334-95337ba25607?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Sturdy African spurred tortoise grazing happily in green lawn garden',
      'Tortoise basking under bright morning sunshine'
    ],
    temperamentTags: [
      'Gentle Giant',
      'Loves Grass & Hay',
      'Loves Sunbaths',
      'Outdoor Garden Ready',
      'Very Long Lifespan',
      'Peaceful'
    ],
    story: [
      'Bima was rescued when found wandering safely into a suburban residential driveway in BSD. He is healthy, well-nourished, and exceptionally calm with human presence.',
      'He spends hours slowly exploring grassy outdoor yards, munching Bermuda grass and hibiscus leaves, and soaking in a shallow water pan on hot afternoons.'
    ],
    bestMatchFor: 'Homes with a securely fenced sunny garden lawn or dedicated tortoise enclosure.',
    healthPassport: [
      { name: 'Carapace & Shell Integrity', status: 'Hard & Healthy', icon: 'health_and_safety' },
      { name: 'Beak & Joint Motility', status: '100% Cleared', icon: 'medical_services' },
      { name: 'Fecal Wellness Panel', status: 'Negative (Clean)', icon: 'vital_signs' },
      { name: 'Microchip Sub-Dermal', status: 'Registered #TK482', icon: 'qr_code_2' },
    ],
    shelter: {
      name: 'PawSafe Haven Satwa Nusantara',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Tangerang & BSD City',
      campus: 'BSD Garden Sanctuary',
      distance: '4.5 km away',
      address: 'Jl. Pahlawan Seribu No. 22, BSD, Tangerang',
      hours: 'Open Today 09:00 – 17:00 WIB',
      fee: 'Rp 400.000 (Includes Garden Safety Check)',
      phone: '+62 21 537-PAWS',
      coordinator: 'Doni Pratama',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Garden Verification', desc: 'Confirm secure perimeter barrier and sun exposure.' },
      { step: 2, title: 'Sanctuary Visit', desc: 'Feed Bima fresh leaves and observe his daily locomotion.' },
      { step: 3, title: 'Outdoor Trial Week', desc: 'Guidance on night shelters and seasonal humidity.' },
      { step: 4, title: 'Lifetime Adoption Record', desc: 'Permanent registration and health passport handover.' }
    ]
  },
  {
    id: 'boba-miki',
    name: 'Boba & Miki',
    species: 'small-animal',
    breed: 'Holland Lop Dwarf Bunnies',
    age: '1.2 Years',
    ageShort: '1.2 yrs',
    gender: 'Female',
    weight: '1.6 kg each',
    size: 'Small',
    location: 'Sleman, DI Yogyakarta',
    rescuedTime: 'Rescued 12 days ago',
    badges: ['Bonded Duo', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Pair of fluffy dwarf lop bunnies grooming each other on soft indoor carpet',
      'Curious little bunny munching fresh timothy hay'
    ],
    temperamentTags: [
      'Litter Box Trained',
      'Quiet & Gentle',
      'Inseparable Sisters',
      'Timothy Hay Lovers',
      'Great for Calm Homes',
      'Affectionate Nudgers'
    ],
    story: [
      'Boba and Miki are bonded twin sisters who were safely surrendered together in Sleman. They are indoor house bunnies who groom each other continuously and perform joyous "binkies" (happy hops) in the evening.',
      'They are 100% litter trained and love romaine lettuce, Timothy hay, and gentle forehead pets while you relax on the sofa.'
    ],
    bestMatchFor: 'Quiet indoor homes seeking a peaceful, sweet pair of indoor rabbit companions.',
    healthPassport: [
      { name: 'RHDV2 Vaccine Series', status: 'Up to Date', icon: 'vaccines' },
      { name: 'Spayed & Molars Checked', status: 'Completed', icon: 'medical_services' },
      { name: 'Microchipped (AVID)', status: 'Registered', icon: 'qr_code_2' },
      { name: 'Digestive Wellness Exam', status: 'Grade A Healthy', icon: 'vital_signs' },
    ],
    shelter: {
      name: 'PawSafe Haven Yogyakarta',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Yogyakarta & Sleman',
      campus: 'Kaliurang Branch',
      distance: '2.8 km away',
      address: 'Jl. Kaliurang KM 8.5, Sleman, Yogyakarta',
      hours: 'Foster Visits by Appointment',
      fee: 'Rp 300.000 for Pair Special',
      phone: '+62 274 888-PAWS',
      coordinator: 'Maya Kusuma',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Bunny Proofing Inquiry', desc: 'Quick check that cables and baseboards are protected.' },
      { step: 2, title: 'Playpen Bonding Meetup', desc: 'Interact with Boba & Miki in our peaceful rabbit lounge.' },
      { step: 3, title: 'Indoor Trial Weekend', desc: 'Experience their evening binkies and grooming routines.' },
      { step: 4, title: 'Welcome to the Family', desc: 'Sign papers and take home starter hay, hideout box, and chip info.' }
    ]
  },
  {
    id: 'milo-luna',
    name: 'Milo & Luna',
    species: 'dog',
    breed: 'Bonded Pair (Beagle & Lab)',
    age: '3.0 Years',
    ageShort: '3 yrs',
    gender: 'Male',
    weight: '17 & 19 kg',
    size: 'Medium',
    location: 'Dago, Bandung, Jawa Barat',
    rescuedTime: 'Rescued 24 days ago',
    badges: ['Bonded Pair', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Two cheerful dogs lying side-by-side on the grass outdoors, smiling into camera',
      'Playful beagle and lab mix romping happily in a fenced yard'
    ],
    temperamentTags: [
      'Inseparable Best Friends',
      'Gentle Comedians',
      'Dog Friendly',
      'Quiet Indoors',
      'Good on Leash'
    ],
    story: [
      'Milo and Luna have been side-by-side since they were eight weeks old. When their elderly guardian moved, they arrived together with matching wagging tails and calm confidence.',
      'They do everything together—synchronous nap time, sniffing every wildflower along the cool Dago hills, and curling into a single dog bed even when two are provided.'
    ],
    bestMatchFor: 'A home with a backyard and adopters looking for an instant double dose of warmth.',
    healthPassport: [
      { name: 'Core Vaccinations', status: 'Up to Date', icon: 'vaccines' },
      { name: 'Spayed & Neutered', status: 'Completed', icon: 'medical_services' },
      { name: 'Dual Microchipped', status: 'Registered', icon: 'qr_code_2' },
      { name: 'Heartworm & Fecal Test', status: 'Clear & Healthy', icon: 'vital_signs' },
    ],
    shelter: {
      name: 'PawSafe Haven Bandung',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Bandung, Jawa Barat',
      campus: 'Dago Sanctuary',
      distance: '2.1 km away',
      address: 'Jl. Ir. H. Juanda No. 120, Dago, Bandung',
      hours: 'Open Today 11:00 AM – 7:00 PM WIB',
      fee: 'Rp 650.000 for Pair Special',
      phone: '+62 22 250-PAWS',
      coordinator: 'Elena Pratama',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Submit Online Application', desc: 'Pre-screen living space suitable for a bonded duo.' },
      { step: 2, title: 'Meet & Greet Double Playdate', desc: 'Spend time with both pups in our open agility park.' },
      { step: 3, title: 'Foster Trial Period', desc: '10-day trial with tandem harnesses and supplies.' },
      { step: 4, title: 'Family Integration', desc: 'Final adoption blessing and commemorative twin bandana set.' }
    ]
  },
  {
    id: 'rosie',
    name: 'Rosie',
    species: 'dog',
    breed: 'Corgi & Local Pup',
    age: '6 Months',
    ageShort: '6 mos',
    gender: 'Female',
    weight: '9.5 kg',
    size: 'Small',
    location: 'Canggu, Bali',
    rescuedTime: 'Rescued 9 days ago',
    badges: ['Puppy', 'Adoptable'],
    status: 'Adoptable',
    photos: [
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Rosie the puppy tilting her head with big expressive ears and warm hazel eyes',
      'Puppy running with a rubber chew toy on sunlit lawn'
    ],
    temperamentTags: [
      'Curious Explorer',
      'Eager Learner',
      'Cuddle Fanatic',
      'Food Motivated',
      'Puppy Class Ready'
    ],
    story: [
      'Rosie was surrendered with her littermates during a monsoon rescue triage in Bali. Her big bat ears and comical hops immediately melted our volunteer intake team.',
      'She is already learning "sit" and "touch", sleeps soundly in her crate at night with her heartbeat teddy, and loves belly rubs while you read.'
    ],
    bestMatchFor: 'Active humans excited about positive puppy training and social adventures.',
    healthPassport: [
      { name: 'Puppy Booster Series (3/3)', status: 'Up to Date', icon: 'vaccines' },
      { name: 'Spayed & Dewormed', status: 'Completed', icon: 'medical_services' },
      { name: 'Lifetime Microchip', status: 'Registered', icon: 'qr_code_2' },
      { name: 'Puppy Wellness Exam', status: 'Grade A Healthy', icon: 'vital_signs' },
    ],
    shelter: {
      name: 'PawSafe Haven Bali',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Denpasar & Canggu, Bali',
      campus: 'Canggu Station',
      distance: '3.4 km away',
      address: 'Jl. Pantai Batu Bolong No. 58, Canggu, Bali',
      hours: 'Open Today 10:00 AM – 6:00 PM WITA',
      fee: 'Rp 500.000 (Includes Puppy Training Credit)',
      phone: '+62 361 844-PAWS',
      coordinator: 'Made Arya',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Submit Online Application', desc: 'Quick 4-minute form focused on puppy supervision routine.' },
      { step: 2, title: 'Meet & Greet', desc: 'Interact with Rosie in our puppy socialization suite.' },
      { step: 3, title: 'Puppy Proofing Check', desc: 'Helpful guidance on chew safety and crate setup.' },
      { step: 4, title: 'Adoption Welcome Pack', desc: 'Take home starter kibble, crate, toys, and chip certificate.' }
    ]
  },
  {
    id: 'pip',
    name: 'Pip',
    species: 'dog',
    breed: 'Terrier & Local Mix',
    age: '1.1 Years',
    ageShort: '1 yr',
    gender: 'Male',
    weight: '6.3 kg',
    size: 'Small',
    location: 'Sleman, DI Yogyakarta',
    rescuedTime: 'Rescued 3 weeks ago',
    badges: ['Foster-to-Adopt', 'Pocket Sized'],
    status: 'In Foster',
    photos: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
    ],
    photoAlts: [
      'Tiny scruffy terrier with inquisitive eyes wrapped in a cozy sweater',
      'Pip relaxing on a sofa cushion looking content'
    ],
    temperamentTags: [
      'Lap Warmer',
      'Apartment Friendly',
      'Polite Greeter',
      'Low Shedding',
      'Velcro Dog'
    ],
    story: [
      'Pip was found shivering underneath a food stall during a rainy evening in Sleman. Once tucked into a warm fleece blanket, he didn\'t leave the arms of our triage medic for two hours.',
      'He currently thrives in a Yogyakarta foster home where he acts as an executive lap warmer during remote work hours and walks like a little prince on his harness.'
    ],
    bestMatchFor: 'Apartment or condo dwellers seeking an affectionate, portable buddy.',
    healthPassport: [
      { name: 'Core Vaccines (Rabies & Bordetella)', status: 'Up to Date', icon: 'vaccines' },
      { name: 'Neutered & Patella Checked', status: 'Completed', icon: 'medical_services' },
      { name: 'Microchip AVID', status: 'Registered', icon: 'qr_code_2' },
      { name: 'Bloodwork Screen', status: 'Normal & Healthy', icon: 'vital_signs' },
    ],
    shelter: {
      name: 'PawSafe Haven Yogyakarta',
      type: 'Yayasan Satwa Resmi Partner',
      city: 'Yogyakarta & Sleman',
      campus: 'Kaliurang Branch',
      distance: '2.8 km away',
      address: 'Jl. Kaliurang KM 8.5, Sleman, Yogyakarta',
      hours: 'Foster Visits by Appointment',
      fee: 'Rp 350.000 All-Inclusive',
      phone: '+62 274 888-PAWS',
      coordinator: 'Maya Kusuma',
      mapImage: SHELTER_MAP_IMAGE
    },
    roadmapSteps: [
      { step: 1, title: 'Foster-to-Adopt Inquiry', desc: 'Connect directly with Pip\'s current foster caregiver.' },
      { step: 2, title: 'Coffee Shop Meetup', desc: 'Casual meet and greet at an outdoor pet-friendly patio.' },
      { step: 3, title: 'Home Trial Weekend', desc: 'See how Pip integrates into your personal space.' },
      { step: 4, title: 'Paperwork & Chip Transfer', desc: 'Seamless digital transfer and official adoption kit.' }
    ]
  }
];

export const RADAR_SIGHTINGS: RadarSighting[] = [
  {
    id: 'sight-1',
    animalType: 'dog',
    title: 'Golden Retriever Mix Spotted Near Taman Suropati',
    description: 'Medium honey-colored dog without collar trotting gently along path near Taman Suropati. Seems timid but friendly.',
    location: 'Taman Suropati, Menteng • Jakarta Pusat',
    coordinates: { x: 38, y: 55 },
    distance: '1.2 km away',
    timeAgo: '14 min ago',
    urgency: 'urgent',
    status: 'Volunteer En Route',
    respondersCount: 2,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    reportedBy: 'Kelsey (Pagi Runner)'
  },
  {
    id: 'sight-2',
    animalType: 'puppies',
    title: 'Box of 3 Pups Under Pedestrian Overpass',
    description: 'Cardboard box with 3 small puppies (approx 5-6 weeks) found sheltered under overpass ramp. Clean water provided by passerby.',
    location: 'Jl. Asia Afrika & Cikapundung • Bandung',
    coordinates: { x: 62, y: 42 },
    distance: '1.8 km away',
    timeAgo: '28 min ago',
    urgency: 'critical',
    status: 'Searching',
    respondersCount: 4,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80',
    reportedBy: 'Carlos M.'
  },
  {
    id: 'sight-3',
    animalType: 'cat',
    title: 'Calico Kitten Stranded in Drainage Culvert',
    description: 'Vocal calico kitten crying inside shallow dry drainage pipe. Dry weather, kitten seems scared but uninjured.',
    location: 'Jl. Pantai Berawa • Canggu, Bali',
    coordinates: { x: 74, y: 28 },
    distance: '2.5 km away',
    timeAgo: '42 min ago',
    urgency: 'moderate',
    status: 'Triage',
    respondersCount: 1,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&q=80',
    reportedBy: 'Devon K.'
  },
  {
    id: 'sight-4',
    animalType: 'reptile',
    title: 'Escaped Pet Sulcata Tortoise in Park Greenway',
    description: 'Large pet tortoise grazing peacefully on public grass near community garden. Shell healthy, appears to be an escaped beloved pet.',
    location: 'Taman Kota BSD • Tangerang Selatan',
    coordinates: { x: 26, y: 35 },
    distance: '0.8 km away',
    timeAgo: '50 min ago',
    urgency: 'moderate',
    status: 'Secured',
    respondersCount: 2,
    image: 'https://images.unsplash.com/photo-1508455858334-95337ba25607?auto=format&fit=crop&w=400&q=80',
    reportedBy: 'Indra (Taman Security)'
  },
  {
    id: 'sight-5',
    animalType: 'bird',
    title: 'Exotic Parakeet Grounded with Wing Fatigue',
    description: 'Tame green conure grounded on low hedge. Gently approached and accepted water drops from bottle cap. Needs temporary avian crate.',
    location: 'Jl. Diponegoro • Surabaya Pusat',
    coordinates: { x: 52, y: 76 },
    distance: '2.1 km away',
    timeAgo: '1 hr ago',
    urgency: 'urgent',
    status: 'Volunteer En Route',
    respondersCount: 2,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80',
    reportedBy: 'Siti Rahma'
  },
  {
    id: 'sight-6',
    animalType: 'dog',
    title: 'Senior Black Lab Resting by Bus Shelter',
    description: 'Older lab with grey muzzle wearing blue reflective collar with expired tag. Very gentle, drinking water provided.',
    location: 'Jl. Raya Darmo & Halte Bus • Surabaya',
    coordinates: { x: 45, y: 72 },
    distance: '3.1 km away',
    timeAgo: '2 hrs ago',
    urgency: 'secured',
    status: 'Secured',
    respondersCount: 3,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    reportedBy: 'Hana T. (Trans Semanggi Commuter)'
  }
];

export const EMERGENCY_CLINICS: EmergencyClinic[] = [
  {
    id: 'clinic-1',
    name: 'PawSafe Haven Animal Hospital & Triage Clinic',
    category: 'Shelter Partner',
    address: 'Jl. Kemang Timur No. 48, Jakarta Selatan 12730',
    distance: '1.5 km away',
    hours: 'Buka Hari Ini • 10:00 – 18:00 WIB',
    phone: '+62 21 719-PAWS',
    rating: 4.9,
    services: ['Intake Triage', 'Microchip Scanning', 'Foster Matching', 'Sterilisasi/Vaksin', 'Exotic Pet Care'],
    verified: true
  },
  {
    id: 'clinic-2',
    name: 'Jakarta Veterinary Specialty & 24/7 Emergency Hospital',
    category: '24/7 Emergency',
    address: 'Jl. Senopati No. 82, Kebayoran Baru, Jakarta Selatan',
    distance: '2.8 km away',
    hours: 'Buka 24 Jam • 7 Hari / Seminggu',
    phone: '+62 21 720-0955',
    rating: 4.8,
    services: ['24/7 Emergency Surgery', 'ICU Care', 'Trauma Stabilization', 'Digital X-Ray', 'Avian & Reptile Triage'],
    verified: true
  },
  {
    id: 'clinic-3',
    name: 'Klinik Hewan Satwa Sejahtera Town Center',
    category: 'Low-Cost Vet',
    address: 'Jl. Tebet Barat Dalam Raya No. 15, Jakarta Selatan',
    distance: '2.2 km away',
    hours: 'Buka Hari Ini • 09:00 – 17:00 WIB',
    phone: '+62 21 829-6519',
    rating: 4.9,
    services: ['Free Stray Scanning', 'Parvo ICU', 'Bottle Baby Nursery', 'Vaccine Clinics'],
    verified: true
  },
  {
    id: 'clinic-4',
    name: 'Pusat Kesehatan Hewan & Vaksinasi Subsidi',
    category: 'Low-Cost Vet',
    address: 'Jl. Margonda Raya No. 102, Depok / Jakarta Selatan',
    distance: '3.6 km away',
    hours: 'Buka Hari Ini • 08:00 – 17:00 WIB',
    phone: '+62 21 772-7729',
    rating: 4.7,
    services: ['Low-Cost Vaccines', 'Microchipping (Rp 150rb)', 'Flea/Tick Preventative', 'Heartworm Meds'],
    verified: true
  },
  {
    id: 'clinic-5',
    name: 'Pos Scanning Microchip Mandiri Satwa 24 Jam',
    category: 'Microchip Station',
    address: 'Jl. Cikini Raya No. 73, Menteng, Jakarta Pusat',
    distance: '1.1 km away',
    hours: 'Lobby Scanner Otomatis 24 Jam',
    phone: '+62 21 319-CHIP',
    rating: 4.9,
    services: ['Self-Service Universal Scanner', 'Direct Lost Pet Registry Search', 'Emergency Leashes & Cages'],
    verified: true
  }
];

export interface IndonesianCityZone {
  name: string;
  province: string;
  region: 'Jawa' | 'Bali & Nusa Tenggara' | 'Sumatera' | 'Sulawesi & Kalimantan';
  activeVolunteers: number;
}

export const INDONESIAN_CITIES: IndonesianCityZone[] = [
  { name: 'Jakarta (Selatan & Pusat)', province: 'DKI Jakarta', region: 'Jawa', activeVolunteers: 42 },
  { name: 'Jakarta (Barat, Utara & Timur)', province: 'DKI Jakarta', region: 'Jawa', activeVolunteers: 36 },
  { name: 'Bandung & Dago', province: 'Jawa Barat', region: 'Jawa', activeVolunteers: 28 },
  { name: 'Bali (Denpasar & Badung)', province: 'Bali', region: 'Bali & Nusa Tenggara', activeVolunteers: 39 },
  { name: 'Bali (Ubud & Gianyar)', province: 'Bali', region: 'Bali & Nusa Tenggara', activeVolunteers: 24 },
  { name: 'Surabaya (Pusat & Timur)', province: 'Jawa Timur', region: 'Jawa', activeVolunteers: 31 },
  { name: 'Yogyakarta & Sleman', province: 'DI Yogyakarta', region: 'Jawa', activeVolunteers: 26 },
  { name: 'Tangerang & BSD City', province: 'Banten', region: 'Jawa', activeVolunteers: 22 },
  { name: 'Bekasi & Depok', province: 'Jawa Barat', region: 'Jawa', activeVolunteers: 19 },
  { name: 'Medan Kota', province: 'Sumatera Utara', region: 'Sumatera', activeVolunteers: 18 },
  { name: 'Semarang', province: 'Jawa Tengah', region: 'Jawa', activeVolunteers: 15 },
  { name: 'Malang', province: 'Jawa Timur', region: 'Jawa', activeVolunteers: 16 },
  { name: 'Makassar', province: 'Sulawesi Selatan', region: 'Sulawesi & Kalimantan', activeVolunteers: 14 },
  { name: 'Balikpapan', province: 'Kalimantan Timur', region: 'Sulawesi & Kalimantan', activeVolunteers: 11 },
  { name: 'Batam', province: 'Kepulauan Riau', region: 'Sumatera', activeVolunteers: 12 },
];

export const NEIGHBORHOODS = INDONESIAN_CITIES.map((c) => c.name);
