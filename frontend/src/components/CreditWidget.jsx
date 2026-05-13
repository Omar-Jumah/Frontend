import { useEffect, useState } from "react";
import API from "../services/api";

function CreditWidget() {
  const [credits, setCredits] = useState(0);

  const fetchCredits = async () => {
    try {
      const res = await API.get("/credits");
      setCredits(res.data.credits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <div className="card">
      <p className="card-title">Available Credits</p>
      <h2 className="card-value">{credits}</h2>
    </div>
  );
}

export default CreditWidget;