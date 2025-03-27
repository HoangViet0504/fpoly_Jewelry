import React from "react";

const AboutContent = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="/images/home/banner/banner1.jpg" // Add your hero image
          alt="Luxury Jewelry"
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Story Section */}
          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-span-12 lg:col-span-6 space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                From humble beginnings in 2023, our passion for excellence has
                driven us to become a leading name in luxury jewelry. Our
                journey began with a simple vision: to create extraordinary
                pieces that tell unique stories and capture life's most precious
                moments.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every piece in our collection represents the perfect harmony
                between traditional craftsmanship and contemporary design,
                carefully curated to meet the highest standards of quality and
                beauty.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="h-[500px] rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/product/sp1-4.webp"
                  alt="Jewelry Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Mission Section */}
          <section className="bg-gray-50 rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Our Mission
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto text-lg leading-relaxed">
              To create extraordinary jewelry that celebrates individuality and
              craftsmanship. We believe in sustainable luxury, ethical sourcing,
              and creating pieces that will be cherished for generations to
              come. Our commitment extends beyond beautiful jewelry – we strive
              to provide an exceptional experience that makes every customer
              feel special and valued.
            </p>
          </section>
          {/* Values Section */}
          <section className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                image: "/images/home/banner/banner1.jpg",
                description:
                  "We source only the finest materials and work with master craftsmen to ensure each piece meets our exacting standards of excellence.",
              },
              {
                title: "Service",
                image: "/images/home/banner/banner1.jpg",
                description:
                  "Our dedicated team provides personalized consultation and expert guidance to help you find the perfect piece for every occasion.",
              },
              {
                title: "Design",
                image: "/images/home/banner/banner1.jpg",
                description:
                  "Our designs blend classical elegance with contemporary innovation, creating timeless pieces that stand the test of time.",
              },
            ].map((value, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-[300px] mb-4 rounded-lg overflow-hidden">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={value.image}
                    alt={value.title}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </section>
          Team Section
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Meet Our Experts
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  position: "Lead Designer",
                  description:
                    "With 15 years of experience in luxury jewelry design",
                },
                {
                  name: "Michael Chen",
                  position: "Master Craftsman",
                  description: "Specializing in precious stone setting",
                },
                {
                  name: "Emma Williams",
                  position: "Customer Experience Director",
                  description: "Ensuring exceptional service for every client",
                },
                {
                  name: "David Miller",
                  position: "Quality Control Specialist",
                  description: "Maintaining our high standards of excellence",
                },
              ].map((member, index) => (
                <div key={index} className="group">
                  <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                    <img
                      src={`/images/product/sp2-1.webp`}
                      alt={member.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 font-medium">{member.position}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {/* Contact Section */}
          <section className="mt-20 bg-gray-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Visit Our Showroom
            </h2>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Experience our collection in person
              </p>
              <p className="text-gray-800 font-medium">
                123 Luxury Avenue, Fashion District
              </p>
              <p className="text-gray-800 font-medium">
                Monday - Saturday: 10:00 AM - 8:00 PM
              </p>
              <p className="text-gray-800 font-medium">Phone: (555) 123-4567</p>
              <button className="mt-6 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Book an Appointment
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
