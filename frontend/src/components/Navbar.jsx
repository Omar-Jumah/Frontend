function Navbar() {
  return (
    <div className="topbar">
      <h1 className="logo">AI Dashboard</h1>

      <div className="topbar-links">
        <a href="/">Dashboard</a>
        <a href="/results">Results</a>
      </div>
    </div>
  );
}

export default Navbar;