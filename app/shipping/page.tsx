"use client";

import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ScrollArea } from "@/app/components/ui/Scrollarea";
import { Separator } from "@/app/components/ui/Separator";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTruck, FaBox, FaShippingFast, FaExchangeAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ShippingPolicy() {
  const [agreed, setAgreed] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const router = useRouter();

  const sections = [
    {
      id: 1,
      title: "Shipping Overview",
      icon: <FaTruck className="text-blue-500" />,
      content: "We offer reliable shipping services to all our customers. All orders are processed within 1-2 business days after order confirmation."
    },
    {
      id: 2,
      title: "Shipping Methods",
      icon: <FaShippingFast className="text-purple-500" />,
      content: "We provide several shipping options including standard shipping (3-5 business days), express shipping (1-2 business days), and overnight shipping (next business day)."
    },
    {
      id: 3,
      title: "Shipping Costs",
      icon: <FaMoneyBillWave className="text-green-500" />,
      content: "Shipping costs vary depending on the shipping method selected and the destination. Free shipping is available for orders over $50."
    },
    {
      id: 4,
      title: "Order Processing Time",
      icon: <FaClock className="text-yellow-500" />,
      content: "All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day."
    },
    {
      id: 5,
      title: "International Shipping",
      icon: <FaMapMarkerAlt className="text-red-500" />,
      content: "We ship internationally to most countries. Additional customs fees, taxes, and duties may apply and are the responsibility of the customer."
    },
    {
      id: 6,
      title: "Order Tracking",
      icon: <FaBox className="text-indigo-500" />,
      content: "Once your order has shipped, you will receive a confirmation email with tracking information. You can track your order directly on our website."
    },
    {
      id: 7,
      title: "Returns & Exchanges",
      icon: <FaExchangeAlt className="text-pink-500" />,
      content: "If you need to return or exchange an item, please contact our customer service within 30 days of receiving your order. Return shipping costs may apply."
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
          Shipping Policy
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
              I acknowledge the Shipping Policy
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
              "Please acknowledge to continue"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}