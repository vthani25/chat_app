import React, {useState} from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null)
  const [name, setName] = useState("Martin Johnson")
  const [bio, setBio] = useState("Hi Everyone, I am using Quickchat!")

  const handleSubmit = async (e)=>{
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        {/*left side with user input*/}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className="text-lg"> Profile </h3>
          {/*choose image from files*/}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setSelectedImage(e.target.files[0])}
            type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden/>
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar} alt=""
            className={`w-12 h-12 ${selectedImage && 'rounded-full'}`}/>
            Upload Profile Image
          </label>

          {/*Input name + bio*/}
          <input onChange={(e)=>setName(e.target.value)} value={name}
          type="text" required placeholder='Your Name' 
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'/>
          
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
          placeholder="Write your profile bio" required
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={5}></textarea>
          
          {/*Button to save*/}
          <button type="submit"
          className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>
          Save </button>
        </form>

        {/*right side with logo*/}
        <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10'
        src={assets.logo_icon} alt=""/>
      </div>
      
    </div>
  )
}

export default ProfilePage
