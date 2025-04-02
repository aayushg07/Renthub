"use client";

import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button"; // Ensure Button supports onClick or replace it with a native button
import { ScrollArea } from "@/app/components/ui/Scrollarea";
import { Separator } from "@/app/components/ui/Separator";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaLock, FaShieldAlt, FaEnvelope, FaUserCog } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const [agreed, setAgreed] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const router = useRouter();

  const sections = [
    {
      id: 1,
      title: "Introduction",
      icon: <FaShieldAlt className="text-blue-500" />,
      content: "Welcome to RentHub! This Privacy Policy explains how we collect, use, and protect your personal data when you use our website and services."
    },
    {
      id: 2,
      title: "Information We Collect",
      icon: <FaLock className="text-purple-500" />,
      content: "We collect personal data such as your name, email address, payment information, and rental preferences when you use our platform. This information helps us provide a better service to you."
    },
    {
      id: 3,
      title: "How We Use Your Information",
      icon: <FaUserCog className="text-green-500" />,
      content: "The information we collect is used to process your rental transactions, communicate with you about your rentals, and improve our platform's functionality and user experience."
    },
    {
      id: 4,
      title: "Data Protection",
      icon: <FaLock className="text-yellow-500" />,
      content: "We use various security measures to protect your personal data. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security."
    },
    {
      id: 5,
      title: "Sharing Your Information",
      icon: <FaShieldAlt className="text-red-500" />,
      content: "We will not share your personal information with third parties except when required by law or when necessary to process your transactions. We may share data with trusted partners who help us run our services."
    },
    {
      id: 6,
      title: "Your Rights",
      icon: <FaUserCog className="text-indigo-500" />,
      content: "You have the right to access, modify, or delete your personal data. If you wish to exercise these rights, please contact us at support@renthun.com."
    },
    {
      id: 7,
      title: "Changes to This Policy",
      icon: <FaEnvelope className="text-pink-500" />,
      content: "We may update this Privacy Policy from time to time. When changes are made, the updated policy will be posted on this page with a new 'Last Updated' date."
    },
    {
      id: 8,
      title: "Contact Us",
      icon: <FaEnvelope className="text-blue-400" />,
      content: "If you have any questions regarding this Privacy Policy or our practices, please feel free to reach out to us at support@renthun.com."
    }
  ];

  const handleContinue = () => {
    if (agreed) {
      router.push('/');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="my-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 h-0.5" />
      </motion.div>

      {/* Enhanced Card with Interactive Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Quick Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(`section-${section.id}`)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-2 text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span>{section.title}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Policy Content */}
            <ScrollArea className="h-[500px] flex-1">
              <CardContent className="p-6 space-y-8">
                {sections.map((section, index) => (
                  <motion.section
                    key={section.id}
                    id={`section-${section.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="scroll-mt-16"
                    onViewportEnter={() => setActiveSection(section.id)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                        {section.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {section.id}. {section.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 pl-11">
                      {section.content}
                    </p>
                  </motion.section>
                ))}
              </CardContent>
            </ScrollArea>
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Agreement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="appearance-none w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors duration-200 group-hover:border-blue-400"
              />
              <AnimatePresence>
                {agreed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                  >
                    <FaCheck className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              I agree to the Privacy Policy
            </span>
          </label>

          <button
            disabled={!agreed}
            onClick={handleContinue}
            className={`relative overflow-hidden px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              agreed
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {agreed ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Continue to RentHub
              </motion.span>
            ) : (
              "Please accept to continue"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}