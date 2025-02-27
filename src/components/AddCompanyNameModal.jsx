import React, { useState } from "react";
import axiosInstance from "../axiosInstanceOf";

const AddCompanyNameModal = ({show,handle}) => {
    const [company, setCompany] = useState(null);
    // const handleAddCompany= async(company)=>{
    //   if (company) {
    //       try {
    //         console.log(company);
    //         const response = await axiosInstance.post("/api/addcompany", {
    //           name: company,
    //         });
            
            
    //         // After successfully adding, fetch updated company list
    //       } catch (error) {
    //         console.error("Error adding company:", error);
    //       }
    //     }
    // }
    
    const handleAddCompany = async () => {
        if (company.trim()) {
          try {
            const response = await axiosInstance.post("/api/company/add", { name: company });
            console.log("Company added:", response.data); // Log the response from the server
            if(response.data){
                handle();
                window.alert("Company Added");
            }
          } catch (error) {
            console.error("Error adding company:", error); // Log error if any
          }
        } else {
          console.log("Company name is empty!");
        }
      };
      
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Enter Company Name</h2>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between">
            <button
              onClick={handleAddCompany}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={handle}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      
    );
}

export default AddCompanyNameModal