/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BoardId, Tutor, TimeSlot } from './types';
import { getSubjectsForClassAndBoard } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ClassGrid } from './components/ClassGrid';
import { ExpandableClassFlow } from './components/ExpandableClassFlow';
import { SyllabusAccordion } from './components/SyllabusAccordion';
import { TutorResults } from './components/TutorResults';
import { TutorProfileModal } from './components/TutorProfileModal';
import { TutorRequestModal } from './components/TutorRequestModal';
import { TeacherRegistrationModal } from './components/TeacherRegistrationModal';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { TrustFeatures } from './components/TrustFeatures';
import { TestimonialsSection } from './components/TestimonialsSection';
import { JoinTeacherBanner } from './components/JoinTeacherBanner';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Discovery State
  const [selectedClass, setSelectedClass] = useState<number | null>(10);
  const [selectedBoard, setSelectedBoard] = useState<BoardId>('cbse');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['math', 'science']);
  const [teachingMode, setTeachingMode] = useState<'Home Tuition' | 'Online Tuition' | 'Both'>('Both');
  const [location, setLocation] = useState<string>('Andheri, Mumbai');
  const [showSyllabus, setShowSyllabus] = useState<boolean>(false);
  const [showTutors, setShowTutors] = useState<boolean>(true);

  // Modals State
  const [teacherModalOpen, setTeacherModalOpen] = useState<boolean>(false);
  const [tutorRequestModalOpen, setTutorRequestModalOpen] = useState<boolean>(false);
  const [selectedTutorForProfile, setSelectedTutorForProfile] = useState<Tutor | null>(null);
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<TimeSlot | null>(null);
  const [aiAdvisorModalOpen, setAiAdvisorModalOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers
  const handleSelectClass = (classNum: number) => {
    setSelectedClass(classNum);
    // Auto-populate initial default subjects for this class and current board
    const available = getSubjectsForClassAndBoard(classNum, selectedBoard);
    const initialSubs = available.slice(0, 2).map((s) => s.id);
    setSelectedSubjects(initialSubs);
    setShowTutors(true);

    addToast('info', `Class ${classNum} selected`, 'Explore syllabus or find matching home and online tutors below.');

    // Smooth scroll down to expandable flow
    setTimeout(() => {
      const el = document.getElementById('class-flow-container');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelectBoard = (boardId: BoardId) => {
    setSelectedBoard(boardId);
    if (selectedClass) {
      const available = getSubjectsForClassAndBoard(selectedClass, boardId);
      setSelectedSubjects(available.slice(0, 2).map((s) => s.id));
    }
  };

  const handleToggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSelectAllSubjects = () => {
    if (selectedClass && selectedBoard) {
      const all = getSubjectsForClassAndBoard(selectedClass, selectedBoard).map((s) => s.id);
      setSelectedSubjects(all);
    }
  };

  const handleClearSubjects = () => {
    setSelectedSubjects([]);
  };

  const handleScrollToClasses = () => {
    const el = document.getElementById('class-selection-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToFaq = () => {
    const el = document.getElementById('faq-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewSyllabus = () => {
    setShowSyllabus(true);
    setTimeout(() => {
      const el = document.getElementById('syllabus-panel');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFindTutors = () => {
    setShowTutors(true);
    setTimeout(() => {
      const el = document.getElementById('tutor-results-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFindTutorForSubject = (subjectId: string) => {
    if (!selectedSubjects.includes(subjectId)) {
      setSelectedSubjects([subjectId]);
    }
    setShowTutors(true);
    setTimeout(() => {
      const el = document.getElementById('tutor-results-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRequestClassFromTutor = (tutor: Tutor, slot?: TimeSlot) => {
    setSelectedTutorForBooking(tutor);
    setSelectedSlotForBooking(slot || null);
    setTutorRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col antialiased selection:bg-orange-100 selection:text-orange-950">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Global Header */}
      <Header
        onFindTutorClick={handleScrollToClasses}
        onJoinTeacherClick={() => setTeacherModalOpen(true)}
        onOpenAiAdvisor={() => setAiAdvisorModalOpen(true)}
        onScrollToClasses={handleScrollToClasses}
        onScrollToFaq={handleScrollToFaq}
      />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreClassesClick={handleScrollToClasses}
          onJoinTeacherClick={() => setTeacherModalOpen(true)}
          onOpenAiAdvisor={() => setAiAdvisorModalOpen(true)}
        />

        {/* Discovery Container: Class Grid + Expandable Flow + Results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Class Grid */}
          <ClassGrid
            selectedClass={selectedClass}
            onSelectClass={handleSelectClass}
          />

          {/* Expandable Class & Board Selection (Revealed when class is selected) */}
          {selectedClass && (
            <div id="class-flow-container">
              <ExpandableClassFlow
                selectedClass={selectedClass}
                selectedBoard={selectedBoard}
                selectedSubjects={selectedSubjects}
                teachingMode={teachingMode}
                location={location}
                onSelectBoard={handleSelectBoard}
                onToggleSubject={handleToggleSubject}
                onSelectAllSubjects={handleSelectAllSubjects}
                onClearSubjects={handleClearSubjects}
                onChangeTeachingMode={setTeachingMode}
                onChangeLocation={setLocation}
                onViewSyllabus={handleViewSyllabus}
                onFindTutors={handleFindTutors}
                onOpenAiAdvisor={() => setAiAdvisorModalOpen(true)}
                onRequestTutorModal={() => {
                  setSelectedTutorForBooking(null);
                  setTutorRequestModalOpen(true);
                }}
                onBackToClasses={handleScrollToClasses}
              />
            </div>
          )}

          {/* Expandable Syllabus Panel (Inside the same page) */}
          {selectedClass && showSyllabus && (
            <SyllabusAccordion
              selectedClass={selectedClass}
              selectedBoard={selectedBoard}
              selectedSubjects={selectedSubjects}
              onFindTutorForSubject={handleFindTutorForSubject}
              onRequestTutor={() => {
                setSelectedTutorForBooking(null);
                setTutorRequestModalOpen(true);
              }}
              onOpenAiAdvisor={() => setAiAdvisorModalOpen(true)}
            />
          )}

          {/* Tutor Search Results (Inside the same page) */}
          {showTutors && (
            <TutorResults
              selectedClass={selectedClass}
              selectedBoard={selectedBoard}
              selectedSubjects={selectedSubjects}
              teachingMode={teachingMode}
              location={location}
              onViewProfile={(tutor) => setSelectedTutorForProfile(tutor)}
              onRequestClass={handleRequestClassFromTutor}
              onRequestCustomTutor={() => {
                setSelectedTutorForBooking(null);
                setTutorRequestModalOpen(true);
              }}
              onChangeSelection={handleScrollToClasses}
              onSwitchToOnline={() => {
                setTeachingMode('Online Tuition');
                addToast('info', 'Switched to Online Tuition', 'Showing verified online educators across India.');
              }}
            />
          )}
        </section>

        {/* Trust & Safety Features */}
        <TrustFeatures />

        {/* Parent & Student Testimonials */}
        <TestimonialsSection />

        {/* Dedicated "Are You a Teacher?" Section (Section 10) */}
        <JoinTeacherBanner onRegisterClick={() => setTeacherModalOpen(true)} />

        {/* Expandable FAQ Accordion Section (Section 12) */}
        <FAQSection />
      </main>

      {/* Global Minimal Footer */}
      <Footer
        onJoinTeacherClick={() => setTeacherModalOpen(true)}
        onFindTutorClick={handleScrollToClasses}
        onScrollToFaq={handleScrollToFaq}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* MODALS */}

      {/* 1. Teacher Registration Multi-Step Modal */}
      <TeacherRegistrationModal
        isOpen={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
        onSuccess={(appId) => {
          addToast(
            'success',
            'Teacher Registration Received!',
            `Application ID: ${appId}. Our team will contact you within 24–48 hours.`
          );
        }}
      />

      {/* 2. Parent Tutor Request / Demo Class Modal */}
      <TutorRequestModal
        isOpen={tutorRequestModalOpen}
        onClose={() => {
          setTutorRequestModalOpen(false);
          setSelectedTutorForBooking(null);
          setSelectedSlotForBooking(null);
        }}
        prefillClass={selectedClass}
        prefillBoard={selectedBoard}
        prefillSubjects={selectedSubjects}
        prefillTutor={selectedTutorForBooking}
        prefillSlot={selectedSlotForBooking}
        onSuccess={(reqId) => {
          addToast(
            'success',
            'Tutor Request Received!',
            `Request ID: ${reqId}. An academic counselor will call you within 24 hours.`
          );
        }}
      />

      {/* 3. Comprehensive Tutor Profile Modal */}
      <TutorProfileModal
        tutor={selectedTutorForProfile}
        onClose={() => setSelectedTutorForProfile(null)}
        onRequestClass={handleRequestClassFromTutor}
      />

      {/* 4. AI Academic & Syllabus Advisor Modal (Gemini 3.1 Pro Preview with High Thinking) */}
      <AiAdvisorModal
        isOpen={aiAdvisorModalOpen}
        onClose={() => setAiAdvisorModalOpen(false)}
        prefillClass={selectedClass}
        prefillBoard={selectedBoard}
        prefillSubject={selectedSubjects[0] || 'Mathematics'}
        onRequestTutor={() => {
          setAiAdvisorModalOpen(false);
          setTutorRequestModalOpen(true);
        }}
      />

      {/* 5. Legal Modal (Privacy Policy / Terms and Conditions) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
