export default function About() {
    return (
      <div className="bg-gray-100 text-gray-800 min-h-screen">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 py-20">
          <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">About Us</h1>
  
            <div className="mb-6">
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                Welcome to <span className="font-bold text-indigo-600">GrowPro</span>! We are a leading talent management platform dedicated to helping individuals and organizations manage, develop, and nurture talent effectively.
              </p>
            </div>
  
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                Our mission is to empower talent and enable organizations to achieve their fullest potential by providing an intuitive and effective talent management solution.
              </p>
            </div>
  
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Features</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                GrowPro offers a comprehensive suite of tools designed to help you track performance, set goals, and ensure continuous growth and development. Here are some of the key features:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                <li><span className="font-semibold">Performance Tracking:</span> Monitor and evaluate performance with detailed analytics and feedback mechanisms.</li>
                <li><span className="font-semibold">Goal Setting:</span> Set and track personal and professional goals to drive continuous improvement.</li>
                <li><span className="font-semibold">Development Plans:</span> Create personalized development plans to guide career growth and skill enhancement.</li>
                <li><span className="font-semibold">Collaboration Tools:</span> Enhance team collaboration with integrated communication and project management features.</li>
              </ul>
            </div>
  
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Team</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                Our team is composed of experienced professionals dedicated to providing the best talent management solutions. We are passionate about helping you achieve your goals and are here to support you every step of the way.
              </p>
            </div>
  
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">Contact Us</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                If you have any questions or would like to learn more about GrowPro, please contact us at <a href="mailto:support@growpro.com" className="text-indigo-600 hover:underline">support@growpro.com</a>. We look forward to hearing from you!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  