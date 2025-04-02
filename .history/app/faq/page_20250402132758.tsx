"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaSearch, FaQuestionCircle, FaShippingFast, FaLock, FaExchangeAlt, FaUserCog } from "react-icons/fa";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    {
      id: "general",
      name: "General Questions",
      icon: <FaQuestionCircle className="text-blue-500" />
    },
    {
      id: "shipping",
      name: "Shipping & Delivery",
      icon: <FaShippingFast className="text-purple-500" />
    },
    {
      id: "account",
      name: "Account & Security",
      icon: <FaLock className="text-green-500" />
    },
    {
      id: "returns",
      name: "Returns & Exchanges",
      icon: <FaExchangeAlt className="text-yellow-500" />
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: <FaUserCog className="text-red-500" />
    }
  ];

  const faqs = [
    {
      id: "gen1",
      category: "general",
      question: "What is RentHub and how does it work?",
      answer: "RentHub is a platform that connects renters with property owners. You can browse listings, schedule viewings, and complete rental agreements all through our platform."
    },
    {
      id: "gen2",
      category: "general",
      question: "Is there a fee to use RentHub?",
      answer: "For renters, our platform is completely free to use. Property owners pay a small service fee only when they successfully rent their property through our platform."
    },
    {
      id: "ship1",
      category: "shipping",
      question: "What shipping options do you offer?",
      answer: "We offer standard (3-5 business days), express (1-2 business days), and overnight shipping for physical items. Digital rentals are available immediately after payment."
    },
    {
      id: "ship2",
      category: "shipping",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can enter this number on our tracking page or the carrier's website for real-time updates."
    },
    {
      id: "acc1",
      category: "account",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a link to create a new password. The link expires in 24 hours for security."
    },
    {
      id: "acc2",
      category: "account",
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and never store your full payment details. All transactions are processed through PCI-compliant payment gateways."
    },
    {
      id: "ret1",
      category: "returns",
      question: "What is your return policy?",
      answer: "You may return most items within 30 days of delivery for a full refund. Some items like digital rentals or personalized products may be exempt from returns."
    },
    {
      id: "ret2",
      category: "returns",
      question: "How long do refunds take to process?",
      answer: "Once we receive your return, refunds are processed within 3-5 business days. It may take additional time for your bank to post the credit to your account."
    },
    {
      id: "tech1",
      category: "technical",
      question: "The website isn't loading properly. What should I do?",
      answer: "Try clearing your browser cache and cookies, or try accessing the site from a different browser. If the issue persists, contact our support team with details about your device and browser."
    },
    {
      id: "tech2",
      category: "technical",
      question: "How do I contact customer support?",
      answer: "You can reach our support team 24/7 through the live chat on our website, by email at support@renthub.com, or by phone at (800) 555-1234 during business hours."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.category === activeCategory && 
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Find answers to common questions about RentHub
        </p>
        <div className="my-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 h-0.5" />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery("");
              }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* FAQ Accordions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div 
              key={faq.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600 dark:text-gray-300"
                  >
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <FaQuestionCircle className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No questions found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try a different search or browse other categories
            </p>
          </div>
        )}
      </motion.div>

      {/* Still Need Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Can&apos;t find the answer you're looking for? Our support team is ready to help you with any questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Live Chat
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}