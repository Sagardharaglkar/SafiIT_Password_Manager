import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const copyText = (text) => {
        toast.success('Copyed to Clipbord!')

        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        if (ref.current.src.includes("icons/view.png")) {
            ref.current.src = "icons/hide.png"
            passRef.current.type = "text";

        } else {
            ref.current.src = "icons/view.png"
            passRef.current.type = "password";
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            toast.success('Password Saved!')

            setform({ site: "", username: "", password: "" })
        } else {
            toast.error('Password not saved')

        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id));

    }

    const deletePassword = (id) => {
        const confirmdelete = confirm("Delete Password ?");

        if (confirmdelete) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));


        }
        if (confirmdelete) {
            toast.success('Pasword Deleted!')

        }
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>



            {/* <div className='mx-auto'> */}

            <div className='py-8 md:w-[60vw] w-full mx-auto'>

                <div className="logo font-bold text-2xl mx-auto w-32">
                    <span className='text-purple-600'>&lt;</span>
                    Safe
                    <span className='text-purple-600'>IT/&gt;</span>
                </div>
                <span className='w-[204px] mx-auto block'>Your own Password Manager</span>

                <div className='text-white flex flex-col p-4 gap-7'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" className='shadow-lg border border-purple-400 rounded-full p-1 px-3 text-black' name='site' />
                    <div className="flex flex-col md:flex-row justify-between gap-5">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" className='shadow-lg border border-purple-400 rounded-full md:w-3/4 p-1 px-3 text-black' name='username' />
                        <div className="relative md:w-1/4">
                            <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" className=' shadow-lg border border-purple-400 rounded-full w-full pl-2 pr-7 py-1 text-black' name='password' />
                            <span className='absolute right-2 top-[9px] cursor-pointer' onClick={showPassword} >
                                <img ref={ref} src="icons/view.png" alt="eye" className='w-4' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='hover:font-bold text-black flex gap-2 items-center mx-auto bg-purple-300 px-8 py-1 rounded-full hover:bg-purple-400  shadow-lg'>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"
                            stroke="bold">
                        </lord-icon>
                        Save

                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-xl pb-5 mx-5'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='font-bold mx-5'> No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="mx-auto table-fixed w-[90vw] md:w-full bg-purple-100 overflow-hidden rounded-md shadow-lg">
                            <thead className='bg-purple-300'>
                                <tr className='border-b border-purple-400'>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords </th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index} className='border-b border-purple-200 hover:border-purple-300 hover:shadow-md'>
                                        <td className='py-2 text-center'>
                                            <div className='flex items-center justify-center '>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon></div>
                                            </div></td>
                                        <td className='py-2 text-center flex items-center justify-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{"*".repeat(8)}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>


            {/* </div> */}
        </>
    )
}

export default Manager
