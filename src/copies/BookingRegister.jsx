import React, { useState } from 'react';
import axiosInstance from '../axiosInstanceOf';

const BookingRegister = ({ id, fetchCopyDetails, handleClose, setMessage }) => {

  // essentials 
  const [isLoading, setIsLoading] = useState(false)

  // Booking register data
  const [data , setData ] = useState({
    bookingRegister_number: '', 
   initialRegisterData: 
    {
        cn_number: '',
        date: '',
        number_of_packages: '',
        consignor: '',
        consignee: '',
        destination: '', 
        weight: '',
        bill_amount: '', 
        to_pay_tbb: '', 
        bill_number: '', 
        mr_number: '', 
        broker_name: '',
        challan_number: '', 
        lorry_number: '', 
        hire: '', 
        advance: '',
        balance: '', 
        remark: '',

    },
   registerData: []
  })

  // Handle Input change and save their values
  const handleMoreNestedChange = (path, value, type) => {
    setData((prevData) => {
      const keys = path.split(".");

      const updateNestedObject = (obj, keys, value, type) => {
        const [currentKey, ...remainingKeys] = keys;

        if (!obj || !Object.hasOwnProperty.call(obj, currentKey)) {
          console.warn(`Invalid path: ${path}`);
          return obj;
        }

        if (remainingKeys.length === 0) {
          return {
            ...obj,
            [currentKey]: type === "date" ? new Date(value) : value,
          };
        }
        return {
          ...obj,
          [currentKey]: updateNestedObject(
            obj[currentKey],
            remainingKeys,
            value,
            type
          ),
        };
      };
      return updateNestedObject(prevData, keys, value, type);
    });
  };


  // Add record to local 
  const handleAddRecordToLocal = () => {
    setData((prevData) => ({
      ...prevData,
      initialRegisterData: {
          cn_number: "",
          invoice_number: "",
          date: "",
          from: "",
          to: "",
          weight: "",
          charged: "",
          rate: "",
          freight: "",
          st: "",
          st_charges: "",
          others: "",
          amount: "",
        },
      registerData: [
        ...prevData.registerData, prevData.initialRegisterData
      ]
    }));
  };



  // Submit data to backend
  const handleSubmit_addBookingregister = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post(
        `/api/bookingregister/add/${id}`,
        data
      );
      console.log("Response:", response.data);
      fetchCopyDetails('bookingregister')
      setIsLoading(false)
      if(response.data.success) setMessage(response.data.message)
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };



  console.log(data);
  console.log(data.registerData);
  

  return (
    <div className='bg-white p-3'>
      <div className="border border-black border-bold pt-7 pb-7 bg-gray-300">
        <div>
          <h1 className="text-center font-bold text-4xl">AKASH ROAD CARRIERS</h1>
        </div>
      </div>

      <div className="pt-3 pb-3 pl-3">
        <h1>
          BOOKING REGISTER NO.
          <input
              type="text"
              className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
              name="bookingRegister_number"
              value={data.bookingRegister_number}
              onChange={(e) =>
                handleMoreNestedChange("bookingRegister_number", e.target.value, "")
              }
            />       
           </h1>
      </div>

      {/* Table */}
      <div className="pt-3 overflow-x-auto">
        <table className="min-w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 text-center">CN NO.</th>
              <th className="border border-black px-2 py-1 text-center">Date</th>
              <th className="border border-black px-2 py-1 text-center">No. of Pkgs</th>
              <th className="border border-black px-2 py-1 text-center">Destination</th>
              <th className="border border-black px-2 py-1 text-center" >Consignor</th>
              <th className="border border-black px-2 py-1 text-center" >Consignee</th>
              <th className="border border-black px-2 py-1 text-center" >Weight</th>
              <th className="border border-black px-2 py-1 text-center">Bill Amount</th>
              <th className="border border-black px-2 py-1 text-center">To Pay TBB</th>
              <th className="border border-black px-2 py-1 text-center">Bill No.</th>
              <th className="border border-black px-2 py-1 text-center">M.R No</th>
              <th className="border border-black px-2 py-1 text-center">Broker Name</th>
              <th className="border border-black px-2 py-1 text-center">Challan No.</th>
              <th className="border border-black px-2 py-1 text-center">Lorry No.</th>
              <th className="border border-black px-2 py-1 text-center">Hire</th>
              <th className="border border-black px-2 py-1 text-center">Advance</th>
              <th className="border border-black px-2 py-1 text-center">Balance</th>
              <th className="border border-black px-2 py-1 text-center">Remark</th>
            </tr>
          </thead>
          <tbody>
            {
              data.registerData.map((registerItem) => {

                return (
                  <tr>
                    {/* cn_number */}
                    <td className="border border-black px-2 py-1">
                        <p>{registerItem.cn_number}</p>
                    </td>

                    {/* date */}
                    <td className="border border-black px-2 py-1">
                        {registerItem.date}
                    </td>

                    {/* number_of_packages */}
                    <td className="border border-black px-2 py-1">
                        {registerItem.number_of_packages}
                    </td>

                    {/* destination */}
                    <td className="border border-black px-2 py-1">
                        {registerItem.destination}
                    </td>
                    {/* consignor */}
                    <td className="border border-black px-2 py-1">
                        <p className='w-full'>{registerItem.consignor}</p>
                    </td>
                    {/* consignee */}
                    <td className="border border-black px-2 py-1">
                        <p className='w-full'>{registerItem.consignee}</p>
                    </td>
        

                  {/* weight */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.weight}</p>
                    </td>
                  {/* bill_amount */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.bill_amount}</p>
                    </td>
                  {/* to_pay_tbb */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.to_pay_tbb}</p>
                    </td>
                  {/* bill_number */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.bill_number}</p>
                    </td>
                  {/* mr_number */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.mr_number}</p>
                    </td>
                  {/* broker_name */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.broker_name}</p>
                    </td>
                  {/* challan_number */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.challan_number}</p>
                    </td>
                  {/* lorry_number */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.lorry_number}</p>
                    </td>
                  {/* hire */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.hire}</p>
                    </td>
                  {/* advance */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.advance}</p>
                    </td>
                  {/* balance */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.balance}</p>
                    </td>
                  {/* remark */}
                  <td className="border border-black px-2 py-1">
                      <p className='w-full'>{registerItem.remark}</p>
                    </td>

                  </tr>
                )
              })
            }
            
            <tr>
              {/* CN_Number */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="cn_number"
                value={data.initialRegisterData.cn_number}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.cn_number", e.target.value, "")
                }
              /> 
            </td>
            {/* date */}
              <td className="border border-black px-2 py-1">
              <input
                type="date"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="date"
                value={data.initialRegisterData.date}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.date", e.target.value, "")
                }
              /> 
              </td>
            {/* number_of_packages */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="number_of_packages"
                value={data.initialRegisterData.number_of_packages}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.number_of_packages", e.target.value, "")
                }
              /> 
            </td>
      

              {/* destination */}
              <td className="border border-black px-2 py-1" >
              <input
                type="text"
                className="bg-transparent bg-green-200"
                name="destination"
                value={data.initialRegisterData.destination}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.destination", e.target.value, "")
                }
              /> 
              </td>

              {/* consignor */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent p-1 outline-none border-b-2 border-black"
                name="consignor"
                value={data.initialRegisterData.consignor}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.consignor", e.target.value, "")
                }
              /> 
              </td>

            {/* consignee */}
              <td className="border border-black px-2 py-1" >
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="consignee"
                value={data.initialRegisterData.consignee}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.consignee", e.target.value, "")
                }
              /> 
              </td>

          

            {/* weight */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="weight"
                value={data.initialRegisterData.weight}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.weight", e.target.value, "")
                }
              /> 
              </td>
            {/* bill_amount */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="bill_amount"
                value={data.initialRegisterData.bill_amount}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.bill_amount", e.target.value, "")
                }
              /> 
              </td>
            {/* to_pay_tbb */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="to_pay_tbb"
                value={data.initialRegisterData.to_pay_tbb}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.to_pay_tbb", e.target.value, "")
                }
              /> 
              </td>
            {/* bill_number */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="bill_number"
                value={data.initialRegisterData.bill_number}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.bill_number", e.target.value, "")
                }
              /> 
              </td>

              {/* mr_number */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="mr_number"
                value={data.initialRegisterData.mr_number}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.mr_number", e.target.value, "")
                }
              /> 
              </td>
              
              {/* broker_name */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="broker_name"
                value={data.initialRegisterData.broker_name}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.broker_name", e.target.value, "")
                }
              /> 
              </td>

              {/* challan_number */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="challan_number"
                value={data.initialRegisterData.challan_number}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.challan_number", e.target.value, "")
                }
              /> 
              </td>
              
              {/* lorry_number */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="lorry_number"
                value={data.initialRegisterData.lorry_number}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.lorry_number", e.target.value, "")
                }
              /> 
              </td>

              {/* hire */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="hire"
                value={data.initialRegisterData.hire}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.hire", e.target.value, "")
                }
              /> 
              </td>
              {/* advance */}

              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="cn_number"
                value={data.initialRegisterData.advance}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.advance", e.target.value, "")
                }
              /> 
              </td>
              {/* balance */}

              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="cn_number"
                value={data.initialRegisterData.balance}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.balance", e.target.value, "")
                }
              /> 
              </td>
              {/* remark */}
              <td className="border border-black px-2 py-1">
              <input
                type="text"
                className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
                name="cn_number"
                value={data.initialRegisterData.remark}
                onChange={(e) =>
                  handleMoreNestedChange("initialRegisterData.remark", e.target.value, "")
                }
              /> 
              </td>
           
            </tr>
          </tbody>
        </table>
        <button className='bg-yellow-500 rounded p-1 w-full text-white mt-3' onClick={() => handleAddRecordToLocal()}>Add row</button>
      </div>


      <button className='bg-blue-800 hover:bg-blue-600 text-white rounded p-2 w-full' onClick={() => {handleSubmit_addBookingregister()}}>Submit copy</button>
    </div>
  );
};

export default BookingRegister;
