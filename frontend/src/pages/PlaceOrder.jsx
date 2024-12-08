import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const {navigate} = useContext(ShopContext);

  const deliveryFields = [
    { id: "firstName", placeholder: "First Name", type: "text", group: "name" },
    { id: "lastName", placeholder: "Last Name", type: "text", group: "name" },
    { id: "email", placeholder: "Email Address", type: "email", group: "single"},
    { id: "streetName", placeholder: "Street Name",  type: "text", group: "single"},
    { id: "city", placeholder: "City", type: "text", group: "location" },
    { id: "state", placeholder: "State", type: "text", group: "location" },
    { id: "zipcode", placeholder: "Zipcode", type: "text", group: "zip" },
    { id: "country", placeholder: "Country", type: "text", group: "zip" },
    { id: "phone", placeholder: "Phone", type: "number", group: "single" },
  ];

  const PaymentMethod = [
    { id: "stripe", name: "stripe", logo: assets.stripe_logo },
    { id: "mpesa", name: "M-PESA", logo: assets.MPESA_logo },
    { id: "cod", name: "CASH ON DELIVERY", logo: "" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/* delivery information input field */}
        {/* Grouped delivery information input fields */}
        <div className="flex gap-3">
          {deliveryFields
            .filter((field) => field.group === "name")
            .map((field) => (
              <input
                key={field.id}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type={field.type}
                name={field.id}
                id={field.id}
                placeholder={field.placeholder}
              />
            ))}
        </div>

        {deliveryFields
        .filter((field) => field.group === "single")
          .map((field) => (
            <input
              key={field.id}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type={field.type}
              name={field.id}
              id={field.id}
              placeholder={field.placeholder}
            />
          ))}

        <div className="flex gap-3">
          {deliveryFields
            .filter((field) => field.group === "location")
            .map((field) => (
              <input
                key={field.id}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type={field.type}
                name={field.id}
                id={field.id}
                placeholder={field.placeholder}
              />
            ))}
        </div>
        <div className="flex gap-3">
          {deliveryFields
            .filter((field) => field.group === "zip")
            .map((field) => (
              <input
                key={field.id}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type={field.type}
                name={field.id}
                id={field.id}
                placeholder={field.placeholder}
              />
            ))}
        </div>
      </div>



      {/* right side  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex gap-3 flex-col xl:flex-row">
            {PaymentMethod.map((methodItem) => (
              <div
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                key={methodItem.id}
                onClick={() => setMethod(methodItem.id)}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === methodItem.id ? "bg-green-400" : ""
                  }`}
                ></p>
                {methodItem.logo && (
                  <img className="h-8 mx-1" src={methodItem.logo} alt="" />
                )}
                {!methodItem.logo && (
                  <p className="text-gray-500 text-sm font-medium mx-4">
                    {" "}
                    {methodItem.name}{" "}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=> navigate('/orders')} className="bg-[#C586A5] text-white px-16 py-3 text-sm cursor-pointer"> PLACE ORDER </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
