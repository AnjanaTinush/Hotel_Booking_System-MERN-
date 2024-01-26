import React from "react";

function Success({massage}) {
  return (
    <div>
      <div class="alert alert-primary" role="alert">
      {massage}
      </div>
    </div>
  );
}

export default Success;
