interface ContactDetail {
  name: string;
  email: string;
  telephone: string;
}

interface Location {
  city: string;
  address: string[];
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const contactDetails: ContactDetail[] = [
  { name: "Support", email: "support@example.com", telephone: "+123456789" },
  { name: "Sales", email: "sales@example.com", telephone: "+987654321" },
];

const locations: Location[] = [
  { city: "New York", address: ["123 Main St", "New York, NY 10001"] },
  {
    city: "San Francisco",
    address: ["456 Market St", "San Francisco, CA 94103"],
  },
];

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I sign up?",
    answer: "You can sign up by clicking the Sign Up button.",
  },
  {
    id: 2,
    question: "Is this service free?",
    answer: "Yes, our basic plan is free to use.",
  },
];

export default function AboutContent() {
  return (
    <main>
      {/* Side-by-side grid */}
      <div className="bg-white">
        <div className="max-w-md mx-auto py-24 px-4 sm:max-w-3xl sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="divide-y divide-warm-gray-200">
            <section
              className="lg:grid lg:grid-cols-3 lg:gap-8"
              aria-labelledby="contact-heading"
            >
              <h2
                id="contact-heading"
                className="text-2xl font-extrabold text-warm-gray-900 sm:text-3xl"
              >
                Get in touch
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
                {contactDetails.map((item) => (
                  <div key={item.name}>
                    <h3 className="text-lg font-medium text-warm-gray-900">
                      {item.name}
                    </h3>
                    <dl className="mt-2 text-base text-warm-gray-500">
                      <div>
                        <dt className="sr-only">Email</dt>
                        <dd>{item.email}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="sr-only">Phone number</dt>
                        <dd>{item.telephone}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8"
              aria-labelledby="location-heading"
            >
              <h2
                id="location-heading"
                className="text-2xl font-extrabold text-warm-gray-900 sm:text-3xl"
              >
                Locations
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
                {locations.map((location) => (
                  <div key={location.city}>
                    <h3 className="text-lg font-medium text-warm-gray-900">
                      {location.city}
                    </h3>
                    <div className="mt-2 text-base text-warm-gray-500 space-y-1">
                      {location.address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-warm-gray-50">
        <div className="max-w-md mx-auto py-24 px-4 sm:max-w-3xl sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-warm-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-warm-gray-500">
                Can’t find the answer you’re looking for? Reach out to our{" "}
                <a
                  href="#"
                  className="font-medium text-cyan-700 hover:text-cyan-600"
                >
                  customer support
                </a>{" "}
                team.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                {faqs.map((faq) => (
                  <div key={faq.id}>
                    <dt className="text-lg font-medium text-warm-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base text-warm-gray-500">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative">
        <div
          className="absolute left-0 right-0 h-1/2 bg-warm-gray-50"
          aria-hidden="true"
        />
        <div className="relative max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="py-10 px-6 bg-gradient-to-l from-sky-800 to-cyan-700 rounded-3xl sm:py-16 sm:px-12 lg:py-20 lg:px-20 lg:flex lg:items-center">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Sign up for our newsletter
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-cyan-100">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                Lorem cupidatat commodo. Elit sunt amet fugiat.
              </p>
            </div>
            <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full border-white px-5 py-3 placeholder-warm-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-700 focus:ring-white rounded-md"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-700 focus:ring-green-400 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Notify me
                </button>
              </form>
              <p className="mt-3 text-sm text-cyan-100">
                We care about the protection of your data. Read our{" "}
                <a href="#" className="text-white font-medium underline">
                  Privacy Policy.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
