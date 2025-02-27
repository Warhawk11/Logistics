import React from "react";

const LrTable = ({data, handleMoreNestedChange}) => {

   
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-black  text-left align-top">Packages</th>

          <th className="border border-black  text-left align-top" colSpan="4">
            Description
          </th>

          <th className="border border-black  text-left align-top" colSpan="2">
            Weight in Kgs
          </th>

          <th className="border border-black  text-left align-top" colSpan="2">
            <p className="text-center">Amount to Pay/Paid/Due</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
        
            {/* Packages */}
            <td className="border border-black align-top p-0" rowSpan="6">
            <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='package_name'
                value={data.delivery_details.packages.package_name}
                onChange={(e) => handleMoreNestedChange("delivery_details.packages.package_name", e.target.value, '')}
              />
            </td>

            {/* Desription */}
            <td
              className="border border-black  text-left align-top"
              colSpan="4"
              rowSpan="6"
            >
            <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='description'
                value={data.delivery_details.packages.description}
                onChange={(e) => handleMoreNestedChange("delivery_details.packages.description", e.target.value, '')}
              />            
              </td>

          {/* Weight in KGs */}
          <td className="border border-black  text-left align-top" rowSpan="2">
          <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='actual'
                value={data.delivery_details.weight.actual}
                onChange={(e) => handleMoreNestedChange("delivery_details.weight.actual", e.target.value, '')}
              />  
          </td>

          {/* Frieght */}
          <td className="border border-black  text-left align-top">Freight</td>
          <td className="border border-black p-0 text-left ">
            {/* Frieght - RS */}
            <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='freight'
                value={data.delivery_details.amount_to_pay.freight}
                onChange={(e) => handleMoreNestedChange("delivery_details.amount_to_pay.freight", e.target.value, '')}
              />  
          </td>
         
        </tr>
        <tr>
          <td className="border border-black  text-left ">Hamali</td>
          <td className="border border-black text-left ">
          <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='freight'
                value={data.delivery_details.amount_to_pay.hamali}
                onChange={(e) => handleMoreNestedChange("delivery_details.amount_to_pay.hamali", e.target.value, '')}
              />  
          </td>
    
        </tr>
        <tr>
          <td className="border border-black  text-left align-top" rowSpan="4">
            Charged
            <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='charged'
                value={data.delivery_details.weight.charged}
                onChange={(e) => handleMoreNestedChange("delivery_details.weight.charged", e.target.value, '')}
              />  
          </td>
          <td className="border border-black  text-left align-top">Sur. Ch.</td>
          <td className="border border-black  text-center">50</td>

        </tr>
        <tr>
          <td className="border border-black  text-left align-top">LR. Ch.</td>
          <td className="border border-black  text-center">50</td>

        </tr>
        <tr>
          <td className="border border-black  text-left align-top">Risk Ch.</td>
          <td className="border border-black  text-center">
          <input
                className="border-b-2 outline-none bg-transparent text-start w-[98%] border-black"
                type="text"
                name='freight'
                value={data.delivery_details.amount_to_pay.risk}
                onChange={(e) => handleMoreNestedChange("delivery_details.amount_to_pay.risk", e.target.value, '')}
              />  
          </td>
         
        </tr>
        <tr>
          <td className="border border-black  text-left align-top">Total</td>
          <td className="border border-black  text-center">
            100rs
          </td>
       
        </tr>
      </tbody>
    </table>
  );
};

export default LrTable;
