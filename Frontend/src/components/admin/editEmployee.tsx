import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

interface Employee {
  id?: number;
  Name: string;
  Email: string;
  Role: string;
}

export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Log the id to ensure it is defined
  useEffect(() => {
    console.log("Employee ID:", id);
  }, [id]);

  const [user, setUser] = useState<Employee>({
    Name: '',
    Email: '',
    Role: ''
  });

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        try {
          const response = await axios.get<Employee>(`http://localhost:3002/user/get-user/${id}`);
          setUser(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      getUser();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      try {
        await axios.put(`http://localhost:3002/user/edit-user/${id}`, user);
        navigate('/my-team');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/user/delete-user/${id}`);
      // setEmployees(prevEmployees => prevEmployees.filter(employee => employee.Id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  



  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Employee Detail</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
            Name
          </label>
          <input
            type="text"
            name="Name"
            value={user.Name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
            Email
          </label>
          <input
            type="email"
            name="Email"
            value={user.Email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Role">
            Role
          </label>
          <select
            id="Role"
            name="Role"
            value={user.Role}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                        <RiDeleteBin5Line />
                      </button>
          <button
            type="button"
            onClick={() => navigate('/my-team')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
