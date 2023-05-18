import React, { useState } from 'react'

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const onChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setData({
      name: "",
      email: "",
      message: ""
    })
    const response = await fetch("/", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json"
      }
    })

    console.log(response) ;
  }
  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
        <form onSubmit={onSubmit} className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>Contact</p>
                <p className='text-gray-300 py-4'>// Submit the form below or shoot me an email - vutukuri.kumar192st.niituniversity.in</p>
            </div>
            <input className='bg-[#ccd6f6] p-2' type="text" placeholder='Name' name='name' value={data.name} onChange={onChange} />
            <input className='my-4 p-2 bg-[#ccd6f6]' type="email" placeholder='Email' name='email'  value={data.email} onChange={onChange} />
            <textarea className='bg-[#ccd6f6] p-2' name="message"  value={data.message} onChange={onChange} rows="10" placeholder='Message'></textarea>
            <button className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'>Let's Collaborate</button>
        </form>
    </div>
  )
}

export default Contact