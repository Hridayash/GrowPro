

import { FaUserFriends } from 'react-icons/fa';
import { IoBriefcaseSharp } from 'react-icons/io5';
import { RiBook2Fill } from 'react-icons/ri';
import { AiOutlineTrophy } from 'react-icons/ai';

import { GiGraduateCap } from "react-icons/gi";
import { Link } from 'react-router-dom';

const NewSidebar = ({ role , userId }) => {
  const HRLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Team', path: '/my-team' },
    { name: 'Job Postings', path: '/job-postings' },
    { name: 'Training Material', path: '/training-material' },
  ];


  const managerLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Team', path: '/my-team' },
    { name: 'Job Postings', path: '/job-postings' },
    { name: 'Performance Reviews', path: '/review' },
    { name: 'Training Material', path: '/training-material' },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Job Postings', path: '/job-postings' },
    // { name: 'Performance Reviews', path: '/reviews' },
    { name: 'Training Material', path: '/training-material' },
    // Note: The Track Application path is a placeholder and should be dynamically replaced
    { name: 'Track Application', path: `/applicant/${userId}` },
  ];

  let links;

  switch (role) {
    case 'hr':
      links = HRLinks;
      break;
    case 'manager':
      links = managerLinks;
      break;
    case 'employee':
      links = employeeLinks;
      break;
    default:
      links = [];
  }

  return (
    <div className="bg-slate-100 w-60 h-screen flex flex-col gap-8 px-6 pt-6 mt-12 fixed left-0">
      <ul>
        {links.map((link, index) => (
          <li key={index} className="p-4 hover:bg-gray-700 rounded-lg hover:text-white">
            <Link to={link.path} className="flex items-center gap-3 text-black-300">
              {link.name === 'Dashboard' && <IoBriefcaseSharp className="text-2xl" />}
              {link.name === 'Manage Users' && <FaUserFriends className="text-2xl" />}
              {link.name === 'Job Postings' && <RiBook2Fill className="text-2xl" />}
              {link.name === 'Reports' && <AiOutlineTrophy className="text-2xl" />}
              {link.name === 'My Team' && <FaUserFriends className="text-2xl" />}
              {link.name === 'Performance Reviews' && <AiOutlineTrophy className="text-2xl" />}
              {link.name === 'Training Material' && <GiGraduateCap className="text-2xl" />}
              {link.name === 'Track Application' && <FaUserFriends className="text-2xl" />}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
  );
 
  
};

export default NewSidebar;
