"use client";

import { motion } from "framer-motion";
import { FaLightbulb, FaHandshake, FaLeaf, FaUserFriends, FaChartLine, FaMobileAlt, FaHeadset } from "react-icons/fa";
import Image from 'next/image';

export default function About() {
  const teamMembers = [
    { 
      name: "Aayush Gautam", 
      role: "Founder", 
      img: "https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      animationDelay: 0.1
    },
    { 
      name: "Ronil Hiteshbhai Ghoghari", 
      role: "CTO", 
      img: "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      animationDelay: 0.2
    },
    { 
      name: "Glen Dilip Correia", 
      role: "Head of Operations", 
      img: "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      animationDelay: 0.3
    },
    { 
      name: "Omoruyi Idehen", 
      role: "Customer Experience", 
      img: "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      animationDelay: 0.4
    }
  ];

  const stats = [
    { value: "50,000+", label: "Happy Customers", icon: <FaUserFriends className="text-3xl" /> },
    { value: "1,200+", label: "Devices Available", icon: <FaMobileAlt className="text-3xl" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaChartLine className="text-3xl" /> },
    { value: "24/7", label: "Customer Support", icon: <FaHeadset className="text-3xl" /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="relative py-32 px-6 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-purple-700/90 dark:from-blue-900/90 dark:to-purple-900/90 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Tech gadgets" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            About RentHub
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Empowering your tech journey through affordable, flexible rentals of premium gadgets
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Story</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Founded in 2023, RentHub began with a simple idea: technology should be accessible to everyone, 
              regardless of budget. Our founders, tech enthusiasts themselves, recognized the financial 
              burden of constantly upgrading devices in our fast-paced digital world.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              What started as a small platform with a handful of devices has grown into a trusted 
              marketplace serving thousands of customers nationwide. We&apos;re proud to have helped 
              over 50,000 customers access the tech they need without the heavy upfront costs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-shadow duration-300">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Our team" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500 rounded-2xl shadow-lg z-10 hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-16"
          >
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Mission & Values</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaLightbulb className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />,
                title: "Innovation", 
                content: "We constantly update our inventory with the latest tech to keep you at the cutting edge."
              },
              { 
                icon: <FaHandshake className="text-purple-600 dark:text-purple-400 text-4xl mb-4" />,
                title: "Trust", 
                content: "Our verification process and insurance coverage ensure peace of mind for all users."
              },
              { 
                icon: <FaLeaf className="text-green-600 dark:text-green-400 text-4xl mb-4" />,
                title: "Sustainability", 
                content: "By sharing devices, we reduce e-waste and promote a circular economy."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {item.icon}
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-16"
        >
          Meet <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">The Team</span>
        </motion.h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: member.animationDelay }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-100 dark:border-gray-700 relative group-hover:border-blue-300 transition-all duration-300">
                <Image
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Ready to join the RentHub community?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Whether you need tech or have tech to share, we've got the perfect solution for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign Up Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact" 
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}