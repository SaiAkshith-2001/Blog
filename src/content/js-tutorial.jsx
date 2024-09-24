import React from "react";
import fs from "fs";
const dirContent = fs.readFileSync(`content/${fileName}`, "utf-8");
const t = () => {
  return <div>t</div>;
};

export default t;
