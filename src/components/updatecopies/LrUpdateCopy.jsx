import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstanceOf'

const LrUpdateCopy = ({copyid}) => {
  
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

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get(`/api/lr/${copyid}`)
      const data = response.data;
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
    fetchContent();
  }, [])
  

  return (
    <div>LrUpdateCopy</div>
  )
}

export default LrUpdateCopy