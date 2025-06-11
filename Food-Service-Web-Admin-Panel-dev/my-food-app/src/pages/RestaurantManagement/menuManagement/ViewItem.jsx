import { FaCircle } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { Breadcrumbs } from "../../../components";
import { images } from "../../../assets";

const ViewItem = () => {
  const breadcrumbItems = [
    { name: "Menu Management", link: "/restaurant-management/menu" },
    {
      name: "Restaurant Details",
      link: "/restaurant-management/menu/restaurant-view",
    },
    { name: "View Item" },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">View Item</h1>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">
            Cheese Pizza (5 pieces)
          </h2>
          <div className="flex items-center gap-1 text-green-600">
            <div className="border">
              <TbPointFilled size={20} />
            </div>
            Veg
          </div>
          <button className="flex items-center gap-2 bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
            <FaCircle size={12} />
            Pending
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="md:w-1/2">
            <img
              className="w-full h-60 object-cover rounded-lg mb-4"
              src={images.itemDemo}
              alt="Cheese Pizza"
            />
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-500">
                  (Category &gt; Sub-category)
                </p>
                <p className="font-medium">Pizza &gt; Pizza</p>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TbPointFilled size={20} />
                Veg
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A creamy and rich Indian curry made with soft paneer cubes
              simmered in a buttery tomato-based gravy, flavored with aromatic
              spices. Perfect with naan or rice for a satisfying meal!
            </p>
            <hr className="my-4" />
            <p className="text-sm text-gray-700">
              Available on Delivery -{" "}
              <span className="text-green-600 font-semibold">YES</span>
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Recommended -{" "}
              <span className="text-green-600 font-semibold">YES</span>
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <button className="text-teal-600 border border-teal-600 px-4 py-2 rounded-full font-semibold">
                  View Variants (2)
                </button>
                <p className="text-yellow-500 text-sm mt-1">Pending</p>
              </div>
              <div className="flex flex-col items-end">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-full font-semibold">
                  View Add-ons (3)
                </button>
                <p className="text-green-600 text-sm mt-1">Approved</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2">
            <div className="bg-gray p-4 rounded-lg border border-gray mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Item Pricing
              </h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Base Price</span>
                <span className="text-gray-800">₹80.00</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Packaging Price</span>
                <span className="text-gray-800">₹10.00</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Taxes</span>
                <span className="text-gray-800">5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Final Price</span>
                <span className="text-gray-800">₹90.00</span>
              </div>
            </div>

            <div className="bg-gray p-4 rounded-lg border border-gray">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                More Info
              </h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Serving Info</span>
                <span className="text-gray-800">1-2 People</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Preparation time</span>
                <span className="text-gray-800">30 Min</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Calorie Count</span>
                <span className="text-gray-800">500 Kcal</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">Item Tag</div>
              <div className="flex gap-2 mt-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded border border-blue-600 text-sm">
                  Chef’s Special
                </span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded border border-blue-600 text-sm">
                  New
                </span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded border border-blue-600 text-sm">
                  Seasonal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full">
            Reject
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-full">
            Request Changes
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
