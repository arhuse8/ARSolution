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
    // 1. Create a real DOM anchor element with target="_blank" (immune to some popup blockers)
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

    // 2. Also attempt window.open
    const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (openedWindow && !openedWindow.closed && typeof openedWindow.closed !== 'undefined') {
      return true;
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
