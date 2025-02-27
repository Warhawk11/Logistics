import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstanceOf";
import Modal from "./Modal";
import { FaDownload } from "react-icons/fa6";
import Loader from "./Loader";

import ShowSuccesMessage from "../utils/ShowSuccesMessage";
import UpdateModal from "./UpdateModal";

const CompanyPage = () => {
  const categories = [
    {
      name: "lr",
      icon: (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
            clip-rule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "billcopy",
      icon: (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M8 12.732A1.99 1.99 0 0 1 7 13H3v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2h-2a4 4 0 0 1-4-4v-2.268ZM7 11V7.054a2 2 0 0 0-1.059.644l-2.46 2.87A2 2 0 0 0 3.2 11H7Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M14 3.054V7h-3.8c.074-.154.168-.3.282-.432l2.46-2.87A2 2 0 0 1 14 3.054ZM16 3v4a2 2 0 0 1-2 2h-4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z"
            clip-rule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "letterPad",
      icon: (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-5-4v4h4V3h-4Z"
          />
        </svg>
      ),
    },
    {
      name: "bookingRegister",
      icon: (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.429M7 8h3M8 8V4h4v2m4 0V5h-4m3 4v3a1 1 0 0 1-1 1h-3m9-3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-6.397a1 1 0 0 1 .27-.683l2.434-2.603a1 1 0 0 1 .73-.317H19a1 1 0 0 1 1 1Z"
          />
        </svg>
      ),
    },
    {
      name: "vehicleDetails",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      ),
    },
  ];

  // essentials
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { id } = useParams();
// modal show
  const [show, setShow] = useState(false);


  const [category, setCategory] = useState(null);
  let [data, setData] = useState(null);


  const handleCategory = async (category) => {
    try {
      setIsLoading(true);
      setData(null);
      await fetchCopyDetails(category);
      setCategory(category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const fetchCopyDetails = async (category) => {
    try {
      const response = await axiosInstance.get(`/api/${category}/${id}`);
      setData(response.data.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching details:", error);
      setIsLoading(false);
    }
  };

  const handleReduce = () => {
    setData(null);
  };

  const handleAdd = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  // DELETE
  const handleDelete = async (cid, delelteId) => {
    try {
      setDeletingId(delelteId);
      setIsDeleting(true);
      const response = await axiosInstance.delete(
        `/api/${category}/delete/${id}/${cid}`
      );

      fetchCopyDetails(category);
      setIsDeleting(false);
      setDeletingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (copyid) => {

  };

  const handleDownload = async (lrid) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8000/api/lr/generatelr/${lrid}`,
        {
          responseType: "blob", // Receive binary data
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lr_${lrid}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  const handleDownloadBillCopy = async (billId) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8000/api/billcopy/generatebillcopy/${billId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `billCopy_${billId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };



  useEffect(() => {
    fetchCopyDetails(category);
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="w-full h-full flex flex-col">
        {/* Categories Section at the Top */}
        <div className=" p-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          {/* CATEGORIES LIST */}

          <ul className="flex space-x-8">
            {categories.map((catname, idx) => (
              <li key={idx} className="w-full">
                <button
                  className=" bg-gray-800 rounded-xl shadow-md py-0.5 cursor-pointer 
                      flex flex-col justify-center items-center 
                      transition-all duration-300 hover:shadow-xl hover:scale-105 w-full"
                  onClick={() => handleCategory(catname.name)}
                >
                  <div className="flex py-1">
                    <p className="text-white mr-2">{catname.icon}</p>
                    <span className="font-thin text-white">
                      {catname.name.toLocaleUpperCase()}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <hr className="mt-5" />

          {isLoading && (
            <Loader
              isLoading={isLoading}
              type="companyDetails"
              category={category}
            />
          )}
          {/* LR Copy */}
          {category === "lr" && data && (
            <div className="place-items-center">
              <div className="w-[80vw]">
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAdd}
                    className="bg-indigo-600 text-white font-bold py-1 px-4 rounded flex items-center space-x-2 mb-4"
                  >
                    <span className="text-lg">+</span> Add
                  </button>
                </div>

                {show && (
                  <Modal show={show} handle={handleClose} copy="lr" id={id} />
                )}

                {/* Table with updated color styling */}
                <div className=" flex justify-center">
                  <table className=" w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="">
                        <th className="py-3 px-6 text-center">ID</th>
                        <th className="py-3 px-6 text-center">Date</th>
                        <th className="py-3 px-6 text-center">Consignee</th>
                        <th className="py-3 px-6 text-center">Consignor</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-100 "
                        >
                          <td className="px-6 py-4 text-gray-800">9000</td>
                          <td className="px-6 py-4 text-gray-800">
                            {item.caution.consignment_note.consignment_date}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {item.delivery_details.consignee.name}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {item.delivery_details.consignor.name}
                          </td>
                          <td className="px-6 py-4  text-gray-800 flex space-x-2">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                         
                              <Link to={`/updatecopy/lr/${item._id}`}>
                                Update
                              </Link>

                            <button
                              onClick={() => handleDownload(item._id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaDownload />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Bill Copy */}
          {category === "billcopy" && data && (
            <div>
              <div className="flex justify-end mt-4 items-center mb-4">
                <button
                  onClick={handleAdd}
                  className="bg-indigo-600 text-white font-bold py-1 px-4 rounded flex items-center space-x-2 mb-4"
                >
                  <span className="text-lg">+</span> Add
                </button>
              </div>

              {show && (
                <Modal
                  show={show}
                  handle={handleClose}
                  copy="billcopy"
                  id={id}
                />
              )}

              <table className=" w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-slate-600 ">
                  <tr className="">
                    <th className="py-2 px-4">Bill Number</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Bill To</th>
                    <th className="py-2 px-4">Bill From</th>
                    <th className="py-2 px-4">Total Amount</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-300">
                      <td className="py-2 px-4">{item.id}</td>
                      <td className="py-2 px-4">{item.date}</td>
                      <td className="py-2 px-4">{item.bill_to}</td>
                      <td className="py-2 px-4">{item.bill_from}</td>
                      <td className="py-2 px-4">{item.amount}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleUpdate(item._id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDownloadBillCopy(item._id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* LETTER PAD */}
          {category === "letterPad" && data && (
            <div>
              {/* Minimize Button on the Left */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAdd}
                  className="bg-indigo-600 text-white font-bold py-1 px-4 rounded flex items-center space-x-2 mb-4"
                >
                  <span className="text-lg">+</span> Add
                </button>
              </div>

              {show && (
                <Modal
                  show={show}
                  handle={handleClose}
                  copy="letterPad"
                  id={id}
                  fetchCopyDetails={fetchCopyDetails}
                  handleClose={handleClose}
                  setMessage={setMessage}
                />
              )}

              {/* Table with beige color theme */}
              {/* Table with beige color theme */}
              <table className=" w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-slate-600 ">
                  <tr className="">
                    <th className="py-2 px-4">Sr. no</th>
                    <th className="py-2 px-4">Description</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-300 animation-blink ${
                        deletingId == index &&
                        isDeleting &&
                        "bg-red-200  animate-pulse duration-1000"
                      }`}
                    >
                      <td className="py-2 px-4">200</td>
                      <td className="py-2 px-4">{item.text}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => handleDelete(item._id, index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleUpdate(item._id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDownloadBillCopy(item._id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {message &&
                setTimeout(() => <ShowSuccesMessage message={message} />, 3000)}
            </div>
          )}

          {/* Booking Register */}
          {category === "bookingRegister" && data && (
            <div>
              {/* Minimize Button on the Left */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAdd}
                  className="bg-indigo-600 text-white font-bold py-1 px-4 rounded flex items-center space-x-2 mb-4"
                >
                  <span className="text-lg">+</span> Add
                </button>
              </div>

              {show && (
                <Modal
                  show={show}
                  handle={handleClose}
                  copy="bookingRegister"
                  id={id}
                  fetchCopyDetails={fetchCopyDetails}
                  handleClose={handleClose}
                  setMessage={setMessage}
                />
              )}

              {/* Table with beige color theme */}
              {/* Table with beige color theme */}
              <table className=" w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-slate-600 ">
                  <tr className="">
                    <th className="py-2 px-4">Cn. no</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.length > 0 &&
                    data.map((item, index) => {
                      return item.registerData.map((eachItem) => {
                        console.log(eachItem);

                        return (
                          <tr
                            key={index}
                            className={`hover:bg-gray-300 animation-blink ${
                              deletingId == index &&
                              isDeleting &&
                              "bg-red-200  animate-pulse duration-1000"
                            }`}
                          >
                            <td className="py-2 px-4">{eachItem.cn_number}</td>
                            <td className="py-2 px-4">{eachItem.date}</td>
                            <td className="py-2 px-4 flex space-x-2">
                              <button
                                onClick={() =>
                                  handleDelete(eachItem._id, index)
                                }
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleUpdate(eachItem._id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Update
                              </button>

                              <button
                                onClick={() =>
                                  handleDownloadBillCopy(eachItem._id)
                                }
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        );
                      });
                    })}
                </tbody>
              </table>
              {message &&
                setTimeout(() => <ShowSuccesMessage message={message} />, 3000)}
            </div>
          )}

          {/* VECHILE DETAILS */}

          {category === "vehicleDetails" && data && (
            <div>
              {/* Minimize Button on the Left */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAdd}
                  className="bg-indigo-600 text-white font-bold py-1 px-4 rounded flex items-center space-x-2 mb-4"
                >
                  <span className="text-lg">+</span> Add
                </button>
              </div>

              {show && (
                <Modal
                  show={show}
                  handle={handleClose}
                  copy="vehicleDetails"
                  id={id}
                  fetchCopyDetails={fetchCopyDetails}
                  handleClose={handleClose}
                  setMessage={setMessage}
                />
              )}

              {/* Table with beige color theme */}
              {/* Table with beige color theme */}
              <table className=" w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-slate-600 ">
                  <tr className="">
                    <th className="py-2 px-4">Cn. no</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                      {data.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-100 "
                        >
                          <td className="px-6 py-4 text-gray-800">9000</td>
                          <td className="px-6 py-4 text-gray-800">
                            {item.caution.consignment_note.consignment_date}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {item.delivery_details.consignee.name}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {item.delivery_details.consignor.name}
                          </td>
                          <td className="px-6 py-4  text-gray-800 flex space-x-2">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleUpdate(item._id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDownload(item._id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaDownload />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
              </table>
              {message &&
                setTimeout(() => <ShowSuccesMessage message={message} />, 3000)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
