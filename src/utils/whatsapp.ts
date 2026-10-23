/**
 * WhatsApp integration utilities for ARsolution.
 * Direct message routing to coordinator WhatsApp number: 9112768872 (+91 91127 68872).
 * Formats data cleanly without multi-byte box-drawing characters that cause replacement glyphs.
 */

export const COORDINATOR_PHONE_RAW = '9112768872';
export const COORDINATOR_WHATSAPP_NUMBER = '919112768872'; // international format (+91 91127 68872)
export const COORDINATOR_DISPLAY_PHONE = '+91 91127 68872';

export interface ParentTuitionDetails {
  requestId?: string;
  parentName: string;
  mobileNumber: string;
  studentClass: number | string;
  board?: string;
  subjects?: string[] | string;
  teachingMode?: string;
  areaPinCode?: string;
  preferredDate?: string;
  expectedFees?: string;
  preferredTime?: string;
  additionalRequirements?: string;
  selectedTeacherInfo?: string;
}

/**
 * Builds a clean, Gen Z aesthetic WhatsApp message containing all parent info.
 * Uses ASCII safe lines (-----) instead of unicode box glyphs (━━━) to avoid replacement question marks.
 */
export function buildParentWhatsAppMessage(details: ParentTuitionDetails): string {
  const subjectsStr = Array.isArray(details.subjects)
    ? details.subjects.join(', ')
    : details.subjects || 'All Core Subjects';

  const cleanBoard = details.board ? details.board.toUpperCase() : 'CBSE';
  const reqId = details.requestId || `REQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const lines: string[] = [
    '⚡ *ARsolution Tuition Match Request*',
    '✨ _Verified 1-on-1 Mentorship & Free Demo Class_',
    '----------------------------------------',
    `👤 *Student / Parent:* ${details.parentName.trim()}`,
    `📱 *WhatsApp / Mobile:* ${details.mobileNumber.trim()}`,
    `🎯 *Class & Board:* Class ${details.studentClass} (${cleanBoard})`,
    `📚 *Subjects Needed:* ${subjectsStr}`,
    `🏡 *Mode:* ${details.teachingMode || 'Home Tuition (In-Person)'}`,
  ];

  if (details.areaPinCode && details.areaPinCode.trim()) {
    lines.push(`📍 *Location / PIN:* ${details.areaPinCode.trim()}`);
  }

  if (details.preferredDate) {
    lines.push(`📅 *Preferred Start Date:* ${details.preferredDate}`);
  }

  if (details.expectedFees && details.expectedFees.trim()) {
    lines.push(`💰 *Expected Budget:* ${details.expectedFees.trim()}`);
  }

  if (details.preferredTime && details.preferredTime.trim()) {
    lines.push(`⏰ *Preferred Slot:* ${details.preferredTime.trim()}`);
  }

  if (details.selectedTeacherInfo && details.selectedTeacherInfo.trim()) {
    lines.push(`👨‍🏫 *Tutor Preference:* ${details.selectedTeacherInfo.trim()}`);
  }

  if (details.additionalRequirements && details.additionalRequirements.trim()) {
    lines.push(`📝 *Special Note:* ${details.additionalRequirements.trim()}`);
  }

  lines.push('----------------------------------------');
  lines.push(`🏷️ *Request ID:* #${reqId}`);
  lines.push(`💬 *Helpline:* +91 91127 68872`);
  lines.push('----------------------------------------');
  lines.push('🚀 _Please confirm tutor availability & schedule 45-min demo. Thank you!_');

  return lines.join('\n');
}

export interface TeacherWhatsAppDetails {
  fullName: string;
  mobileNumber: string;
  email?: string;
  city?: string;
  areaOrPinCode?: string;
  highestQualification?: string;
  teachingExperience?: string;
  classesTaught?: (number | string)[];
  boardsTaught?: string[];
  subjectsTaught?: string[];
  teachingLanguages?: string[];
  teachingMode?: string;
  availableDays?: string[];
  preferredHours?: string;
  serviceArea?: string;
  feePerSession?: number | string;
  sessionDuration?: string;
  id?: string;
}

/**
 * Builds a clean, professional WhatsApp message for a newly registered teacher,
 * matching the parent tuition request flow.
 * Direct routing to Coordinator: 9112768872 (+91 91127 68872).
 */
