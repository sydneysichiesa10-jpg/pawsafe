import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DATA_FILE = path.join(__dirname, '.sightings_store.json');

app.use(express.json({ limit: '10mb' }));

// Initial authentic Jakarta sightings
const DEFAULT_SIGHTINGS = [
  {
    id: 'sight-1',
    animalType: 'dog',
    title: 'Lost Golden Mix Waiting by Barito Park Fountain',
    description: 'Medium honey-gold dog with muddy paws resting gently beside the park fountain. Kept safe with water bowl by local street coffee vendor. Very gentle, nudges hands for comfort.',
    location: 'Taman Ayodya, Jl. Barito • Kebayoran Baru, Jakarta Selatan',
    coordinates: { x: 38, y: 55 },
    distance: '0.6 km away',
    timeAgo: '8 min ago',
    urgency: 'urgent',
    status: 'Volunteer En Route',
    respondersCount: 2,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Bimo (Barito Street Coffee)'
  },
  {
    id: 'sight-2',
    animalType: 'puppies',
    title: 'Cardboard Box of 3 Pups Left Under Minimarket Awning',
    description: 'Three domestic mixed puppies (~6 weeks old) found huddled together in fruit carton box during heavy rain. Minimarket staff brought them under the dry roof and provided goat milk.',
    location: 'Jl. Kemang Timur No. 12 (Depan Alfamart) • Jakarta Selatan',
    coordinates: { x: 62, y: 42 },
    distance: '1.1 km away',
    timeAgo: '18 min ago',
    urgency: 'critical',
    status: 'Searching',
    respondersCount: 4,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Sari (Kemang Timur Resident)'
  },
  {
    id: 'sight-3',
    animalType: 'cat',
    title: 'Vocal Calico Kitten Stuck Behind Café AC Compressor',
    description: 'Young calico kitten crying continuously from narrow gap behind outdoor AC compressor unit in Senopati café backyard. Dry weather, kitten seems uninjured but scared of traffic noise.',
    location: 'Jl. Senopati No. 41 • Kebayoran Baru, Jakarta Selatan',
    coordinates: { x: 74, y: 28 },
    distance: '1.4 km away',
    timeAgo: '27 min ago',
    urgency: 'moderate',
    status: 'Triage',
    respondersCount: 1,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Adit (Café Barista)'
  },
  {
    id: 'sight-4',
    animalType: 'reptile',
    title: 'Escaped Pet Sulcata Tortoise Grazing on BSD Greenway',
    description: 'Large pet tortoise grazing peacefully on public grass near community garden. Shell healthy, appears to be an escaped beloved pet.',
    location: 'Taman Kota BSD • Tangerang Selatan',
    coordinates: { x: 26, y: 35 },
    distance: '2.2 km away',
    timeAgo: '45 min ago',
    urgency: 'secured',
    status: 'Rescued',
    respondersCount: 2,
    image: 'https://images.unsplash.com/photo-1508455858334-95337ba25607?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Indra (Satpam Taman BSD)',
    isSaved: true,
    savedProof: {
      photoUrl: 'https://images.unsplash.com/photo-1508455858334-95337ba25607?auto=format&fit=crop&w=600&q=80',
      rescuerName: 'Sydney (Volunteer)',
      rescuedAt: 'Today, 14:20 WIB',
      notes: 'Safely secured in padded transport container and brought to BSD Wildlife & Exotic Pet Station. Microchip scan matched owner!',
      clinicOrShelter: 'BSD Wildlife Triage Center',
    },
  },
  {
    id: 'sight-5',
    animalType: 'bird',
    title: 'Tame Green Conure Grounded on Hibiscus Bush in Menteng',
    description: 'Tame green conure grounded on low garden hedge. Gently approached and accepted water drops from bottle cap. Appears exhausted, needs temporary avian carrier.',
    location: 'Taman Menteng, Jl. HOS Cokroaminoto • Jakarta Pusat',
    coordinates: { x: 52, y: 76 },
    distance: '1.8 km away',
    timeAgo: '1 hr ago',
    urgency: 'urgent',
    status: 'Volunteer En Route',
    respondersCount: 2,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Fajar (Menteng Cyclist)'
  },
  {
    id: 'sight-6',
    animalType: 'dog',
    title: 'Senior Black Lab Mix Sheltered by Halte Sudirman',
    description: 'Older lab with grey muzzle wearing blue reflective collar with expired tag. Very gentle and calm, drinking water provided by commuters.',
    location: 'Halte TransJakarta Bundaran HI & Sudirman • Jakarta Pusat',
    coordinates: { x: 45, y: 72 },
    distance: '2.5 km away',
    timeAgo: '2 hrs ago',
    urgency: 'secured',
    status: 'Secured',
    respondersCount: 3,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Dewi A. (TransJakarta Commuter)'
  }
];

// Helper to load sightings from disk or initialize
function getSightings(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading sightings file:', err);
  }
  return DEFAULT_SIGHTINGS;
}

function saveSightings(sightings: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(sightings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing sightings file:', err);
  }
}

// Active Server-Sent Events client connections for multi-screen push
let sseClients: { id: number; res: express.Response }[] = [];
let nextClientId = 1;

function broadcastSSE(type: string, sighting: any) {
  const payload = JSON.stringify({ type, sighting });
  sseClients.forEach((client) => {
    try {
      client.res.write(`data: ${payload}\n\n`);
    } catch {
      // Ignore
    }
  });
}

// API Routes
app.get('/api/sightings', (_req, res) => {
  const sightings = getSightings();
  res.json({ success: true, sightings });
});

app.post('/api/sightings', (req, res) => {
  const newSighting = req.body;
  if (!newSighting || !newSighting.title) {
    return res.status(400).json({ success: false, error: 'Invalid sighting data' });
  }

  const sightings = getSightings();
  const sightingWithId = {
    ...newSighting,
    id: newSighting.id || `sight-${Date.now()}`,
    timeAgo: newSighting.timeAgo || 'Just now',
  };

  sightings.unshift(sightingWithId);
  saveSightings(sightings);

  // Broadcast to all other connected screens in real-time
  broadcastSSE('NEW_SIGHTING', sightingWithId);

  res.status(201).json({ success: true, sighting: sightingWithId });
});

app.put('/api/sightings/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const sightings = getSightings();

  const index = sightings.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Sighting not found' });
  }

  sightings[index] = { ...sightings[index], ...updateData };
  saveSightings(sightings);

  // Broadcast update to all other connected screens
  broadcastSSE('UPDATE_SIGHTING', sightings[index]);

  res.json({ success: true, sighting: sightings[index] });
});

// Real-time Server-Sent Events stream for cross-screen / multi-device live sync
app.get('/api/sightings/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const clientId = nextClientId++;
  sseClients.push({ id: clientId, res });

  // Send initial ping
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', clientId })}\n\n`);

  // Heartbeat every 25 seconds to keep connection alive across proxies
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n');
    } catch {
      clearInterval(heartbeat);
    }
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients = sseClients.filter((c) => c.id !== clientId);
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🐾 PawSafe Live Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
