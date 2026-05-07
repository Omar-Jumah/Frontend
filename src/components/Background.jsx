function Background({ children }) {
  return (
    <div className="app-background">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>
      <div className="background-glow glow-three"></div>

      {children}
    </div>
  );
}

export default Background;