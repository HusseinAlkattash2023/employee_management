/** Controllers */

import Users from "../model/user";

// Get: http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetch Data" });
  }
}

// Get: http://localhost:3000/api/users/1
export async function getUser(req, res) {
  try {
    const {userId} = req.query;
    if(userId){
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({error:"User not Selected"});
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user..." });
  }
}

// Post: http://localhost:3000/api/users
export async function postUser(req, res){
  const newUser = new Users(req.body);
  try {
      // const formData = req.body;
      // if(!formData) return res.status(404).json( { error: "Form Data Not Provided...!"});
      // Users.create( formData, function(err, data){
      //     return res.status(200).json(data)
      // })
      const saveUser = await newUser.save()
      res.status(200).json(saveUser)
  } catch (error) {
      return res.status(404).json({ error })
  }
}

// Put: http://localhost:3000/api/users/1
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User Not Selected" });
  } catch (error) {
    res.status(404).json({ error: "Error While Update the Data...!" });
  }
}

// delete: http://localhost:3000/api/users/1
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json({ deleted: userId });
    }
  } catch (error) {
    res.status(404).json({Error:"Error While Deleting the User"})
  }
}
