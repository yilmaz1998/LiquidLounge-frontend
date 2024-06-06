import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4 text-center fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} Sinan Yilmaz. All rights reserved.</p>
    </div>
  )
}

export default Footer