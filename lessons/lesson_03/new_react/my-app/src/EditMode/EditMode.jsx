import React from "react";

export default function EditMode({
  selected,
  handleCheckBoxChange,
  handleInputChange,
  handleInputParagraphChange,
  handleImageCheckBoxChange,
  imageState,
  checkState,
}) {
  return (
    <div className="text-field">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="This is a heading Text"
      />
      <input
        type="text"
        onChange={handleInputParagraphChange}
        placeholder="Edit Paragraph Text"
      />
      <input
        type="checkbox"
        title="Checkbox"
        checked={checkState}
        onChange={handleCheckBoxChange}
      />
      <input
        type="checkbox"
        title="Image Check"
        checked={imageState}
        onChange={handleImageCheckBoxChange}
      />
    </div>
  );
}
