import ReactJson from "react-json-view";

const JsonViewer = ({ data }) => {
  return (
    <div className="max-h-[38vh] overflow-scroll">
      <ReactJson
        src={data}
        style={{
          backgroundColor: "rgb(40, 44, 53)",
          paddingInline: "0.5rem",
          paddingBlock: "0.3rem",
        }}
        collapseStringsAfterLength={50}
        theme={"monokai"}
      />
    </div>
  );
};

export default JsonViewer;
