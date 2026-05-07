const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div style={{ marginBottom: "16px", textAlign: "right" }}>
      <label style={{ display: "block", marginBottom: "6px", color: "#ccc", fontSize: "14px" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #2a4a6b",
          background: "rgba(255,255,255,0.05)",
          color: "#fff",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default InputField;