import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { IoBriefcaseSharp } from 'react-icons/io5';
import { RiBook2Fill } from 'react-icons/ri';
import { AiOutlineTrophy } from 'react-icons/ai';

const NewSidebar = ({ role }) => {
  const adminLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Manage Users', path: '/manage-user' },
    { name: 'Job Postings', path: '/job-postings' },
    { name: 'Reports', path: '/reports' },
  ];

  const managerLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Team', path: '/my-team' },
    { name: 'Job Postings', path: '/job-postings' },
    { name: 'Performance Reviews', path: '/performance-reviews' },
    { name: 'Training Material', path: '/training-material' },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Profile', path: '/my-profile' },
    { name: 'My Tasks', path: '/my-tasks' },
    { name: 'Performance Reviews', path: '/performance-reviews' },
  ];

  let links;

  switch (role) {
    case 'admin':
      links = adminLinks;
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
    <div className=" bg-slate-100 w-60 h-screen flex  flex-col gap-8 px-6 pt-6 mt-12 fixed left-0">
      
      <ul>
        {links.map((link, index) => (
          <li key={index} className="p-4 hover:bg-gray-700 rounded-lg hover:text-white">
            <a href={link.path} className="flex items-center gap-3 text-black-300">
              {link.name === 'Dashboard' && <IoBriefcaseSharp className="text-2xl" />}
              {link.name === 'Manage Users' && <FaUserFriends className="text-2xl" />}
              {link.name === 'Job Postings' && <RiBook2Fill className="text-2xl" />}
              {link.name === 'Reports' && <AiOutlineTrophy className="text-2xl" />}
              {link.name === 'My Team' && <FaUserFriends className="text-2xl" />}
              {link.name === 'Performance Reviews' && <AiOutlineTrophy className="text-2xl" />}
              {link.name === 'Training Material' && <RiBook2Fill className="text-2xl" />}
              <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewSidebar;
