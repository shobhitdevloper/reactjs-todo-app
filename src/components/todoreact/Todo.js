import React, { useState, useEffect } from "react";
import "./style.css";

// get the LocalStorageDate
const getLocalData = () => {
  const lists = localStorage.getItem("myItems");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //   edit the Items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElement) => {
      return curElement.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //   delete items function
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElement) => {
      return curElement.id !== index;
    });
    setItems(updatedItem);
  };

  // remove all items
  const removeAll = () => {
    setItems([]);
  };

  //  adding localStorage items

  useEffect(() => {
    localStorage.setItem("myItems", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoLogo" />
            <figcaption>Add Your List Here ✌️ </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our Items */}
          <div className="showItems">
            {items.map((curElement) => (
              <div className="eachItem" key={curElement.id}>
                <h3>{curElement.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(curElement.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElement.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/* show our Items */}

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
