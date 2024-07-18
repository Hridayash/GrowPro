export default function Contact() {
    return (
      <div className="bg-gray-100 text-gray-800 min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 py-20 w-full">
          <div className="container mx-auto px-4 py-8 bg-white shadow-xl rounded-lg max-w-4xl">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Contact Us</h1>
  
            <div className="mb-6">
              <p className="text-lg leading-relaxed mb-4 text-gray-700 text-center">
                We would love to hear from you! Whether you have a question, feedback, or need assistance, our team is here to help.
              </p>
            </div>
  
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">Get in Touch</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                You can reach us through the following methods:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                <li><strong>Email:</strong> <a href="mailto:support@growpro.com" className="text-indigo-600 hover:underline">support@growpro.com</a></li>
                <li><strong>Phone:</strong> +1 647 799 4830</li>
                <li><strong>Address:</strong> 740 Bathurst Street, Toronto, ON M5S 2R6</li>
              </ul>
            </div>
  
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">Contact Form</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                Alternatively, you can fill out the form below, and we will get back to you as soon as possible.
              </p>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name"/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email address"/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your message" rows={5}></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }