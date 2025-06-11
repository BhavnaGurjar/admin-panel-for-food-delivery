const VariantSelector = () => {
  const data = [
    {
      variantName: "Half",
      basePrice: 100,
      operator: "-",
      variantPrice: 80,
      finalPrice: 20,
      isDefault: true,
    },
    {
      variantName: "Full",
      basePrice: 200,
      operator: "+",
      variantPrice: 140,
      finalPrice: 340,
      isDefault: false,
    },
  ];

  return (
    <div className="bg-gray-100 w-full rounded-3 max-w-5xl mx-auto mt-6 p-3 pb-0 border border-gray-300">
      <h3 className="text-lg font-semibold">Quantity</h3>

      <div className="">
        <table className="min-w-full text-sm text-center">
          <thead className=" text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Variant Name</th>
              <th className="py-3 px-4 border-b">Base Price</th>
              <th className="py-3 px-4 border-b">Operator</th>
              <th className="py-3 px-4 border-b">Variant Price</th>
              <th className="py-3 px-4 border-b">Final Price</th>
              <th className="py-3 px-4 border-b">Default</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="text-gray-800"
              >
                <td className="py-3 px-4 border-b">{item.variantName}</td>
                <td className="py-3 px-4 border-b">₹ {item.basePrice}</td>
                <td className="py-3 px-4 border-b">{item.operator}</td>
                <td className="py-3 px-4 border-b">₹ {item.variantPrice}</td>
                <td className="py-3 px-4 border-b">₹ {item.finalPrice}</td>
                <td className="py-3 px-4 border-b">
                  {item.isDefault ? (
                    <span className="font-medium">Default</span>
                  ) : (
                    <span className="text-gray-500">Not Default</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantSelector;
