import React, { useEffect, useState } from "react";

const PopupImage = () => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(3); // countdown start at 5

  useEffect(() => {
    setShow(true);

    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setShow(false); // auto-close popup after 5s
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white p-3 rounded shadow" style={{ maxWidth: "90%", maxHeight: "90%" }}>
        <div className="text-end">
          <button
            className="btn btn-sm btn-danger"
            disabled
          >
            បិទ ({timer}s)
          </button>
        </div>
        <img
          src="/images/img-slide/4.jpg"
          alt="Popup"
          className="img-fluid rounded"
        />
      </div>
    </div>
  );
};

export default PopupImage;
