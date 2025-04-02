"use client";

import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ScrollArea } from "@/app/components/ui/Scrollarea";
import { Separator } from "@/app/components/ui/Separator";
import { useState } from "react";
import { FaGithub, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Terms() {
  const [agreed, setAgreed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Terms & Conditions
        </h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <div className="bg-gradient-to-r from-transparent via-gray-300 to-transparent h-[2px]">
        <Separator />
      </div>

      {/* Enhanced Card with Glass Morphism Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border border-gray-200/50 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 dark:border-gray-700/50">
          <ScrollArea className="h-[400px]">
            <CardContent className="p-6 space-y-6 text-gray-700 dark:text-gray-300">
              {/* Animated Sections */}
              <motion.section
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  1. Introduction
                </h2>
                <p className="mt-2 pl-4">
                  Welcome to RentHub! By using our website and services, you agree to
                  comply with the terms and conditions outlined below.
                </p>
              </motion.section>

              <motion.section
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  2. Rental Agreement
                </h2>
                <p className="mt-2 pl-4">
                  Users can rent gadgets and accessories for a specific period (weekly,
                  monthly, or quarterly). The rental fee is charged accordingly.
                </p>
              </motion.section>

              <motion.section
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  3. Payment & Refund Policy
                </h2>
                <p className="mt-2 pl-4">
                  All payments must be made in advance. No refunds are issued once the
                  rental period starts, except in cases of product malfunction.
                </p>
              </motion.section>

              <motion.section
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  4. User Responsibilities
                </h2>
                <p className="mt-2 pl-4">
                  Users must return the rented gadgets in the same condition as received.
                  Any damages may result in additional charges.
                </p>
              </motion.section>

              <motion.section
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  5. Termination of Service
                </h2>
                <p className="mt-2 pl-4">
                  We reserve the right to terminate any rental agreement if terms are
                  violated.
                </p>
              </motion.section>
            </CardContent>
          </ScrollArea>
        </Card>
      </motion.div>

      {/* Enhanced Agreement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
      >
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors duration-200 group-hover:border-blue-400"
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
            I agree to the Terms & Conditions
          </span>
        </label>

        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <FaGithub className={`transition-transform ${isHovering ? 'scale-110' : 'scale-100'}`} />
            <span>GitHub</span>
          </motion.a>

          <Button
            disabled={!agreed}
            className={`relative overflow-hidden px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              agreed
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {agreed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                Continue
              </motion.span>
            )}
            {!agreed && "Accept Terms to Continue"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}