import React from 'react'

export default function ListItems({...item}) {
  console.log('item', item)
  const checkStyle = {
    accentColor: 'rgb(0, 140, 128)'
  }
  const handleChange = (e) => {
    console.log("changed");
    if (e.target.type === "checkbox") {
      return setChecklistData((prevData) => {
        return {
          ...prevData,
          [e.target.name]: e.target.checked,
        };
      });
    }
  };

  return (
      <label className="checkboxLabel">
        <input
          className="checkbox"
          id="1"
          checked={item[1]}
          type="checkbox"
          name="final_physical"
          style={checkStyle}
          onChange={handleChange}
        />{" "}
        {item[0].replace(/_/g, ' ')}
      </label>
  )
}
