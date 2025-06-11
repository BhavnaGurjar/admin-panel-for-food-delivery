import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center ml-0">
            {item.link && index !== items.length - 1 ? (
              <>
                <Link to={item.link} className="text-primary">
                  {item.name}
                </Link>
                <span className="px-1">/</span>
              </>
            ) : (
              <span className="text-gray-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
