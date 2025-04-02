export default function About() {
  return(
      <div className="bg-white">
          {/* Hero Banner */}
          <section className="relative py-32 px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center">
              <div className="absolute inset-0 bg-black/50 z-0">
                  <img 
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Tech gadgets" 
                      className="w-full h-full object-cover"
                  />
              </div>
              <div className="relative z-10 max-w-6xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">About RentHub</h1>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                      Empowering your tech journey through affordable, flexible rentals of premium gadgets
                  </p>
              </div>
          </section>

          {/* Our Story */}
          <section className="py-20 px-6 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h2>
                      <p className="text-lg text-gray-700 mb-6">
                          Founded in 2023, RentHub began with a simple idea: technology should be accessible to everyone, 
                          regardless of budget. Our founders, tech enthusiasts themselves, recognized the financial 
                          burden of constantly upgrading devices in our fast-paced digital world.
                      </p>
                      <p className="text-lg text-gray-700">
                          What started as a small platform with a handful of devices has grown into a trusted 
                          marketplace serving thousands of customers nationwide. We're proud to have helped 
                          over 50,000 customers access the tech they need without the heavy upfront costs.
                      </p>
                  </div>
                  <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                      <img 
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                          alt="Our team" 
                          className="w-full h-full object-cover"
                      />
                  </div>
              </div>
          </section>

          {/* Mission & Values */}
          <section className="py-20 bg-gray-50">
              <div className="max-w-6xl mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center text-blue-600 mb-16">Our Mission & Values</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                          <div className="text-blue-600 text-4xl mb-4">💡</div>
                          <h3 className="text-xl font-bold mb-3">Innovation</h3>
                          <p className="text-gray-600">
                              We constantly update our inventory with the latest tech to keep you at the cutting edge.
                          </p>
                      </div>
                      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                          <div className="text-blue-600 text-4xl mb-4">🤝</div>
                          <h3 className="text-xl font-bold mb-3">Trust</h3>
                          <p className="text-gray-600">
                              Our verification process and insurance coverage ensure peace of mind for all users.
                          </p>
                      </div>
                      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                          <div className="text-blue-600 text-4xl mb-4">🌱</div>
                          <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                          <p className="text-gray-600">
                              By sharing devices, we reduce e-waste and promote a circular economy.
                          </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Team Section */}
          <section className="py-20 px-6 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-16">Meet The Team</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                      { name: "Aayush Gautam", role: "Founder", img: "https://randomuser.me/api/portraits/men/32.jpg" },
                      { name: "Ronil Hiteshbhai Ghoghari", role: "CTO", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                      { name: "Glen Dilip Correia", role: "Head of Operations", img: "https://randomuser.me/api/portraits/men/75.jpg" },
                      { name: "Omoruyi Idehen", role: "Customer Experience", img: "https://randomuser.me/api/portraits/women/63.jpg" }
                  ].map((member, index) => (
                      <div key={index} className="text-center">
                          <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
                              <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-blue-600">{member.role}</p>
                      </div>
                  ))}
              </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-blue-600 text-white">
              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
                  <div>
                      <div className="text-4xl font-bold mb-2">50,000+</div>
                      <div className="text-blue-100">Happy Customers</div>
                  </div>
                  <div>
                      <div className="text-4xl font-bold mb-2">1,200+</div>
                      <div className="text-blue-100">Devices Available</div>
                  </div>
                  <div>
                      <div className="text-4xl font-bold mb-2">98%</div>
                      <div className="text-blue-100">Satisfaction Rate</div>
                  </div>
                  <div>
                      <div className="text-4xl font-bold mb-2">24/7</div>
                      <div className="text-blue-100">Customer Support</div>
                  </div>
              </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-gray-50">
              <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to join the RentHub community?</h2>
                  <p className="text-xl text-gray-600 mb-8">
                      Whether you need tech or have tech to share, we've got the perfect solution for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                          href="/signup" 
                          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                          Sign Up Now
                      </a>
                      <a 
                          href="/contact" 
                          className="px-8 py-4 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                          Contact Us
                      </a>
                  </div>
              </div>
          </section>
      </div>
  );
}