export function buildTeacherWhatsAppMessage(
  details: TeacherWhatsAppDetails,
  applicationId?: string
): string {
  const appId = applicationId || details.id || `TCHR-${Math.floor(100000 + Math.random() * 900000)}`;

  const classesStr =
    details.classesTaught && details.classesTaught.length > 0
      ? details.classesTaught.map((c) => `Class ${c}`).join(', ')
      : 'Classes 1–12';

  const boardsStr =
    details.boardsTaught && details.boardsTaught.length > 0
      ? details.boardsTaught.join(', ')
      : 'CBSE, ICSE, State Board';

  const subjectsStr =
    details.subjectsTaught && details.subjectsTaught.length > 0
      ? details.subjectsTaught.join(', ')
      : 'All Core Subjects';

  const languagesStr =
    details.teachingLanguages && details.teachingLanguages.length > 0
      ? details.teachingLanguages.join(', ')
      : 'English, Hindi';

  const daysStr =
    details.availableDays && details.availableDays.length > 0
      ? details.availableDays.join(', ')
      : 'Mon–Sat (Flexible)';

  const feeDisplay =
    details.feePerSession !== undefined && Number(details.feePerSession) > 0
      ? `₹${details.feePerSession} / session`
      : 'Standard Platform Rate / Flexible';

  const lines: string[] = [
    '🎓 *ARsolution New Teacher Application*',
    '✨ _Educator Profile Verification & Onboarding Request_',
    '----------------------------------------',
    `👤 *Teacher Name:* ${details.fullName.trim()}`,
    `📱 *WhatsApp / Mobile:* ${details.mobileNumber.trim()}`,
  ];

  if (details.email && details.email.trim()) {
    lines.push(`📧 *Email:* ${details.email.trim()}`);
  }

  const locationStr = [details.city, details.areaOrPinCode].filter(Boolean).join(', ');
  if (locationStr) {
    lines.push(`📍 *Location:* ${locationStr}`);
  }

  lines.push('----------------------------------------');
  lines.push(`🎓 *Highest Qualification:* ${details.highestQualification?.trim() || 'Graduate'}`);
  lines.push(`⏳ *Teaching Experience:* ${details.teachingExperience || '1–3 Years'}`);
  lines.push(`🎯 *Classes Taught:* ${classesStr}`);
  lines.push(`🏛️ *Boards:* ${boardsStr}`);
  lines.push(`📚 *Subjects:* ${subjectsStr}`);
  lines.push(`🗣️ *Medium / Languages:* ${languagesStr}`);
  lines.push('----------------------------------------');
  lines.push(`🏡 *Teaching Mode:* ${details.teachingMode || 'Home & Online Tuition'}`);

  if (details.serviceArea && details.serviceArea.trim()) {
    lines.push(`📍 *Preferred Areas:* ${details.serviceArea.trim()}`);
  }

  lines.push(`📅 *Available Days:* ${daysStr}`);
  if (details.preferredHours && details.preferredHours.trim()) {
    lines.push(`⏰ *Preferred Time:* ${details.preferredHours.trim()}`);
  }

  lines.push(`💰 *Expected Remuneration:* ${feeDisplay} (${details.sessionDuration || '60 mins'})`);
  lines.push('----------------------------------------');
  lines.push(`🏷️ *Application ID:* #${appId}`);
  lines.push(`💬 *Coordinator Helpline:* +91 91127 68872`);
  lines.push('----------------------------------------');
  lines.push('🚀 _Educator is ready for document verification & demo assessment. Please contact soon!_');

  return lines.join('\n');
}

/**
 * Returns the direct WhatsApp URL for opening chat with pre-filled message.
 * Uses official api.whatsapp.com which opens directly on mobile apps & desktop.
 */
