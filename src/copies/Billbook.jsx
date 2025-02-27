import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axiosInstance from "../axiosInstanceOf";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Loader from "../components/Loader";

function BillBook({ id }) {


  const table_columns = [
    "CN Number",
    "Invoice No.",
    "From",
    "To",
    "Weight",
    "Charged",
    "Rate",
    "Freight",
    "ST",
    "Charges",
    "Others",
    "Amount",
  ];
  // const {isLoading, setIsloading} = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading);
  
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState({
    name: "",
    billno: "",
    date: "",
    initialBillDetails: {
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
    billDetails: [],
    total: "",
    gst_payable_by: "",
  });

  // Handle Change
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

  // Add Bill Copy to DB
  const handleSubmit_addBillCopy = async () => {
    const { initialBillDetails, ...finalData } = data;

    try {

      const response = await axiosInstance.post(
        `/api/billcopy/add/${id}`,
        finalData
      );

      console.log("Response:", response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRecordToLocal = () => {
    setData((prevData) => ({
      ...prevData,
      initialBillDetails: {
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
      billDetails: [
        ...prevData.billDetails, prevData.initialBillDetails
      ]
    }));
  };


  
  console.log(data);
  
  return (
    <div className={`outline relative `}>
      {
        isLoading && <div className={`w-full h-full absolute ${isLoading && 'bg-black/70'}`}></div>

      }
      {
        isLoading && <Loader isLoading={isLoading} />
      }
      <Header />
      {/* name of delear & billNo */}
      <div className=" grid grid-cols-4">
        {/* NAME OF DEALER */}
        <div className="col-span-3 border-r-2 border-black">
          <div className="flex ">
            <h1>M/s:</h1>
            {/* Name */}
            <input
              type="text"
              className="bg-transparent w-full p-1 outline-none border-b-2 border-black"
              name="name"
              value={data.name}
              onChange={(e) =>
                handleMoreNestedChange("name", e.target.value, "")
              }
            />
          </div>
        </div>

        {/* Bill no */}
        <div className=" border-r-2 border-black ">
          <div className="flex  ">
            {/* Bill No */}
            <h1>Bill No.:</h1>
            <input
              type="text"
              className="bg-transparent border-b-2 border-black"
              name="billno"
              value={data.billno}
              onChange={(e) =>
                handleMoreNestedChange("billno", e.target.value, "")
              }
            />
          </div>

          {/* Date */}
          <div className="flex  ">
            <h1>Date:</h1>
            <input
              type="date"
              className="ml-3 bg-transparent border-b-2 border-black"
              name="date"
              value={data.date}
              onChange={(e) =>
                handleMoreNestedChange("date", e.target.value, "")
              }
            />
          </div>
        </div>
      </div>
      {/* service charce */}

      <div className="flex text-nowrap justify-between text-xs border border-black">
        <h1>Being the Service Charges as per the following Details :</h1>
        <h1>
          (Interest @ 24% per annum will be charged on all out standing Bills)
        </h1>
      </div>

      {/* table */}
      <table className="p-4 w-full">
        <thead className="grid grid-cols-12 border border-black ">
          {table_columns.map((column) => (
            <th className="text-xs">{column}</th>
          ))}
        </thead>
        <tbody>
          {/* added records locally */}
          {
            data.billDetails.length > 0 &&
              data.billDetails.map((record) => {
        
              return (
                <tr className="grid grid-cols-12">
                  {/* CN_NUMBER */}
                  <td className="flex justify-center">
                    {record.cn_number}
                  </td>
                  {/* invoice number */}
                  <td className="flex justify-center">
                    {record.invoice_number}
                  </td>
                  {/* from */}
                  <td className="flex justify-center">
                    {record.from}
                  </td>
                  {/* to */}
                  <td className="flex justify-center">
                    {record.to}
                  </td>
                  {/* weight */}
                  <td className="flex justify-center">
                    {record.weight}
                  </td>
                  {/* charged */}
                  <td className="flex justify-center">
                    {record.charged}
                  </td>
                  {/* rate */}
                  <td className="flex justify-center">
                    {record.rate}
                  </td>
                  {/* freight */}
                  <td className="flex justify-center">
                    {record.freight}
                  </td>
                  {/* st */}
                  <td className="flex justify-center">
                    {record.st}
                  </td>
                  {/* st_charges */}
                  <td className="flex justify-center">
                    {record.st_charges}
                  </td>
                  {/* others */}
                  <td className="flex justify-center">
                    {record.others}
                  </td>
                  {/* amount */}
                  <td className="flex justify-center">
                    {record.amount}
                  </td>
            
                </tr>
              );
            }
          )}

          {/*  */}
          {isAdd && (
            <tr className="grid grid-cols-12">
              {/* CN_NUMBER */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className=" bg-transparent border-b-2 border-black w-12"
                  name="cn_number"
                  value={data.initialBillDetails.cn_number}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.cn_number",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* invoice number */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="invoice_number"
                  value={data.initialBillDetails.invoice_number}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.invoice_number",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="from"
                  value={data.initialBillDetails.from}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.from",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* to */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="to"
                  value={data.initialBillDetails.to}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.to",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* weight */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="weight"
                  value={data.initialBillDetails.weight}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.weight",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* charged */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="charged"
                  value={data.initialBillDetails.charged}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.charged",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* rate */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="weight"
                  value={data.initialBillDetails.rate}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.rate",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* freight */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="freight"
                  value={data.initialBillDetails.freight}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.freight",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* st */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="st"
                  value={data.initialBillDetails.st}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.st",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* st_charges */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="st_charges"
                  value={data.initialBillDetails.st_charges}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.st_charges",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* others */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="others"
                  value={data.initialBillDetails.others}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.others",
                      e.target.value,
                      ""
                    )
                  }
                />
              </td>
              {/* amount */}
              <td className="flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-black w-12"
                  name="amount"
                  value={data.initialBillDetails.amount}
                  onChange={(e) =>
                    handleMoreNestedChange(
                      "initialBillDetails.amount",
                      e.target.value,
                      ""
                    )
                  }
                />

              </td>
            </tr>
          )}

          <div className="flex ">
            <button
              className="bg-blue-800 text-white px-3 rounded m-2 w-full"
              onClick={() => {
                {
                  isAdd ? handleAddRecordToLocal() : setIsAdd(true);
                }
              }}
            >
              {isAdd ? "Submit" : "Add record"}
            </button>
            {isAdd && (
              <button
                type="button"
                onClick={() => setIsAdd(!isAdd)}
                className="bg-red-700 text-white px-3 rounded m-2 w-full"
              >
                Cancel
              </button>
            )}
          </div>
        </tbody>

        {/* Rupees & total */}
        <div className="border border-black flex justify-between">
          <p>Rupees</p>
          <div className="grid grid-cols-3">
            <p>TOTAL:</p>
            <p className="col-span-2">$900000</p>
          </div>
        </div>
      </table>

      {/* footer */}
      <footer className=" grid grid-cols-3 outline">
        <div className="flex flex-col space-y-4  border-r-2 border-black ">
          <p>PAN: AKMPM6807F</p>
          <p>GST NO: 27AKMPM6807F2ZW</p>
          <p>GST Payable by : </p>
          {/* Radio Buttons */}
          <div className="space-x-4  ">
            <input
              id="link-radio-1"
              type="radio"
              value="consignor"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="link-radio-1"
              class="text-sm font-medium text-black-900"
            >
              Consignor
            </label>

            <input
              id="link-radio-2"
              type="radio"
              value="consignee"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              name="consignee"
              onChange={(e) =>
                handleMoreNestedChange("gst_payable_by", e.target.value, "")
              }
            />
            <label
              for="link-radio-2"
              class="text-sm font-medium text-gray-900 "
            >
              Consignee
            </label>
          </div>
          <p className="text-[10px] font-bold ">
            PLEASE PAY BY A/C PAYEE CHEQUE OR NEFT
          </p>
        </div>

        <div className="flex flex-col justify-between items-center  border-r-2 border-black  ">
          <p>AKASH ROAD CARRIERS</p>
          <p>Bank Name : IDBI Bank, Nigdi.</p>
          <p>Account No.: 087102000014243</p>
          <p>IFSE Code No.: IBKL0000087</p>
        </div>

        <div className="flex flex-col justify-between h-full items-center">
          <p>For AKASH ROAD CARRIERS</p>
          <p className="">E.& O.E.</p>
        </div>
      </footer>
      <button className="bg-blue-800 rounded px-3 text-white w-full m-3" onClick={() => handleSubmit_addBillCopy()}>
        Submit
      </button>
    </div>
  );
}

export default BillBook;
