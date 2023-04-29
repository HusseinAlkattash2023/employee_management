import { useReducer } from "react";
import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQuery , useMutation , useQueryClient} from "react-query";
import {updateUser , getUsers} from "../lid/helpers";

export default function updateUserForm({ formId, formData, setFormData }) {
  
  const getUser = async(userId)=>{
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    const data = await response.json();
    if(data) return data;
    return{};
  }

const { isLoading, isError, data, error } = useQuery(["users", formId], ()=> getUser(formId));

  const queryClient = useQueryClient();
  const UpdateMutation = useMutation((newData)=> updateUser(formId,newData),{
    onSuccess:async(data)=>{
      queryClient.prefetchQuery('users',getUsers)
    }
  });

  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Error</div>

  if(UpdateMutation.isSuccess) return <Success message={"Updated Successfully"}></Success>

  const {name, avatar, salary, date, email, status} = data

  const [firstname , lastname] = name.split(' ')

  const handleSubmit = async(e) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`
    let updated = Object.assign({},data,formData,{name:userName});
    await UpdateMutation.mutate(updated);
  }; 


  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          defaultValue={firstname}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          defaultValue={lastname}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          defaultValue={email}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="salary"
          defaultValue={salary}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="date"
          defaultValue={date}
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
            defaultChecked={status == "Active"}
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
            defaultChecked={status !== "Inactive"}
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-center bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center text-md w-2/6 bg-yellow-400 border-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-400 hover:text-yellow-400">
        Update{" "}
        <span className="px-1">
          <BiBrush size={25} />
        </span>
      </button>
    </form>
  );
}
