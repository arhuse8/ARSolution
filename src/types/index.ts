export type BoardId = 'cbse' | 'icse' | 'maharashtra' | 'other';

export type TeachingMode = 'Home Tuition' | 'Online Tuition' | 'Both';

export interface BoardOption {
  id: BoardId;
  name: string;
  fullName: string;
  isSupported: boolean;
  badge?: string;
  description: string;
}

export interface SubjectOption {
  id: string;
  name: string;
  iconName: string;
  stream?: 'General' | 'Science' | 'Commerce' | 'Humanities';
  popular?: boolean;
}

export interface Chapter {
  number: number;
  title: string;
  description: string;
  learningObjectives: string[];
  keyTopics?: string[];
  examWeightage?: string;
}

export interface SyllabusData {
  classNum: number;
  boardId: BoardId;
  subjectId: string;
  subjectName: string;
  academicYear: string;
  totalChapters: number;
  recommendedHours: number;
  chapters: Chapter[];
}

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type SlotPeriod = 'Morning' | 'Afternoon' | 'Evening';

export interface TimeSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  period: SlotPeriod;
  status: 'available' | 'booked';
  mode?: 'Home Tuition' | 'Online Tuition' | 'Both';
}

export interface Tutor {
  id: string;
  name: string;
  photoUrl: string;
  gender: 'Male' | 'Female';
  qualification: string;
  institution: string;
  experienceYears: number;
  classes: number[];
  boards: string[];
  subjects: string[];
  teachingMode: 'Home Tuition' | 'Online Tuition' | 'Both';
  serviceAreas: string[];
  city: string;
  sessionDuration: string;
  feePerHour: number;
  verified: boolean;
  backgroundChecked: boolean;
  demoAvailable: boolean;
  rating: number;
  reviewsCount: number;
  bio: string;
  teachingStyle: string;
  languages: string[];
  availableDays: string[];
  schedule?: TimeSlot[];
  badge?: string;
}

export interface TutorRequest {
  id?: string;
  parentName: string;
  mobileNumber: string;
  email?: string;
  studentClass: number;
  board: string;
  subjects: string[];
  teachingMode: string;
  areaPinCode?: string;
  city?: string;
  preferredDate?: string;
  expectedFees?: string;
  preferredTime: string;
  budget?: string;
  additionalRequirements?: string;
  createdAt?: string;
}

export interface TeacherRegistration {
  id?: string;
  // Step 1: Basic
  fullName: string;
  mobileNumber: string;
  email: string;
  city: string;
  areaOrPinCode: string;
  // Step 2: Teaching
  highestQualification: string;
  teachingExperience: string;
  classesTaught: number[];
  boardsTaught: string[];
  subjectsTaught: string[];
  teachingLanguages: string[];
  // Step 3: Preferences
  teachingMode: string;
  availableDays: string[];
  preferredHours: string;
  serviceArea: string;
  feePerSession: number;
  sessionDuration: string;
  // Step 4: Consent
  agreedToTerms: boolean;
  createdAt?: string;
}

export interface ActiveSelection {
  selectedClass: number | null;
  selectedBoard: BoardId | null;
  selectedSubjects: string[];
  teachingMode: 'Home Tuition' | 'Online Tuition' | 'Both';
  location: string;
  activeSection: 'overview' | 'syllabus' | 'tutors';
}
