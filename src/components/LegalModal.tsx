import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

type ModalType = 'privacy' | 'terms' | 'disclaimer' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: ModalType;
}

const modalContent: Record<NonNullable<ModalType>, { title: string; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="mb-6">
          At Wagholi Highstreet, we value your privacy and are committed to protecting the personal information you share with us through this website or landing page.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">1. Information We Collect</h3>
        <p className="mb-3">When you fill out the enquiry form on this landing page, we may collect details such as:</p>
        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
          <li>Full Name</li>
          <li>Mobile Number</li>
          <li>Email Address</li>
          <li>Business / Investment Requirement</li>
          <li>Budget Preference</li>
          <li>Any other information you voluntarily submit</li>
        </ul>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">2. How We Use Your Information</h3>
        <p className="mb-3">The information shared by you may be used for:</p>
        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
          <li>Contacting you regarding project details</li>
          <li>Sharing pricing, availability, floor plans, and offers</li>
          <li>Assisting you with site visit coordination</li>
          <li>Understanding your requirement better and suggesting suitable options</li>
          <li>Providing updates related to the project, inventory, and booking benefits</li>
        </ul>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">3. Sharing of Information</h3>
        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
          <li>Your personal information will be used only for project-related communication and assistance.</li>
          <li>We do not sell, rent, or trade your personal data to third parties.</li>
          <li>However, your information may be shared with our authorized sales team, channel partners, or service providers only for the purpose of assisting you with your enquiry.</li>
        </ul>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">4. Consent for Communication</h3>
        <p className="mb-3">By submitting your details on this landing page, you authorize us to contact you via:</p>
        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
          <li>Phone Call</li>
          <li>SMS</li>
          <li>WhatsApp</li>
          <li>Email</li>
        </ul>
        <p className="text-white/80">for project-related updates, pricing, offers, and assistance.</p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">5. Data Security</h3>
        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
          <li>We take reasonable steps to protect the information you share with us.</li>
          <li>However, while we strive to maintain data security, no online transmission or storage system can be guaranteed to be 100% secure.</li>
        </ul>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">6. Cookies / Tracking</h3>
        <p className="text-white/80">
          This landing page may use cookies, pixels, or tracking tools to understand visitor activity, improve campaign performance, and enhance your browsing experience.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">7. External Links</h3>
        <p className="text-white/80">
          If this landing page contains links to third-party websites, we are not responsible for the privacy practices or content of those websites.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">8. Updates to This Policy</h3>
        <p className="text-white/80">
          We may update this Privacy Policy from time to time without prior notice. Any changes will be reflected on this page.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">9. Contact Us</h3>
        <p className="text-white/80">
          If you have any questions regarding this Privacy Policy or the use of your information, you may contact our team through the details shared on this landing page.
        </p>
      </>
    ),
  },
  terms: {
    title: 'Terms & Conditions',
    content: (
      <>
        <p className="mb-6">
          By accessing this landing page and submitting your details, you agree to the following terms and conditions:
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">1. Project Information</h3>
        <p className="text-white/80">
          All project details, pricing, offers, unit sizes, amenities, possession timelines, and availability mentioned on this landing page are for general information purposes only and may be subject to change without prior notice.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">2. Pricing & Availability</h3>
        <p className="text-white/80">
          Prices, offers, inventory, and booking benefits are subject to current availability and developer discretion. Submission of the form does not guarantee allotment, price lock, or availability of any specific unit.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">3. Visuals & Representations</h3>
        <p className="text-white/80">
          All images, render views, layouts, maps, and visual representations used on this landing page are for illustrative and presentation purposes only. Actual project features, specifications, and final execution may vary.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">4. No Legal Offer</h3>
        <p className="text-white/80">
          The content shared on this landing page does not constitute a legal offer, commitment, or contract of any kind. Final terms of sale, allotment, and purchase will be governed by the official documents, application forms, and agreements issued by the developer.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">5. User Information</h3>
        <p className="text-white/80">
          By submitting your details, you confirm that the information provided by you is accurate and voluntarily shared for the purpose of receiving project-related communication and assistance.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">6. Consent to Contact</h3>
        <p className="text-white/80">
          By filling out the enquiry form, you authorize us and our authorized representatives to contact you via call, WhatsApp, SMS, or email regarding pricing, inventory, offers, site visits, and other project-related updates.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">7. Third-Party Sharing</h3>
        <p className="text-white/80">
          Your information may be shared with authorized sales representatives, channel partners, or service providers only for the purpose of responding to your enquiry and assisting you with project-related communication.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">8. No Warranty</h3>
        <p className="text-white/80">
          While reasonable efforts are made to keep the information updated and accurate, we do not provide any warranty or guarantee regarding the completeness, accuracy, or reliability of the information published on this landing page.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">9. User Responsibility</h3>
        <p className="text-white/80">
          You are advised to independently verify all project details, pricing, approvals, specifications, and legal documents before making any purchase decision.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">10. Changes to Terms</h3>
        <p className="text-white/80">
          These Terms & Conditions may be updated, modified, or revised at any time without prior notice. Continued use of this landing page shall be considered acceptance of the updated terms.
        </p>
      </>
    ),
  },
  disclaimer: {
    title: 'Disclaimer',
    content: (
      <>
        <p className="mb-6">
          Prices, availability, offers, possession timelines, and project details are subject to change as per current availability and developer terms. Images, visuals, and amenities shown are for presentation purposes only.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">No Professional Relationship</h3>
        <p className="text-white/80">
          The information provided on this landing page does not create any professional relationship, obligation, or commitment between the visitor and Wagholi Highstreet or its associates.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">Accuracy of Information</h3>
        <p className="text-white/80">
          While we strive to ensure all information is accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the content.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">Investment Risks</h3>
        <p className="text-white/80">
          Commercial real estate investments involve risks. Prospective buyers are advised to conduct their own due diligence and consult with appropriate professionals before making any investment decisions.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">Regulatory Compliance</h3>
        <p className="text-white/80">
          The project is subject to all applicable RERA regulations and approvals. Interested parties are advised to verify all regulatory compliances independently.
        </p>

        <h3 className="font-headline text-xl font-bold text-[var(--color-sandybrown-100)] mb-3 mt-8">Contact For Verification</h3>
        <p className="text-white/80">
          For the most current information, pricing, and availability, please contact our sales team directly through the contact details provided on this landing page.
        </p>
      </>
    ),
  },
};

export default function LegalModal({ isOpen, onClose, modalType }: LegalModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!modalType) return null;

  const content = modalContent[modalType];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[9999] flex items-center justify-center pointer-events-none"
          >
            <div
              className="bg-[#0a0f1a] border border-[var(--color-sandybrown-100)]/20 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-sandybrown-100)]/20 bg-[#04060b]">
                <h2 className="font-headline text-2xl font-bold text-[var(--color-sandybrown-100)]">
                  {content.title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-[var(--color-sandybrown-100)] transition-colors p-2"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
                <div className="text-white/90 font-body text-[15px] leading-relaxed">
                  {content.content}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[var(--color-sandybrown-100)]/20 bg-[#04060b]">
                <p className="text-white/50 text-sm text-center">
                  Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