export function getWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${COORDINATOR_WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export function getWaMeUrl(message: string): string {
  return `https://wa.me/${COORDINATOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab / application with the given message.
 * Safe fallback for popups and mobile environments.
 */
export function sendToWhatsApp(message: string): boolean {
  const url = getWhatsAppUrl(message);
  try {
    const isMobile =
      typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = url;
      return true;
    }

    const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!openedWindow) {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
        } catch {}
      }, 400);
    }
    return true;
  } catch (err) {
    console.warn('Unable to automatically open WhatsApp window', err);
    return false;
  }
}

/**
 * Utility to copy text to clipboard with fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

const STORAGE_KEY = 'arsolution_parent_submissions';

export const INITIAL_SAMPLE_REQUESTS = [
  {
    id: 'REQ-918234',
    parentName: 'Sunil Patil',
    mobileNumber: '9820012345',
    studentClass: 10,
    board: 'CBSE',
    subjects: ['Mathematics', 'Science'],
    teachingMode: 'Home Tuition',
    areaPinCode: 'Andheri West, Mumbai (400053)',
    preferredDate: new Date().toISOString().split('T')[0],
    expectedFees: '₹6,000 / month',
    preferredTime: 'Evening (5:00 PM – 7:00 PM)',
    additionalRequirements: 'Needs conceptual clarity in trigonometry and physics formulas.',
    status: 'DEMO_SCHEDULED',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    whatsappNumber: '9112768872',
  },
  {
    id: 'REQ-745192',
    parentName: 'Anita Deshmukh',
    mobileNumber: '9819234567',
    studentClass: 12,
    board: 'Maharashtra State Board',
    subjects: ['Chemistry', 'Biology'],
    teachingMode: 'Online Tuition',
    areaPinCode: 'Pune / Kothrud',
    preferredDate: new Date().toISOString().split('T')[0],
    expectedFees: '₹8,000 / month',
    preferredTime: 'Weekend Mornings (9 AM – 11 AM)',
    additionalRequirements: 'HSC Board preparation + NEET concept reinforcement.',
    status: 'PENDING_MATCH',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    whatsappNumber: '9112768872',
  },
];

/**
 * Save parent submission to localStorage so it is always visible in the Coordinator Inbox / Direct Messages,
 * even when hosted as a static site on GitHub Pages without an active backend.
 */
export function saveParentSubmission(submission: any): void {
  try {
    const list = getLocalParentSubmissions();
    const updated = [submission, ...list.filter((item: any) => item.id !== submission.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save submission to localStorage:', err);
  }
}

/**
 * Retrieves parent submissions from localStorage, falling back to initial verified requests.
 */
export function getLocalParentSubmissions(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to read submissions from localStorage:', err);
  }
  return INITIAL_SAMPLE_REQUESTS;
}

const TEACHER_STORAGE_KEY = 'arsolution_teacher_submissions';

export const INITIAL_SAMPLE_TEACHERS = [
  {
    id: 'TCHR-884102',
    fullName: 'Dr. Rajesh Sharma',
    mobileNumber: '9820199881',
    email: 'rajesh.sharma@gmail.com',
    city: 'Mumbai',
    areaOrPinCode: 'Andheri West (400053)',
    highestQualification: 'Ph.D. in Physics (IIT Bombay)',
    teachingExperience: '10+ Years',
    classesTaught: [10, 11, 12],
    boardsTaught: ['CBSE', 'ICSE', 'State Board'],
    subjectsTaught: ['Physics', 'Mathematics'],
    teachingLanguages: ['English', 'Hindi'],
    teachingMode: 'Home Tuition',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    preferredHours: 'Evening (5:00 PM – 8:30 PM)',
    serviceArea: 'Andheri, Juhu, Lokhandwala, Vile Parle',
    feePerSession: 1200,
    sessionDuration: '60 minutes',
    status: 'VERIFIED_ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    whatsappNumber: '9112768872',
  },
];

/**
 * Save teacher registration to localStorage so it is preserved and visible in the Coordinator Inbox,
 * even when deployed statically on GitHub Pages.
 */
export function saveTeacherSubmission(teacher: any): void {
  try {
    const list = getLocalTeacherSubmissions();
    const updated = [teacher, ...list.filter((item: any) => item.id !== teacher.id)];
    localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save teacher submission to localStorage:', err);
  }
}

/**
 * Retrieves teacher registrations from localStorage.
 */
export function getLocalTeacherSubmissions(): any[] {
  try {
    const raw = localStorage.getItem(TEACHER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to read teacher submissions from localStorage:', err);
  }
  return INITIAL_SAMPLE_TEACHERS;
}
