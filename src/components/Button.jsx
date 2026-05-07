const Button = ({ text, onClick, variant = "primary" }) => {
  const styles = {
    primary: { background: "#e040fb", border: "none" },
    secondary: { background: "#1a6ef5", border: "none" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "8px",
        ...styles[variant],
      }}
    >
      {text}
    </button>
  );
};

export default Button;