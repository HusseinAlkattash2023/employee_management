import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import {useQueryClient , useMutation} from "react-query";
import {addUser , getUsers} from "../lid/helpers";

export default function addUserForm({formData , setFormData}) {

  const queryClient = useQueryClient();

  const addMutation = useMutation(addUser , {
    onSuccess: () =>{
      queryClient.prefetchQuery('users',getUsers)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(formData).length === 0) return console.log("Don't have form data")
    let {firstname, latstname, email, salary,date, status} = formData;

    const model={
      name:`${firstname} ${latstname}`,
      avatar:`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg`,
      email,
      salary,
      date,
      status: status ?? "Active"
    }
    addMutation.mutate(model)
  };

  // if(Object.keys(formData).length > 0) return <Bug message={"Data Added"}></Bug>

  if(addMutation.isLoading) return <div>Loading!</div>
  if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
  if(addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="latstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="date"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="Active"
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-center bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="Inactive"
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-center bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add <span className="px-1"><BiPlus size={25}/></span>
      </button>
    </form>
  );
}
