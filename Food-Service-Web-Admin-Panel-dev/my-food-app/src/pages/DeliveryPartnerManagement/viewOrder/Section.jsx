export const SectionCard = ({ title, children }) => (
  <div className="border border-black-20 rounded-lg p-4 bg-white shadow-sm">
    <h6 className="text-primary border-b border-black-10 font-semibold mb-3">
      {title}
    </h6>
    <div className="space-y-2">{children}</div>
  </div>
);

export const SectionRow = ({ label, value }) => (
  <div className="flex text-sm">
    <p className="font-medium text-scorpion">{label}: </p>
    <div className="ms-2">{value}</div>
  </div>
);
