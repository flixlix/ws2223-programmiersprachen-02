import React from "react";
import "./ImgTextSection.css";

export default function ImgTextSection({
  src,
  reversed,
  heading,
  text,
  alt,
  showImg,
}) {
  console.log(showImg);
  return (
    <div className={reversed ? "combo_reversed" : "combo"}>
      {showImg ? (
        <img
          src={src ?? "https://thispersondoesnotexist.com/image"}
          alt={alt}
        />
      ) : null}
      <div>
        <h2>{heading ?? "Hello World!"}</h2>
        <p>
          {text ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur placeat perferendis soluta ducimus. Accusantium, impedit aperiam quisquam laborum repellat nostrum dicta quidem nam architecto repudiandae. Cupiditate eveniet itaque hic, sapiente saepe autem, sed nam dignissimos iste alias nemo odit ut quisquam debitis repellat corporis praesentium provident magnam! Adipisci, dolorum iusto."}
        </p>
      </div>
    </div>
  );
}
