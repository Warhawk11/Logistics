import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axiosInstance from "../axiosInstanceOf";
import Loader from "../components/Loader";

const Letterpad = ({ id, fetchCopyDetails, handleClose, setMessage }) => {
  const [letterPadData, setletterPadData] = useState({
    text: "",
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit_addletterPad = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post(
        `/api/letterpad/add/${id}`,
        letterPadData
      );
      console.log("Response:", response.data);
      fetchCopyDetails('letterPad')
      setIsLoading(false)
      if(response.data.success) setMessage(response.data.message)
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {}, [letterPadData]);

  const letterpad = true;
  return (
    <div className={`${isLoading ? "bg-transparent/80" : "bg-white"}`}>
      <div className="relative">
        {
          isLoading && <Loader isLoading={isLoading}  category={'lettpad'}/>
        }
        <Header letterpad={letterpad} />
        <textarea
          className={`w-full p-[30px] ${isLoading && 'bg-black/80'}`}
          name="text"
          onChange={(e) => setletterPadData({ text: e.target.value })}
          id=""
          rows={6}
          cols={6}
          placeholder="Enter Info.."
        ></textarea>
      </div>
      <button
        className="bg-blue-800 text-white w-full mt-4"
        onClick={() => handleSubmit_addletterPad()}
      >
        Submit
      </button>
    </div>
  );
};

export default Letterpad;
