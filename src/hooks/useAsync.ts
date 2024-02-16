import { useEffect, useState } from "react";

export default (call: () => Promise<any>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    call()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, []);

  return {
    loading,
    data,
    error,
  };
};
