const RenderItem = ({ type, value }) => {
  switch (type) {
    case "text":
      return <span>{value}</span>;
    case "input":
      return (
        <>
          <input type="checkbox" />
        </>
      );

    default:
      return null;
  }
};

export default RenderItem;
