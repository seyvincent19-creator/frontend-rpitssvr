import React, { useEffect } from "react";
import "./Sidebar.css";

const Sidebar = () => {
useEffect(() => {
  if (!window.FB || !window.FB.XFBML || !window.FB.XFBML.parse) {
    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  } else {
    window.FB.XFBML.parse();
  }
}, []);


  return (
    <div className="p-4 bg-secondary text-white rounded image-slider-container">
  <h5 className="text-center mb-3">ព័តមានពីហ្វេសប៊ុក</h5>
  <div id="fb-root"></div>
  <div className="fb-plugin-wrapper">
    <div
      className="fb-page"
      data-href="https://web.facebook.com/R.P.I.T.S.S.R"
      data-tabs="timeline"
      data-width="200"
      data-height=""
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://web.facebook.com/R.P.I.T.S.S.R"
        className="fb-xfbml-parse-ignore"
      >
        <a href="https://web.facebook.com/R.P.I.T.S.S.R">Facebook</a>
      </blockquote>
    </div>
  </div>
</div>

  );
};

export default Sidebar;
