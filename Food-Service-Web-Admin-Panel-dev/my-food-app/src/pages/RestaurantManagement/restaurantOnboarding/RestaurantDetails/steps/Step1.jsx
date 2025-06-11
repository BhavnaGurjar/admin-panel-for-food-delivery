import React, { useState } from "react";
import {
  AddOnSelector,
  ItemCard,
  VariantSelector,
} from "../../../../../components";
import { IoMdArrowBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { images } from "../../../../../assets";

const Step1 = ({ setRequestChanges }) => {
  const [activeTab, setActiveTab] = useState("items");
  const [productView, setProductView] = useState({
    visible: false,
    productId: "1",
  });
  const [variantsView, setVariantsView] = useState({
    visible: false,
    productId: "1",
  });
  const [addonsView, setAddonsView] = useState({
    visible: false,
    productId: "1",
  });

  const pizzaAddOns = [
    { name: "Mayonnaise", price: 80 },
    { name: "Cheese", price: 80 },
    { name: "Shezwan", price: 80 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h5 className="mb-0 fs-4">Menu Upload</h5>
      </div>
      {productView.visible && addonsView.visible && (
        <div className="bg-white rounded shadow-custom p-4 mt-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setAddonsView({ visible: false });
                }}
              >
                <IoMdArrowBack size={22} />
              </div>
              <h5 className="m-0 ps-2 text-blue">
                Cheese Pizza (5 pieces) Add-ons
              </h5>
            </div>
          </div>
          <div className="mt-4">
            <AddOnSelector
              title="Pizza Add-on"
              options={pizzaAddOns}
              max={4}
              min={0}
            />
          </div>
          <div className="pt-3 flex flex-row justify-end gap-2">
            <button className="bg-custom-red rounded-pill border-0 text-white px-4 py-2">
              Reject
            </button>
            <button className="bg-custom-primary rounded-pill border-0 text-white px-4 py-2">
              Request Changes
            </button>
            <button className="bg-custom-green rounded-pill border-0 text-white px-4 py-2">
              Approve
            </button>
          </div>
        </div>
      )}
      {productView.visible && variantsView.visible && (
        <div className="bg-white rounded shadow-custom p-4 mt-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setVariantsView({ visible: false });
                }}
              >
                <IoMdArrowBack size={22} />
              </div>
              <h5 className="m-0 ps-2 text-blue">
                Cheese Pizza (5 pieces) Variants
              </h5>
            </div>
          </div>
          <VariantSelector />
          <div className="pt-3 flex flex-row justify-end gap-2">
            <button className="bg-custom-red rounded-pill border-0 text-white px-4 py-2">
              Reject
            </button>
            <button className="bg-custom-primary rounded-pill border-0 text-white px-4 py-2">
              Request Changes
            </button>
            <button className="bg-custom-green rounded-pill border-0 text-white px-4 py-2">
              Approve
            </button>
          </div>
        </div>
      )}
      {!variantsView.visible && !addonsView.visible && productView.visible && (
        <div className="bg-white rounded shadow-custom p-4 mt-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setProductView({ visible: false });
                }}
              >
                <IoMdArrowBack size={22} />
              </div>
              <h5 className="m-0 ps-2 text-blue">Cheese Pizza (5 pieces)</h5>
            </div>
            <div>
              <button
                className="flex items-center gap-2 text-yellow text-yellow rounded-pill border-0 px-3 py-2"
                style={{
                  backgroundColor: "#F69B0E33",
                  color: "#F69B0E",
                }}
              >
                <FaCircle size={12} />
                Pending
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-3 mt-3">
            <div className="col-6 px-3">
              <div className="w-100 mb-1">
                <img
                  className="w-100 rounded"
                  height={200}
                  src={images.itemDemo}
                  alt=""
                />
              </div>
              <div className="flex pt-2 items-center flex-row justify-between">
                <p className="text-black m-0 fs-5 fw-semibold">
                  Cheese Pizza (5 pieces)
                </p>
                <div className="flex gap-2">
                  <div className="custom-border-green rounded p-1 flex items-center justify-center">
                    <FaCircle color={"#006F26"} size={12} />
                  </div>
                  <p className="p-0 m-0 text-custom-green">Veg</p>
                </div>
              </div>
              <div>Pizza &gt; Pizza</div>
              <p className="opacity-75 pt-2">
                A creamy and rich Indian curry made with soft paneer cubes
                simmered in a buttery tomato-based gravy, flavored with aromatic
                spices. Perfect with naan or rice for a satisfying meal!
              </p>
              <hr />
              <p className="text-black fs-7">
                Available on Delivery -{" "}
                <span className="text-custom-green fw-bold">YES</span>
              </p>
              <p className="text-black fs-7">
                Recommended -{" "}
                <span className="text-custom-green fw-bold">YES</span>
              </p>
              <div className="flex flex-row gap-2">
                <div className="flex flex-column justify-end align-items-end">
                  <button
                    onClick={() => {
                      setVariantsView({ visible: true });
                    }}
                    className="rounded-pill fw-semibold bg-transparent border-custom-teal py-2 px-3 font-primary text-custom-teal"
                  >
                    View Variants (2)
                  </button>
                  <p className="p-0 m-0 text-custom-yellow fw-semibold">
                    Pending
                  </p>
                </div>
                <div className="flex flex-column justify-end align-items-end">
                  <button
                    className="rounded-pill fw-semibold bg-custom-teal border-0 py-2 px-3 font-primary text-white"
                    onClick={() => {
                      setAddonsView({ visible: true });
                    }}
                  >
                    View Add-ons (3)
                  </button>
                  <p className="p-0 m-0 text-custom-green fw-semibold">
                    Approved
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="rounded p-4 bg-custom-gray border">
                <h6 className="m-0 p-0 fs-5 text-black mb-3">Item Pricing</h6>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Base Price</p>
                  <p className="p-0 m-0 text-black">&#8377;80.00</p>
                </div>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Packaging Price</p>
                  <p className="p-0 m-0 text-black">&#8377;10.00</p>
                </div>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Taxes</p>
                  <p className="p-0 m-0 text-black">5%</p>
                </div>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Final Price</p>
                  <p className="p-0 m-0 text-black">&#8377;90.00</p>
                </div>
              </div>

              <div className="rounded p-4 bg-custom-gray border mt-4">
                <h6 className="m-0 p-0 fs-5 text-black mb-3">More Info</h6>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Serving Info</p>
                  <p className="p-0 m-0 text-black">1-2 People</p>
                </div>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Preparation time</p>
                  <p className="p-0 m-0 text-black">30 Min</p>
                </div>
                <div className="flex flex-row items-center gap-2 py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Calorie Count</p>
                  <p className="p-0 m-0 text-black">500 Kcal</p>
                </div>
                <div className="py-2 fs-6">
                  <p className="p-0 m-0 custom-label-color">Item Tag</p>
                  <div className="flex items-center gap-3 pt-3">
                    <p className="bg-custom-primary-light py-1 px-2 rounded text-custom-primary border-custom-primary">
                      Chef’s Special
                    </p>
                    <p className="bg-custom-primary-light py-1 px-2 rounded text-custom-primary border-custom-primary">
                      New
                    </p>
                    <p className="bg-custom-primary-light py-1 px-2 rounded text-custom-primary border-custom-primary">
                      Seasonal
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="pt-3 flex flex-row justify-end gap-2">
            <button className="bg-custom-red rounded-pill border-0 text-white px-4 py-2">
              Reject
            </button>
            <button className="bg-custom-primary rounded-pill border-0 text-white px-4 py-2">
              Request Changes
            </button>
            <button className="bg-custom-green rounded-pill border-0 text-white px-4 py-2">
              Approve
            </button>
          </div>
        </div>
      )}
      {!productView.visible && !variantsView.visible && !addonsView.visible && (
        <div className="tabs-container mt-4 p-4 rounded">
          <div className="flex flex-row items-center justify-start gap-5 tabs-row">
            <h6
              onClick={() => {
                setActiveTab("items");
              }}
              className={`${
                activeTab === "items" ? "active-bottom" : "opacity-50"
              } text-blue cursor-pointer pb-3 m-0 px-4`}
            >
              Items
            </h6>
            <h6
              onClick={() => {
                setActiveTab("category");
              }}
              className={`${
                activeTab === "category" ? "active-bottom" : "opacity-50"
              } text-blue cursor-pointer pb-3 m-0 px-4`}
            >
              Category
            </h6>
            <h6
              onClick={() => {
                setActiveTab("subcategory");
              }}
              className={`${
                activeTab === "subcategory" ? "active-bottom" : "opacity-50"
              } text-blue cursor-pointer pb-3 m-0 px-4`}
            >
              Sub Category
            </h6>
          </div>
          {activeTab === "items" && (
            <>
              <div className="pt-3">
                <div>
                  <h6 className="text-custom-primary fs-5">Uploaded Items</h6>
                  <div className="row gy-3">
                    <div className="col-12 col-md-6 col-lg-4">
                      <ItemCard
                        handleOnClick={() => {
                          setProductView({ visible: true });
                        }}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <ItemCard
                        handleOnClick={() => {
                          setProductView({ visible: true });
                        }}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <ItemCard
                        handleOnClick={() => {
                          setProductView({ visible: true });
                        }}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <ItemCard
                        handleOnClick={() => {
                          setProductView({ visible: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3 flex flex-row justify-end gap-2">
                <button className="bg-custom-primary rounded-pill border-0 text-white px-4 py-2">
                  Request Changes
                </button>
                <button className="bg-custom-green rounded-pill border-0 text-white px-4 py-2">
                  Approve
                </button>
              </div>
            </>
          )}
          {activeTab === "category" && (
            <>
              <div className="pt-3">
                <div>
                  <div className="flex justify-between items-center">
                    <h6 className="text-custom-primary fs-5">
                      Uploaded Category
                    </h6>
                    <div className="flex justify-between items-center gap-2">
                      <input
                        className="category-checkbox"
                        type="checkbox"
                        name="category"
                        id=""
                      />
                      <label
                        htmlFor="category"
                        className="text-blue fw-semibold"
                      >
                        Select all
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="rounded-pill category-option-div gap-3 px-4 py-3 flex items-center justify-space-between">
                      <input
                        className="category-checkbox"
                        type="checkbox"
                        name="category"
                        id=""
                      />
                      <label htmlFor="category">North Indian</label>
                    </div>
                    <div className="rounded-pill category-option-div gap-3 px-4 py-3 flex items-center justify-space-between">
                      <input
                        className="category-checkbox"
                        type="checkbox"
                        name="category"
                        id=""
                      />
                      <label htmlFor="category">North Indian</label>
                    </div>
                    <div className="rounded-pill category-option-div gap-3 px-4 py-3 flex items-center justify-space-between">
                      <input
                        className="category-checkbox"
                        type="checkbox"
                        name="category"
                        id=""
                      />
                      <label htmlFor="category">North Indian</label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "subcategory" && (
            <>
              <div className="pt-3">
                <div>
                  <div className="flex justify-between items-center">
                    <h6 className="text-custom-primary fs-5">
                      Uploaded Sub Category
                    </h6>
                    <div className="flex justify-between items-center gap-2">
                      <input
                        className="category-checkbox"
                        type="checkbox"
                        name="category"
                        id=""
                      />
                      <label
                        htmlFor="category"
                        className="text-blue fw-semibold"
                      >
                        Select all
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="subcategory-option-div px-4 py-3">
                      <div className="gap-3 flex items-center justify-space-between">
                        <input
                          className="category-checkbox"
                          type="checkbox"
                          name="category"
                          id=""
                        />
                        <label htmlFor="category">Punjabi Cuisine</label>
                      </div>
                      <p className="m-0 text-black opacity-50 mt-3">Category</p>
                      <p className="m-0">North Indian</p>
                    </div>
                    <div className="subcategory-option-div px-4 py-3">
                      <div className="gap-3 flex items-center justify-space-between">
                        <input
                          className="category-checkbox"
                          type="checkbox"
                          name="category"
                          id=""
                        />
                        <label htmlFor="category">Punjabi Cuisine</label>
                      </div>
                      <p className="m-0 text-black opacity-50 mt-3">Category</p>
                      <p className="m-0">North Indian</p>
                    </div>
                    <div className="subcategory-option-div px-4 py-3">
                      <div className="gap-3 flex items-center justify-space-between">
                        <input
                          className="category-checkbox"
                          type="checkbox"
                          name="category"
                          id=""
                        />
                        <label htmlFor="category">Punjabi Cuisine</label>
                      </div>
                      <p className="m-0 text-black opacity-50 mt-3">Category</p>
                      <p className="m-0">North Indian</p>
                    </div>
                    <div className="subcategory-option-div px-4 py-3">
                      <div className="gap-3 flex items-center justify-space-between">
                        <input
                          className="category-checkbox"
                          type="checkbox"
                          name="category"
                          id=""
                        />
                        <label htmlFor="category">Punjabi Cuisine</label>
                      </div>
                      <p className="m-0 text-black opacity-50 mt-3">Category</p>
                      <p className="m-0">North Indian</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Step1;
