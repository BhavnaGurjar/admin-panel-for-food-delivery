import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useLocation } from "react-router-dom";
import { Icons } from "../../../../../assets";
import { textareaSchema } from "../../../../../schema";
import { ItemCard, CommonModal, MainScreenLoader } from "../../../../../components";
import { useGetOnboardingFirstDataQuery, useStepVerificationMutation } from "../../../../../apis/restaurant";
const Step1 = ({ onApprovedCountChange }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("category");
  const [selectedSubCatIds, setSelectedSubCatIds] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState(null);
  const [remainCategory, setRemainCategory] = useState("");
  const [remainType, setRemainType] = useState("category");
  const [approveModalShow, setApproveModalShow] = useState(false);
  const [itemRejectModalShow, setItemRejectModalShow] = useState(false);
  const [itemApproveModalShow, setItemApproveModalShow] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rejectModalShow, setRejectModalShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [subCategoryDisabled, setSubCategoryDisabled] = useState(true);
  const [warningModal, setWarningModal] = useState(false);
  const rejectedIds = [];
  const [productView, setProductView] = useState({
    visible: false,
    product: null
  });
  const [approveIds, setApproIds] = useState([]);
  const [stepVerify] = useStepVerificationMutation();
  const {RestaurantId} = location.state || {};

  const { data, refetch, isLoading } = useGetOnboardingFirstDataQuery({
    id: RestaurantId,
    type: activeTab,
    filter: null,
  });

  const items = data?.message === 'Item retrieved'
    ? data.data.map(({ item, categoryName, subCategoryName }) => ({
      ...item,
      categoryName,
      subCategoryName,
    }))
    : [];
  useEffect(() => {
    const approvedCount = items.filter((item) => item.status === "APPROVED").length;
    onApprovedCountChange?.(approvedCount);
  }, [items, onApprovedCountChange]);

  const categories =data?.message === "Category retrieved"
      ? data?.data.filter((cat) => !cat.predefined)
      : [];

  const subCategories = data?.message === "Subcategory retrieved"
    ? data.data.map(({ categoryName, subcategory }) => ({
      id: subcategory.subcategoryId,
      name: subcategory.name,
      group: categoryName,
      type: subcategory.status,
      response: subcategory.lastUpdate,
      message: subcategory.rejectionMessage,
    }))
    : [];
  const isAllSelected = selectedSubCatIds.length === subCategories.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedSubCatIds([]);
      setSubCategoryDisabled(true);
    } else {
      setSelectedSubCatIds(subCategories.map((item) => item.id));
      setSubCategoryDisabled(false);
    }
  };

  const toggleCheckbox = (id) => {
    setSelectedSubCatIds((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      setSubCategoryDisabled(newSelected.length === 0);
      return newSelected;
    });
  };
  const handleChange = (id) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      setDisabled(newSelected.length === 0);
      return newSelected;
    });
  };
  const handleSelectAll = () => {
    const selectableIds = categories
      .filter((c) => !rejectedIds.includes(c.categoryId) && !approveIds.includes(c.categoryId))
      .map((c) => c.categoryId);

    if (selectedIds.length === selectableIds.length) {
      setSelectedIds([]);
      setDisabled(true);
    } else {
      setSelectedIds(selectableIds);
      setDisabled(selectableIds.length === 0);
    }
  };
  const handleItemApprove = async () => {
    try {
      await stepVerify({
        type: 'item',
        actionType: "approved",
        refId: RestaurantId,
        ids: [selectedItemIds],
      }).unwrap();
      refetch();
      toast.success("Item approved successfully");
      setProductView({ visible: false });
      setItemApproveModalShow(false);
      setActiveTab("item");
    } catch (error) {
      setItemApproveModalShow(false);
      const message = error?.data?.message;

      if (error?.data?.statusCode === 404) {
        let categoryName = "";
        let type = "category";
        if (message?.includes("Sub Category name")) {
          const match = message.match(/Sub Category name - (.+)$/);
          categoryName = match ? match[1] : "";
          type = "subcategory";
        }
        else if (message?.includes("Category name")) {
          const match = message.match(/Category name - (.+)$/);
          categoryName = match ? match[1] : "";
          type = "category";
        }

        if (categoryName) {
          setRemainCategory(categoryName);
          setRemainType(type);
          setWarningModal(true);
        }
      }

      console.error("Approval failed:", error);
    }
  };
  const handleItemReject = async (message) => {
    try {
      await stepVerify({
        type: 'item',
        actionType: "rejected",
        refId: RestaurantId,
        ids: [selectedItemIds],
        rejectionMessage: message
      }).unwrap();
      refetch();
      toast.success("Item rejected successfully");
      setActiveTab("item");
      setItemRejectModalShow(false);
    } catch (error) {
      console.error("Rejection failed:", error);
      toast.error(error?.data?.message || "Rejection failed. Please try again.");
    }
  };
  const handleApprove = async () => {
    const idsToSend = activeTab === "subcategory" ? selectedSubCatIds : selectedIds;
    const type = activeTab;

    if (idsToSend.length === 0) return;

    try {
      await stepVerify({
        type,
        actionType: "approved",
        refId: RestaurantId,
        ids: idsToSend,
      }).unwrap();
      refetch();
      setApproveModalShow(false);
      if (activeTab === "subcategory") {
        setSelectedSubCatIds([]);
        refetch();
      } else {
        setSelectedIds([]);
        setDisabled(true);
        setSubCategoryDisabled(true);
      }

    }
    catch (error) {
      setApproveModalShow(false);
      const message = error?.data?.message;

      if (error?.data?.statusCode === 404 && message?.includes("Category name")) {
        const match = message.match(/Category name - (.+)$/);
        const categoryName = match ? match[1] : "";
        setRemainCategory(categoryName);
        setWarningModal(true);
      }

      console.error("Approval failed:", error);
    }
  };

  const handleReject = async (message) => {
    const idsToSend = activeTab === "subcategory" ? selectedSubCatIds : selectedIds;
    const type = activeTab;

    if (idsToSend.length === 0) return;

    try {
      await stepVerify({
        type,
        actionType: "rejected",
        refId: RestaurantId,
        ids: idsToSend,
        rejectionMessage: message,
      }).unwrap();
      refetch();
      setRejectModalShow(false);
      if (activeTab === "subcategory") {
        setSelectedSubCatIds([]);
        refetch();
      } else {
        setSelectedIds([]);
        setSubCategoryDisabled(true);
        setDisabled(true);
      }

    } catch (error) {
      setRejectModalShow(false);
    }
  };

  return (
    <div>
      {isLoading && <MainScreenLoader />}
      <div className="flex justify-between items-center w-full h-full">
        <h5 className="mb-0 font-satoshi font-bold text-2xl">Menu Upload</h5>
      </div>
      {productView.visible && (
        <div className="bg-white rounded shadow-md lg:p-3 md:px-2 md:py-3 mt-4">
          <div className="flex flex-row items-center justify-between pr-4 pl-2">
            <div className="flex flex-row items-center mb-2">
              <div
                className="cursor-pointer"
                onClick={() => setProductView({ visible: false })}
              >
                <Icons.Back />
              </div>
              <h5 className="m-0 ps-2 font-medium text-xl text-blue">

                {productView?.product?.name
                  ?.split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")}

              </h5>
            </div>

            <div
              className={`flex items-center mb-2 gap-1 border text-sm py-1 px-2 rounded-lg ${productView.product.status === "APPROVED"
                ? "bg-success-10 border-success"
                : productView.product.status === "REJECTED"
                  ? "bg-danger-10 border-danger"
                  : "bg-warning-10 border-warning"
                }`}
            >
              <div
                className={`rounded-full w-1.5 h-1.5 ${productView.product.status === "APPROVED"
                  ? "bg-success"
                  : productView.product.status === "REJECTED"
                    ? "bg-danger"
                    : "bg-warning"
                  }`}
              />
              <div
                className={`${productView.product.status === "APPROVED"
                  ? "text-success"
                  : productView.product.status === "REJECTED"
                    ? "text-danger"
                    : "text-warning"
                  }`}
              >
                {productView.product.status === "APPROVED"
                  ? "Approved"
                  : productView.product.status === "REJECTED"
                    ? "Rejected"
                    : "Pending"}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-3 gap-4 max-w-[96%] mx-auto">
            <div className="flex-[1_1_0%]">
              <div className="overflow-hidden rounded-md object-contain w-full md:h-[44%] lg:h-[37%] flex items-center justify-center">
                <img
                  src={productView.product.image}
                  alt="Modal"
                  className="w-full h-auto rounded object-cover"
                />
              </div>

              <div className="flex md:mt-2 lg:mt-4 items-center justify-between">
                <p className="m-0 text-xl font-medium">
                  {productView?.product?.name
                    ?.split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ")}
                </p>

                <span
                  className={`text-[0.739rem] flex items-center gap-0.5 font-medium ${productView.product.type === "VEG" ? "text-green-800" : "text-red-600"
                    }`}
                >
                  {productView.product.type === "VEG" ? (
                    <Icons.Veg />
                  ) : (
                    <Icons.Veg strokeColor="#F11F46" />
                  )}
                  {productView.product.type === "VEG" ? "Veg" : "Non Veg"}
                </span>
              </div>
              <div className="text-[rgba(34,13,3,0.6)] text-sm">
                <span className="font-medium">{productView.product.categoryName}</span>
                {productView.product.subCategoryName && (
                  <> &gt; {productView.product.subCategoryName}</>
                )}
              </div>
              <div className="h-[16%] rounded-md p-2 bg-gray-50 border mt-2">
                <h6 className="m-0 p-0 text-[1rem] font-semibold">
                  Description
                </h6>
                <p className="text-[rgba(34,13,3,0.6)] text-sm">
                  {productView.product.description}
                </p>
              </div>
              <div className="flex flex-col md:flex-col lg:flex-row items-start md:items-start lg:items-center text-xs mt-3 gap-1">
                {productView.product.delivery && (
                  <div className="flex gap-1 font-medium items-center border border-black-20 rounded py-1.5 px-2">
                    <Icons.Checked2 />
                    <p>Available on Delivery</p>
                  </div>
                )}

                {productView.product.recommended && (
                  <div className="flex gap-1 font-medium items-center border border-black-20 py-1.5 rounded px-2">
                    <Icons.Checked2 />
                    <p>Recommended</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-[1_1_0%]">
              <div className="rounded-md p-3 bg-gray-50 border">
                <h6 className="m-0 p-0 text-[1rem] font-semibold mb-1">
                  Item Pricing
                </h6>
                <div className="flex flex-row items-center gap-2 md:py-1 lg:py-1.5 text-sm">
                  <p className="p-0 m-0 text-gray-500  ">Base Price</p>
                  <p
                    className={`p-0 m-0 ${productView?.product?.basePrice == null ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.basePrice != null
                      ? `₹${productView.product.basePrice}`
                      : "N/A"}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 md:py-1 lg:py-1.5 text-sm">
                  <p className="p-0 m-0 text-gray-500  ">Packaging Price</p>
                  <p
                    className={`p-0 m-0 ${productView?.product?.packagingPrice == null ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.packagingPrice != null
                      ? `₹${productView.product.packagingPrice}`
                      : "N/A"}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 md:py-1 lg:py-1.5 text-sm">
                  <p className="p-0 m-0 text-gray-500  ">Taxes</p>
                  <p
                    className={`p-0 m-0 ${productView?.product?.tax == null ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.tax ?? "N/A"}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 md:py-1 lg:py-1.5 text-sm">
                  <p className="p-0 m-0 text-gray-500  ">Final Price</p>
                  <p
                    className={`p-0 m-0 ${productView?.product?.finalPrice == null ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.finalPrice != null
                      ? `₹${productView.product.finalPrice}`
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="rounded-md p-3 bg-gray-50 border md:mt-2 lg:mt-4">
                <h6 className="m-0 p-0 text-[1rem] font-semibold mb-1">More Info</h6>
                <div className="flex flex-row items-center text-sm gap-2 md:py-1 lg:py-1.5">
                  <p className="p-0 m-0 text-gray-500  ">Serving Info</p>
                  <p
                    className={`p-0 m-0 ${!productView?.product?.servingInfo?.trim() ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.servingInfo?.trim() || "N/A"}
                  </p>
                </div>
                <div className="flex flex-row items-center text-sm gap-2 md:py-1 lg:py-1.5">
                  <p className="p-0 m-0 text-gray-500  ">Preparation time</p>
                  <p
                    className={`p-0 m-0 ${productView?.product?.preparationTime == null ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.preparationTime ?? "N/A"}
                  </p>
                </div>
                <div className="flex flex-row items-center text-sm gap-2 md:py-1 lg:py-1.5">
                  <p className="p-0 m-0 text-gray-500  ">Calorie Count</p>
                  <p
                    className={`p-0 m-0 ${!productView?.product?.calorieCount ? "text-gray-400" : ""
                      }`}
                  >
                    {productView?.product?.calorieCount ?? "N/A"}
                  </p>
                </div>
                <div className="flex items-center text-sm gap-3">
                  <p className="p-0 m-0 text-gray-500  ">Item Tag</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {(productView?.product?.itemTag?.trim() || "N/A")
                      .split(",")
                      .map((tag, index) => (
                        <p
                          key={index}
                          className="bg-white font-medium py-1 px-2 rounded-md text-primary border border-primary"
                        >
                          {tag.trim()}
                        </p>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* Action Buttons */}
          {productView.product.status === "ONHOLD" && (
            <div className="mt-2 flex flex-row text-sm justify-end gap-2.5">
              <button
                className="rounded-lg py-1.5 px-3 text-danger border border-danger bg-danger-10 hover:bg-danger-100 transition-all duration-300"
                onClick={() => {
                  setSelectedItemIds(productView.product.itemId);
                  setItemRejectModalShow(true);
                }}
              >
                Reject
              </button>
              <button
                className="bg-primary text-white py-1.5 px-3 rounded-lg hover:bg-[#1458BD] transition-all duration-300"
                onClick={() => {
                  setSelectedItemIds(productView.product.itemId);
                  setItemApproveModalShow(true);
                }}
              >
                Approve
              </button>
            </div>
          )}
        </div>
      )}

      {!productView.visible && (
        <div className="bg-white relative shadow-md mt-4 p-4 rounded min-w-screen-lg min-h-[28.500rem]">
          <div className="flex flex-row items-center justify-start gap-5 font-medium text-[0.813rem] mb-3 tabs-row">
            <h6
              onClick={() => {
                setActiveTab("category");
              }}
              className={`${activeTab === "category" ? "border-b-2 border-blue font-medium" : "opacity-50"
                } text-blue cursor-pointer pb-2 m-0 px-4`}
            >
              Category
            </h6>
            <h6
              onClick={() => {
                setActiveTab("subcategory");
              }}
              className={`${activeTab === "subcategory" ? "border-b-2 border-blue font-medium" : "opacity-50"
                } text-blue cursor-pointer pb-2 m-0 px-4`}
            >
              Sub Category
            </h6>
            <h6
              onClick={() => {
                setActiveTab("item");
              }}
              className={`${activeTab === "item" ? "border-b-2 border-blue font-medium" : "opacity-50"
                } text-blue cursor-pointer pb-2 m-0 px-4`}
            >
              Items
            </h6>
          </div>
          {activeTab === "item" && (
            <>
              <div className="pt-3">
                {items.length > 0 ? (
                  <>
                    <h6 className="text-blue font-medium">Uploaded Items</h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-3 mt-4">
                      {items.map((item) => (
                        <ItemCard
                          key={item.itemId}
                          status={item.status}
                          name={item.name}
                          category={item.categoryName}
                          subCategory={item.subCategoryName?.trim()}
                          description={item.description}
                          type={item.type}
                          image={item.image}
                          itemTag={item.itemTag ? [item.itemTag] : ['No item tags selected']}
                          price={item.basePrice}
                          handleOnClick={() => setProductView({ visible: true, product: item })}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-center text-sm text-gray-500">
                      No uploaded item
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {activeTab === "category" && (
            <>
              {categories.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-center text-sm text-gray-500">
                    No uploaded category
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h6 className="text-blue font-medium my-3.5">Uploaded Category</h6>

                    {/* Show Select All only if any category has status ONHOLD and is not rejected or approved */}
                    {categories.some(
                      (c) =>
                        c.status === "ONHOLD" &&
                        !rejectedIds.includes(c.categoryId) &&
                        !approveIds.includes(c.categoryId)
                    ) && (
                        <div className="flex justify-between items-center gap-2 px-4 py-3">
                          <input
                            className="category-checkbox w-4 h-4 cursor-pointer"
                            type="checkbox"
                            checked={
                              categories.filter(
                                (c) =>
                                  !rejectedIds.includes(c.categoryId) &&
                                  !approveIds.includes(c.categoryId) &&
                                  c.status === "ONHOLD"
                              ).length > 0 &&
                              selectedIds.length ===
                              categories.filter(
                                (c) =>
                                  !rejectedIds.includes(c.categoryId) &&
                                  !approveIds.includes(c.categoryId) &&
                                  c.status === "ONHOLD"
                              ).length
                            }
                            onChange={handleSelectAll}
                            id="select-all"
                          />
                          <label htmlFor="select-all" className="text-blue font-medium">
                            Select All
                          </label>
                        </div>
                      )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    {categories.map(({ categoryId, name, status, rejectionMessage }) => {
                      const isRejected = status === "REJECTED";
                      const isApproved = status === "APPROVED";

                      return (
                        <div
                          key={categoryId}
                          className={`rounded-lg flex items-center gap-2 w-44 h-12
              ${isRejected ? "border px-2.5 py-2 border-red-300" : ""}
              ${isApproved ? "border px-2.5 py-2 border-green-400" : ""}
              ${!isRejected && !isApproved
                              ? "border border-black-20 px-4 py-3 shadow-sm"
                              : ""
                            }
            `}
                        >
                          {status === "ONHOLD" && !isRejected ? (
                            <>
                              <input
                                className="category-checkbox w-[0.875rem] h-[0.875rem] cursor-pointer"
                                type="checkbox"
                                id={`cat-${categoryId}`}
                                checked={selectedIds.includes(categoryId)}
                                onChange={() => handleChange(categoryId, name)}
                              />
                              <label
                                htmlFor={`cat-${categoryId}`}
                                className="text-[0.813rem] font-medium"
                              >
                                {name}
                              </label>
                            </>
                          ) : (
                            <span className="text-[0.813rem] font-medium flex items-center gap-1 relative">
                              {isApproved ? (
                                <>
                                  <span className="p-1 rounded-full bg-green-100">
                                    <Icons.Mark
                                      size={15}
                                      strokeColor="rgba(34,197,94,1)"
                                    />
                                  </span>
                                  {name}
                                </>
                              ) : (
                                <>
                                  <span className="p-1 rounded-full bg-red-100">
                                    <Icons.Cross2
                                      size={15}
                                      strokeColor="rgba(241,31,70,1)"
                                    />
                                  </span>
                                  {name}
                                  {rejectionMessage && (
                                    <div className="relative group cursor-pointer">
                                      <Icons.WarnInfo strokeColor="rgba(0,0,0,0.4)" />
                                      <div
                                        className="absolute z-10 bg-black text-white py-2 px-2.5 rounded-md text-xs invisible opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap
                          before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black"
                                      >
                                        {rejectionMessage}
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Show buttons only if any category is ONHOLD and not rejected or approved */}
                  {categories.some(
                    (c) =>
                      c.status === "ONHOLD" &&
                      !rejectedIds.includes(c.categoryId) &&
                      !approveIds.includes(c.categoryId)
                  ) &&
                    categories.length !== 0 && (
                      <div className="text-sm mt-40 flex mb-4 justify-end items-end gap-2.5 absolute bottom-1 right-4">
                        <button
                          disabled={disabled}
                          className={`rounded-lg py-1.5 px-3 text-[rgba(241,31,70,1)] border border-[rgba(241,31,70,1)] bg-[rgba(241,31,70,0.1)]
            ${disabled ? "opacity-75" : "opacity-100"}`}
                          onClick={() => setRejectModalShow(true)}
                        >
                          Reject
                        </button>
                        <button
                          disabled={disabled}
                          className={`bg-primary text-white py-1.5 px-3 rounded-lg hover:bg-[#1458BD] transition-all duration-300 
            ${disabled ? "opacity-75" : "opacity-100"}`}
                          onClick={() => setApproveModalShow(true)}
                        >
                          Approve
                        </button>
                      </div>
                    )}
                </>
              )}
            </>
          )}
          {activeTab === "subcategory" && (
            <div className="pt-3">
              {subCategories.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-center text-sm text-gray-500">
                    No uploaded subcategory
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h6 className="text-blue font-medium">Uploaded Sub Category</h6>
                    {subCategories.some(item => item.type === "ONHOLD") && (
                      <div className="flex items-center gap-2 pr-3">
                        <input
                          className="w-4 h-4 cursor-pointer"
                          type="checkbox"
                          id="select-all-subcat"
                          checked={isAllSelected}
                          onChange={toggleSelectAll}
                        />
                        <label htmlFor="select-all-subcat" className="text-blue font-medium">Select All</label>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3.5 mt-5 flex-wrap">
                    {subCategories.map(({ id, name, group, type, message }) => (
                      <div key={id} className={`p-3 border border-black-10 rounded-lg shadow-sm w-52 h-26
              ${type === "REJECTED" ? "border px-2.5 py-2 border-red-300" : ""}
              ${type === "APPROVED" ? "border px-2.5 py-2 border-green-400" : ""}
              ${type === "ONHOLD"
                          ? "border border-black-20 px-4 py-3 shadow-sm"
                          : ""
                        }`}>
                        {type === "ONHOLD" ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`subcat-${id}`}
                              className="w-[0.875rem] h-[0.875rem] cursor-pointer"
                              checked={selectedSubCatIds.includes(id)}
                              onChange={() => toggleCheckbox(id)}
                            />
                            <label htmlFor={`subcat-${id}`} className="text-[0.813rem] font-medium">
                              {name}
                            </label>
                          </div>

                        ) : (
                          <span className="text-[0.813rem] font-medium flex items-center gap-1 relative">
                            {type === "APPROVED" ? (
                              <>
                                <span className="p-1 rounded-full bg-green-100">
                                  <Icons.Mark size={15} strokeColor="rgba(34,197,94,1)" />
                                </span>
                                {name}
                              </>
                            ) : (
                              <>
                                <span className="p-1 rounded-full bg-red-100">
                                  <Icons.Cross2 size={15} strokeColor="rgba(241,31,70,1)" />
                                </span>
                                {name}
                                {message && (
                                  <div className="relative group cursor-pointer">
                                    <Icons.WarnInfo strokeColor="rgba(0,0,0,0.4)" />
                                    <div className="absolute z-10 bg-black text-white py-2 px-2.5 rounded-md text-xs invisible opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap
                            before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black"
                                    >
                                      {message}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </span>
                        )}
                        <p className="mt-5 text-[0.813rem] opacity-50">Category</p>
                        <p className="text-[0.813rem] font-medium">{group}</p>
                      </div>
                    ))}
                  </div>

                  {subCategories.some(item => item.type === "ONHOLD") && subCategories.length > 0 && (
                    <div className="text-sm mb-4 flex justify-end gap-2.5 absolute bottom-1 right-4">
                      <button
                        disabled={subCategoryDisabled}
                        className={`rounded-lg py-1.5 px-3 text-[rgba(241,31,70,1)] border border-[rgba(241,31,70,1)] bg-[rgba(241,31,70,0.1)]
            ${subCategoryDisabled ? "opacity-75" : "opacity-100"}`}
                        onClick={() => setRejectModalShow(true)}
                      >
                        Reject
                      </button>
                      <button
                        disabled={subCategoryDisabled}
                        className={`bg-primary text-white py-1.5 px-3 rounded-lg hover:bg-[#1458BD] transition-all duration-300 
            ${subCategoryDisabled ? "opacity-75" : "opacity-100"}`}
                        onClick={() => setApproveModalShow(true)}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
      {/* Warning Modal */}
      <CommonModal
        show={warningModal}
        onHide={() => setWarningModal(false)}
        icon={<Icons.WarnInfo />}
        heading="Parent Exists"
        subheading={
          <>
            The parent {remainType === "subcategory" ? "Sub Category" : "Category"}:&nbsp;
            <span
              onClick={() => {
                setProductView({ visible: false });
                setActiveTab(remainType);
                setTimeout(() => setWarningModal(false), 0);
              }}
              className="underline cursor-pointer hover:text-gray-600"
            >
              {remainCategory}
            </span>{" "}
            is not approved yet. Please approve it first.
          </>
        }
      />
      {/* Reject Modal */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleReject(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={rejectModalShow}
            onHide={() => setRejectModalShow(false)}
            icon={<Icons.NotAllowed />}
            heading="Reject Application"
            subheading="Please specify the reason for rejection to notify the restaurant owner."
            body={
              <Form>
                <div className="mt-2">
                  <label className="block text-sm font-semibold mb-2">
                    Rejection Reason
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    className="w-full border border-black-10 rounded p-3 text-sm outline-none resize-none hover:border-black-40"
                    placeholder="e.g.  your Documents is Wrong"
                    rows={2}
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-600 mt-1 text-sm">{errors.message}</div>
                  )}
                </div>
              </Form>
            }
            primaryButtonText="Reject Application"
            primaryButtonColor="bg-red-500 text-sm text-white"
            onPrimaryAction={handleSubmit}
          />
        )}
      </Formik>
      {/* Approve modal */}
      <CommonModal
        show={itemApproveModalShow}
        onHide={() => setItemApproveModalShow(false)}
        icon={<Icons.Approve />}
        heading="Approve Application"
        subheading='Ensure all the required details are accurate before approval."'
        onPrimaryAction={() => handleItemApprove()}
        primaryButtonColor='text-white bg-success'
        primaryButtonText='Approve'
      />
      {/* Reject Modal */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleItemReject(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={itemRejectModalShow}
            onHide={() => setItemRejectModalShow(false)}
            icon={<Icons.NotAllowed />}
            heading="Reject Application"
            subheading="Please specify the reason for rejection to notify the restaurant owner."
            body={
              <Form>
                <div className="mt-2">
                  <label className="block text-sm font-semibold mb-2">
                    Rejection Reason
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    className="w-full border border-black-10 rounded p-3 text-sm outline-none resize-none hover:border-black-40"
                    placeholder="e.g.  your Documents is Wrong"
                    rows={2}
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-600 mt-1 text-sm">{errors.message}</div>
                  )}
                </div>
              </Form>
            }
            primaryButtonText="Reject Application"
            primaryButtonColor="bg-red-500 text-sm text-white"
            onPrimaryAction={handleSubmit}
          />
        )}
      </Formik>
      {/* Approve modal */}
      <CommonModal
        show={approveModalShow}
        onHide={() => setApproveModalShow(false)}
        icon={<Icons.Approve />}
        heading="Approve Application"
        subheading='Ensure all the required details are accurate before approval."'
        onPrimaryAction={handleApprove}
        primaryButtonColor='text-white bg-success'
        primaryButtonText='Approve'
      />
    </div>
  );
};

export default Step1;
