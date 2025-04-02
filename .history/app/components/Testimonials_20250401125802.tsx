import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Aayush G.',
    rating: 4,
    text: '“GadgetRent made it super easy to rent a high-end camera for my trip!”',
  },
  {
    name: 'Ronil',
    rating: 3,
    text: '“The process was smooth, and the gadget was in perfect condition.”',
  },
  {
    name: 'Oms',
    rating: 5,
    text: '“GadgetRent exceeded my expectations! Great service and products.”',
  },
  {
    name: 'Glen',
    rating: 5,
    text: '“GadgetRent made it super easy to rent a high-end camera for my trip!”',
  },
];

const HomePage = () => {
  return (
    <div className="bg-blue-50 flex flex-col">
      {/* Testimonials Section */}
      <section className="bg-blue-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">What Our Customers Say</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4 text-sm">{testimonial.text}</p>
              <span className="block text-right font-semibold text-blue-600">{testimonial.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
