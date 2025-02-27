import React, { useState } from "react";
import Header from "../components/Header";
import LrTable from "../components/LrTable";
import axiosInstance from "../axiosInstanceOf";
import { useParams } from "react-router-dom";

const LrCopy = ({id}) => {
  const isLrCopy = true;
  
  const [data, setData] = useState({
    under_company: null, // ObjectId, initially null
    partyMob: "", // String, initially empty
    demurrage_days: '', // Number, initially 0
    demurrage_charges: "", // String, initially empty
    insurance: {
      isInsuredConsignment: false, // Boolean
      companyName: "", // String
      policyNumber: "", // String
      date: "", // String (format: 'YYYY-MM-DD')
      amount: 0, // Number
      risk: "", // String
      eway_billNo: "", // String
    },
    caution: {
      add_deliveryOffice: "", // String
      consignment_note: {
        consignment_note_no: "", // String
        consignment_date: '', // Date, initially null
      },
    },
    delivery_details: {
      consignor: {
        name: "", // String
        address: "", // String
      },
      consignee: {
        name: "", // String
        address: "", // String
      },
      packages: {
        package_name: "", // String
        description: "", // String
      },
      weight: {
        actual: 0, // Number
        charged: 0, // Number
      },
      amount_to_pay: {
        freight: 0, // Number
        hamali: 0, // Number
        sur: 50, // Number
        lr: 50, // Number
        risk: 0, // Number
        total: 0, // Number
      },
    },
    gst_payable_by: "", // Enum ["Consignor", "Consignee"]
    additional_delivery_details: {
      issuing_address: "", // String
      lorry_no: "", // String
      mode_of_packaging: "", // String
      invoice_no: "", // String
      consignors_gst_no: "", // String
      consignee_gst_no: "", // String
      remarks: "", // String
    },
  });


  // Handle simple changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle nested changes (e.g., consignor details)
  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
    // console.log(data.insurance);
  };

   // Handle more nested changes (e.g., consignor details)
   const handleMoreNestedChange = (path, value, type) => {
    setData((prevData) => {
      const keys = path.split(".");

      
      const updateNestedObject = (obj, keys, value, type) => {
        const [currentKey, ...remainingKeys] = keys;
        console.log(currentKey.delivery_details);
        
        if (!obj || !Object.hasOwnProperty.call(obj, currentKey)) {
          console.warn(`Invalid path: ${path}`);
          return obj;  // Return unchanged object
        }
        console.log("currentKey",currentKey);
        console.log("remainingKeys",remainingKeys);
        
  
        if (remainingKeys.length === 0) {
    
          return { ...obj, [currentKey]: type === 'date' ? new Date(value) : value };
        }
        return {
          ...obj,
          [currentKey]: updateNestedObject(obj[currentKey], remainingKeys, value, type),
        };
      };
      return updateNestedObject(prevData, keys, value, type);
    });
  };
  
  console.log(data);


  const handleSubmit_addLr = async (companyId) => {
    const amount_to_pay = data.delivery_details.amount_to_pay
    console.log(Number(amount_to_pay.freight));
    
    const total = Number(amount_to_pay.freight) + Number(amount_to_pay.hamali) + Number(amount_to_pay.sur) + Number(amount_to_pay.lr) + Number(amount_to_pay.risk)
    amount_to_pay.total = total
    

    try {
      const response = await axiosInstance.post(`/api/lr/add/${id}`, data)

      console.log(response.data);

       


    console.log('Response:', response.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <div className="p-4 bg-white rounded">
      {/* Header Part */}
      <Header LrCopy={isLrCopy} />

      {/* GST No. Section */}
      <div className="bg-slate-100 border-b border-black text-sm">
        <p>GST No.: 27AKMPM6807F2ZW</p>
      </div>

      {/* Main Flex Structure */}
      <div className="flex gap-2 items-stretch">
        {/* Left Section: 3/4 of the page width */}
        <div className="w-3/4 border border-black">
          <div className=" grid grid-cols-3 gap-1">
            {/* PARTY PH Section */}
            <div className="space-y-2  p-2 border border-black text-xs dis">
              <p className="border border-black h-16 p-1">
                Party Ph.
                {/* partyMob */}
                <input
                  className="border-b-2 outline-none bg-transparent text-center"
                  type="text"
                  name="partyMob"
                  value={data.partyMob}
                  onChange={handleChange}
                />
              </p>

              <div className="border border-black p-1">
                <p className="border-b border-black text-[10px] font-bold text-center">
                  Schedule of Demurrage Charges
                </p>
                <p>
                  Demurrage Chargeable After
                  {/* demurrage_days */}
                  <input
                    className="border-b-2 outline-none bg-transparent text-center"
                    type="text"
                    name="demurrage_days"
                    value={data.demurrage_days}
                    onChange={(e) =>
                      handleMoreNestedChange("demurrage_days", e.target.value)
                    }
                  />{" "}
                  days from today @ Rs.
                  {/* demurrage_charges */}
                  <input
                    className="border-b-2 outline-none bg-transparent text-center"
                    type="text"
                    name="demurrage_charges"
                    value={data.demurrage_charges}
                    onChange={(e) =>
                      handleMoreNestedChange("demurrage_charges", e.target.value)
                    }
                  />{" "}
                  per day per Qtl. on weight charged
                </p>
              </div>

              <div className="border border-black p-1 w-full ">
                <span className="font-bold">NOTICE</span>
                <p className="text-[8px] font-bold">
                  The Consignments covered by this Lorry Receipt shall be stored
                  at the destination under the control of the Transport operator
                  and shall be delivered to or the order of the Consignee bank
                  whose name is mentioned in the Lorry Receipt. It will under no
                  circumstances be delivered to anyone without the written
                  authority from the consignee Bank on order endorsed on the
                  Consignee Copy or on a Separate Letter of Authority.
                </p>
              </div>
            </div>

            {/* CONSIGNEE Section */}
            <div className="p-2 border border-black text-xs">
              <p className="text-center border border-black p-1 text-[16px] font-bold">
                Consignee Copy
              </p>
              <p className="text-center p-1">AT OWNER'S RISK</p>
              <div className="border border-black p-1">
                <p className="text-center font-bold">INSURANCE</p>
                <p className="text-[10px]">The Customer has stated that:</p>
                <p className="text-xs">
                  {/*  */}
                  <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  class="hidden peer"
                  name='gst_payable_by'
                  value="consignor"
                  onClick={(e) => handleMoreNestedChange("gst_payable_by", e.target.value, '')}

                  
                />
                <div class="bg-white w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-blue-600"></div>
                <span> He has insured the Consignment OR</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  class="hidden peer"
                  name='gst_payable_by'
                  value="consignor"
                  onClick={(e) => handleMoreNestedChange("gst_payable_by", e.target.value, '')}

                  
                />
                <div class="bg-white w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-blue-600"></div>
                <span> He has NOT insured the Consignment OR</span>
              </label>
                </p>
 
                <p>
                  Company
                  {/* insurance.companyName */}
                  <input
                    className="border-b-2 outline-none bg-transparent text-center"
                    type="text"
                    name="companyName"
                    value={data.insurance.companyName}
                    onChange={(e) =>
                      handleNestedChange(e, "insurance", "companyName")
                    }
                  />
                </p>
                <p>
                  Policy No.
                  {/* insurance.policyNumber */}
                  <input
                    className="border-b-2 outline-none bg-transparent text-center"
                    type="text"
                    name="policyNumber"
                    value={data.insurance.policyNumber}
                    onChange={(e) =>
                      handleNestedChange(e, "insurance", "policyNumber")
                    }
                  />
                </p>
                <p>
                  Date
                  {/* insurance.date */}
                  <input
                    className="border-b-2 outline-none bg-transparent text-center"
                    type="date"
                    name="date"
                    value={data.insurance.date}
                    onChange={(e) => handleNestedChange(e, "insurance", "date")}
                  />
                </p>
                <p className="flex items-center space-x-2">Amount</p>
                {/* insurance.amount */}
                <input
                  className="border-b-2 outline-none bg-transparent text-center"
                  type="text"
                  name="amount"
                  value={data.insurance.amount}
                  onChange={(e) => handleNestedChange(e, "insurance", "amount")}
                />
                <p>Risk </p>
                {/* insurance.risk */}
                <input
                  className="border-b-2 outline-none bg-transparent text-center"
                  type="text"
                  name="risk"
                  value={data.insurance.risk}
                  onChange={(e) => handleNestedChange(e, "insurance", "risk")}
                />
                <div className="border-t border-black mt-1">
                  <p> E-Way Bill NO.:</p>
                  {/* insurance.eway_billNo */}
                  <input
                    className="border-b-2 outline-none bg-transparent text-center"
                    type="text"
                    name="eway_billNo"
                    value={data.insurance.eway_billNo}
                    onChange={(e) =>
                      handleNestedChange(e, "insurance", "eway_billNo")
                    }
                  />
                </div>
              </div>
            </div>

            {/* CAUTION Section */}
            <div className="p-2  text-xs h-36">
              <p className="text-center font-bold text-[16px]">Caution</p>
              <p className="text-[12px] text-left">
                This consignment will not be detained, diverted, re-routed, or
                rebooked without Consignee Bank's written permission. It will be
                delivered at destination.
              </p>
              <p className="text-[10px] text-left">
                Address of Delivery office:
                {/* caution.add_deliveryOffice */}
                <input 
                    className="border-b-2 outline-none bg-transparent text-center" 
                    type="text" 
                    name='add_deliveryOffice'
                    value={data.caution.add_deliveryOffice}
                    onChange={(e) => handleNestedChange(e, 'caution', 'add_deliveryOffice')}
                    />       
              </p>
              <p>
                {/*  */}
                <input
                  className="border-b-2 outline-none bg-transparent text-center"
                  type="text"
                />
              </p>
              <p>
                {/*  */}
                <input
                  className="border-b-2 outline-none bg-transparent text-center"
                  type="text"
                />
              </p>
              <div className="pt-[19px]">
                <div className="border border-black p-1 mt-1 h-32">
                  <p className="text-center font-bold">CONSIGNMENT NOTE</p>
                  <p className="font-bold">
                    No.
                    {/* caution.consignment_note.consignment_note_no */}
                    <input 
                      className="border-b-2 outline-none bg-transparent text-center" 
                      type="text" 
                      name='consignment_note_no'
                      value={data.caution.consignment_note.consignment_note_no}
                      onChange={(e) => handleMoreNestedChange("caution.consignment_note.consignment_note_no", e.target.value, '')}
                    />       
                  </p>
                  <p>
                    Date :{/* caution.consignment_note.consignment_date */}
                    <input
                      className="border-b-2 outline-none bg-transparent text-center"
                      type="date"
                      name="consignment_date"
                      value={data.caution.consignment_note.consignment_date}
                      onChange={(e) => handleMoreNestedChange("caution.consignment_note.consignment_date",e.target.value, "")}

                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}

          <div className="col-span-3 border border-black text-xs flex space-x-4">
            <div className="flex justify-between w-full col-span-3 w-full my-1 border border-black text-xs h-full">
   
              <div className="flex-1">
                {/* Consignor's Details */}
                <p className="font-bold">Consignor's Details:</p>
                <div className="flex">
                    {/* Consignor's Name */}
                    <label id="Consignors_Name">Name: </label>
                    <input
                      id="Consignors_Name"
                      className="border-b outline-none ml-3 w-full mt-1"
                      type="text"
                      name='name'
                      value={data.delivery_details.consignor.name}
                      onChange={(e) => handleMoreNestedChange("delivery_details.consignor.name", e.target.value, '')}
                    />
                </div>

                {/* Consignor's Details */}
                <p className="font-bold">Consignee's Details:</p>
                <div className="flex">
                  {/* Consignor's Name */}
                  <label id="Consignors_Name">Name: </label>
                  <input
                    id="Consignors_Name"
                    className="border-b outline-none  w-full mt-1"
                    type="text"
                    name='name'
                    value={data.delivery_details.consignee.name}
                    onChange={(e) => handleMoreNestedChange("delivery_details.consignee.name", e.target.value, '')}
                    />
                </div>

              </div>

              <div className="flex flex-col justify-evenly">
                <div className="flex space-x-1 ">
                  <p>From</p>
                  <input
                    className="border-b-2 outline-none bg-transparent text-start"
                    type="text"
                    name='address'
                    value={data.delivery_details.consignor.address}
                    onChange={(e) => handleMoreNestedChange("delivery_details.consignor.address", e.target.value, '')}
                  />
                </div>
                <div className="flex space-x-1">
                  <p>To:</p>
                  <input
                    className="border-b-2 outline-none bg-transparent text-start"
                    type="text"
                    name='address'
                    value={data.delivery_details.consignee.address}
                    onChange={(e) => handleMoreNestedChange("delivery_details.consignee.address", e.target.value, '')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden border border-black col-span-3">
                  <LrTable data={data} handleMoreNestedChange={handleMoreNestedChange}/>
          </div>
        </div>

        {/* Right Section: 1/4 of the page width */}
        <div className="w-1/4   border border-black text-xs flex flex-col justify-between">
          <h1 className="text-center">PAN No.</h1>
          <h1 className="text-center">AKMPM6807F</h1>

          <div className="outline p-1 mt-1">
            <h1>GST Payable by</h1>
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  class="hidden peer"
                  name='gst_payable_by'
                  value="consignor"
                  onClick={(e) => handleMoreNestedChange("gst_payable_by", e.target.value, '')}

                  
                />
                <div class="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-blue-600 peer-checked:border-blue-600"></div>
                <span>consignor</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  class="hidden peer"
                  name='gst_payable_by'
                  value="consignee"
                  onClick={(e) => handleMoreNestedChange("gst_payable_by", e.target.value, '')}

                />
                <div class="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-blue-600 peer-checked:border-blue-600"></div>
                <span>Consignee</span>
              </label>
            </div>

            <p className="text-[10px] font-bold mt-1">
              *We hereby declare and undertake that we have not claimed & will
              not avail CENVAT credit of duty paid on inputs or capital goods
              used for providing taxable GAT services & we have not availed the
              benefit under the notification of the government of India in
              ministry of finance (Department of revenue) no. 12/2003 dated
              20-06-2003.
            </p>
          </div>

          {/* Additional Company Details */}

          <div className="border-b h-14 mt-1 pl-1 font-bold">
            <h1 className="mb-3">Address of issuing office/agent</h1>
            <div className="w-full text-center">
              <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='issuing_address'
                value={data.additional_delivery_details.issuing_address}
                onChange={(e) => handleMoreNestedChange("additional_delivery_details.issuing_address", e.target.value, '')}

              />
            </div>
          </div>

          <div className="border-b h-14 mt-1 pl-1 font-bold">
            <h1 className="mb-3">LORRY NO.</h1>
            {/* LORRY NO. */}
            <div className="w-full text-center">
              <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='lorry_no'
                value={data.additional_delivery_details.lorry_no}
                onChange={(e) => handleMoreNestedChange("additional_delivery_details.lorry_no", e.target.value, '')}
              />
            </div>
          </div>
          <div className="border-b h-14 mt-1 pl-1 font-bold">
            <h1 className="mb-3">Mode of Packinng.</h1>
            {/* MODE OF PACKING */}
            <div className="w-full text-center">
              <input
              
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='lorry_no'
                value={data.additional_delivery_details.mode_of_packaging}
                onChange={(e) => handleMoreNestedChange("additional_delivery_details.mode_of_packaging", e.target.value, '')}

              />
            </div>
          </div>

          <div className="border-b h-14 mt-1 pl-1 font-bold">
            <h1 className="mb-3">Invoice No.</h1>
            {/* INVOICE NO. */}
            <div className="w-full text-center">
              <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='invoice_no'
                value={data.additional_delivery_details.invoice_no}
                onChange={(e) => handleMoreNestedChange("additional_delivery_details.invoice_no", e.target.value, '')}

              />
            </div>
          </div>

          <div className="border-b h-14 mt-1 pl-1 font-bold">
            <h1 className="mb-3">Consignor's GST No..</h1>
            {/* Consignor's GST NO. */}
            <div className="w-full text-center">
              <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='consignors_gst_no'
                value={data.additional_delivery_details.consignors_gst_no}
                onChange={(e) => handleMoreNestedChange("additional_delivery_details.consignors_gst_no", e.target.value, '')}

              />
            </div>
          </div>

          <div className="border-b h-14 mt-1 pl-1 font-bold">
            <h1 className="mb-3">Remark:</h1>
            {/* REMARK */}
            <div className="w-full text-center ">
              <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='remarks'
                value={data.additional_delivery_details.remarks}
                onChange={(e) => handleMoreNestedChange("additional_delivery_details.remarks", e.target.value, '')}

              />
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="bg-blue-700 mt-3 text-end text-white p-1 rounded"
        onClick={() => handleSubmit_addLr()}
      >Submit</button>
    </div>
  );
};

export default LrCopy;
