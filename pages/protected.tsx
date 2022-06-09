import axios from 'axios'
import React, { useEffect } from 'react'

const Protected = () => {
  useEffect(() => {
    axios.get('http://localhost:5000/protected')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [])
  return (
    <div>protected</div>
  )
}

export default Protected