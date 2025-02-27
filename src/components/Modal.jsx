import React, { useState } from "react";
import LrCopy from '../copies/lrcopy'
import BillBook from '../copies/Billbook'
import Letterpad from "../copies/Letterpad";
import BookingRegister from "../copies/BookingRegister";
const Modal = ({handle, copy, id, fetchCopyDetails, handleClose, setMessage}) => {

    return (
     
        <div className="">
          {
            copy === 'lr' && (
              <LrCopy id={id}/>
            )
          }
          {
            copy === 'billcopy' && (
              <BillBook id={id}/>
            )
          }
          {
            copy === 'letterPad' && (
              <Letterpad id={id} fetchCopyDetails={fetchCopyDetails} handleClose={handleClose} setMessage={setMessage}/>
            )
          }
          {
            copy === 'bookingRegister' && (
              <BookingRegister id={id} fetchCopyDetails={fetchCopyDetails} handleClose={handleClose} setMessage={setMessage}/>
            )
          }
        </div>
        
  );
};

export default Modal;
