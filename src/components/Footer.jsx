import React from 'react'

const Footer = () => {
    return (
        <div className='flex w-full justify-center items-center gap-2'>
            <div className="logo font-bold text-lg">
                <span className='text-purple-600'>&lt;</span>
                Pass
                <span className='text-purple-600'>OP/&gt;</span>
            </div>
            <div className='flex'>
                <span>Created with</span>
                <img className='w-6 mx-1' src="/icons/heart.png" alt="" /> 
                <span> by Sagar_d02</span>
            </div>
        </div>
    )
}

export default Footer
