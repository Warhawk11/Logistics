import React from 'react'
import LrCopy from '../copies/lrcopy'
import LrUpdateCopy from './updatecopies/LrUpdateCopy'
import { useParams } from 'react-router-dom'

const UpdateModal = () => {
  const {copyName, copyId} = useParams();
  return (
    <div>
        {
            copyName === 'lr' && (
                <LrUpdateCopy copyid={copyId}/>
            )
        }
    </div>
  )
}

export default UpdateModal