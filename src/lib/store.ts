import fs from 'fs';
import path from 'path';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
  createdAt: string;
}

export interface SermonItem {
  id: string;
  title: string;
  speaker: string;
  series?: string;
  scripture?: string;
  sermonDate: string;
  videoUrl?: string;
  audioUrl?: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface MinistryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  leaderName: string;
  meetingTime: string;
  imageUrl?: string;
  icon?: string;
  createdAt: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  category: string;
  publishedAt: string;
  important?: boolean;
  createdAt: string;
}

export interface PastorItem {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  email?: string;
  order: number;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export interface PrayerItem {
  id: string;
  name: string;
  email?: string;
  request: string;
  isPublic: boolean;
  status: 'PENDING' | 'PRAYED' | 'ANSWERED';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  createdAt: string;
}

export interface DonationItem {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  fund: string;
  frequency: string;
  createdAt: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  projectChoice: string;
  contributionType: string;
  amountEstimate?: number;
  currency?: string;
  message?: string;
  status: 'PENDING' | 'APPROVED' | 'PARTNERED';
  createdAt: string;
}

interface ChurchDbData {
  users: AdminUser[];
  events: EventItem[];
  sermons: SermonItem[];
  ministries: MinistryItem[];
  announcements: AnnouncementItem[];
  pastors: PastorItem[];
  gallery: GalleryItem[];
  prayers: PrayerItem[];
  messages: ContactMessage[];
  donations: DonationItem[];
  sponsors: SponsorItem[];
}

const initialData: ChurchDbData = {
  users: [
    {
      id: 'admin-1',
      name: 'Pastor Duncan Kirya & Administrator',
      email: 'admin@christformedchurch.org',
      passwordHash: '$2a$10$w0.0b0M7pS...placeholder...$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQ0y5w0nO9M4o.N0i9zW6',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
    }
  ],
  events: [
    {
      id: 'evt-1',
      title: 'Sunday Celebration & Worship Service',
      description: 'Join us every Sunday morning in Kibiri for transformative worship, teaching, and fellowship.',
      eventDate: '2026-09-27',
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      location: 'Kibiri (near Munyonyo), Kampala, Uganda',
      category: 'Worship Service',
      imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'evt-2',
      title: 'Midweek Prayer & Altar Fellowship',
      description: 'Seeking God through intense prayer, acoustic worship, and Bible teaching.',
      eventDate: '2026-09-30',
      startTime: '05:00 PM',
      endTime: '07:00 PM',
      location: 'Kibiri Sanctuary',
      category: 'Prayer & Bible Study',
      imageUrl: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      createdAt: new Date().toISOString(),
    }
  ],
  sermons: [
    {
      id: 'sermon-1',
      title: 'Formed in Christ: Walking in Vision & Faith',
      speaker: 'Pastor Duncan Kirya',
      series: 'Transformed into His Image',
      scripture: 'Galatians 4:19',
      sermonDate: '2026-09-20',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Pastor Duncan Kirya shares how yielding our lives to Christ forms His divine character and purpose within us.',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      createdAt: new Date().toISOString(),
    }
  ],
  ministries: [
    {
      id: 'min-foundation',
      name: 'Christ Formed Foundation',
      slug: 'christ-formed-foundation',
      description: 'Supporting older people and single mothers facing financial, social, and practical challenges.',
      leaderName: 'Miss Flavia & Mrs. Christine Kirya',
      meetingTime: 'Weekly Outreach & Support Visits',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
      icon: 'HeartHandshake',
      createdAt: new Date().toISOString(),
    }
  ],
  announcements: [
    {
      id: 'ann-1',
      title: 'Christ Formed Foundation Support Drive',
      content: 'Partner with us as we provide food, encouragement, and practical help to older people and single mothers in Kibiri.',
      category: 'Foundation',
      publishedAt: '2026-09-20',
      important: true,
      createdAt: new Date().toISOString(),
    }
  ],
  pastors: [
    {
      id: 'pastor-1',
      name: 'Pastor Duncan Kirya',
      title: 'Founder & Pastor',
      bio: 'Birthed the ministry on 23rd March 2019 following a vision to reach and serve God’s people.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      email: 'pastorduncan@christformedchurch.org',
      order: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'pastor-2',
      name: 'Pastor Valence',
      title: 'Assistant Pastor',
      bio: 'Serves alongside Pastor Duncan in shepherding, teaching, and prayer ministry.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      email: 'pastorvalence@christformedchurch.org',
      order: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'pastor-3',
      name: 'Miss Flavia',
      title: 'Administrator',
      bio: 'Oversees church operations and foundation logistics for effective community service.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      email: 'flavia@christformedchurch.org',
      order: 3,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'pastor-4',
      name: 'Mrs. Christine Kirya',
      title: 'Assistant',
      bio: 'Supports pastoral care, women’s fellowship, and community encouragement.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      email: 'christine@christformedchurch.org',
      order: 4,
      createdAt: new Date().toISOString(),
    }
  ],
  gallery: [],
  prayers: [],
  messages: [],
  donations: [],
  sponsors: []
};

const DB_FILE = process.env.VERCEL || process.env.NODE_ENV === 'production'
  ? path.join('/tmp', 'church-data-store.json')
  : path.join(process.cwd(), 'church-data-store.json');

const INITIAL_DB_FILE = path.join(process.cwd(), 'church-data-store.json');

export function readStore(): ChurchDbData {
  try {
    if (!fs.existsSync(DB_FILE)) {
      let seed = initialData;
      if (fs.existsSync(INITIAL_DB_FILE)) {
        try {
          const content = fs.readFileSync(INITIAL_DB_FILE, 'utf-8');
          seed = JSON.parse(content);
        } catch (e) {
          seed = initialData;
        }
      }
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf-8');
      } catch (e) {
        // Fallback to in-memory if disk write is disabled
      }
      return seed;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading store:', err);
    return initialData;
  }
}

export function writeStore(data: ChurchDbData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store:', err);
  }
}
