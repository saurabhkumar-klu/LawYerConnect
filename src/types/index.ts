export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'lawyer' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
  createdAt: string;
  isOnline?: boolean;
  lastSeen?: string;
  preferences?: UserPreferences;
  verified?: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
  };
}

export interface Lawyer extends User {
  role: 'lawyer';
  bio: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  verified: boolean;
  availability: TimeSlot[];
  education: string[];
  barNumber: string;
  languages?: string[];
  consultationTypes?: ConsultationType[];
  responseTime?: number; // in minutes
  successRate?: number; // percentage
  totalCases?: number;
  isAvailableNow?: boolean;
  nextAvailableSlot?: string;
}

export interface Client extends User {
  role: 'client';
  caseHistory?: Consultation[];
  totalSpent?: number;
  memberSince?: string;
}

export interface Consultation {
  id: string;
  clientId: string;
  lawyerId: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'in-person' | 'phone';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  documents?: Document[];
  payment: Payment;
  meetingLink?: string;
  recordingUrl?: string;
  followUpRequired?: boolean;
  caseCategory?: string;
  urgency?: 'low' | 'medium' | 'high' | 'urgent';
  clientSatisfaction?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Document[];
  messageType?: 'text' | 'file' | 'voice' | 'video' | 'system';
  replyTo?: string;
  edited?: boolean;
  editedAt?: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  consultationId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'upi' | 'netbanking' | 'wallet';
  timestamp: string;
  transactionId?: string;
  gateway?: 'razorpay' | 'paytm' | 'phonepe';
  currency?: string;
  tax?: number;
  discount?: number;
  refundAmount?: number;
  refundReason?: string;
}

export interface Review {
  id: string;
  consultationId: string;
  clientId: string;
  lawyerId: string;
  rating: number;
  comment: string;
  timestamp: string;
  helpful?: number;
  categories?: ReviewCategory[];
  verified?: boolean;
  response?: LawyerResponse;
}

export interface ReviewCategory {
  category: 'communication' | 'expertise' | 'professionalism' | 'value' | 'timeliness';
  rating: number;
}

export interface LawyerResponse {
  content: string;
  timestamp: string;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
  bookedSlots?: string[];
  breakTime?: { start: string; end: string; };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  category?: 'contract' | 'evidence' | 'certificate' | 'identity' | 'other';
  isConfidential?: boolean;
  signatureRequired?: boolean;
  signed?: boolean;
  signedAt?: string;
  signedBy?: string;
}

export interface SearchFilters {
  specialty?: string;
  location?: string;
  rating?: number;
  priceRange?: [number, number];
  availability?: string;
  experience?: number;
  languages?: string[];
  consultationType?: ConsultationType;
  responseTime?: number;
  verified?: boolean;
  sortBy?: 'rating' | 'price' | 'experience' | 'availability' | 'reviews';
  sortOrder?: 'asc' | 'desc';
}

export interface ConsultationType {
  type: 'video' | 'phone' | 'in-person' | 'chat';
  available: boolean;
  rate?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'consultation' | 'message' | 'payment' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}

export interface AIInsight {
  id: string;
  type: 'case_prediction' | 'lawyer_match' | 'document_analysis' | 'legal_advice';
  content: string;
  confidence: number;
  sources: string[];
  timestamp: string;
  userId: string;
}

export interface LegalResource {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  views: number;
  likes: number;
}

export interface CaseTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  requiredDocuments: string[];
  estimatedDuration: string;
  averageCost: number;
  successRate: number;
  complexity: 'simple' | 'moderate' | 'complex';
}

export interface Analytics {
  totalConsultations: number;
  totalRevenue: number;
  averageRating: number;
  responseTime: number;
  clientRetention: number;
  popularSpecialties: { specialty: string; count: number; }[];
  monthlyGrowth: number;
  userSatisfaction: number;
}