import React, { useState} from "react";
import "./App.css";
// import { Data } from "./Inputdata";
function App() {
  // creating state to bind the data
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [id, setId] = useState(0); // 0 because this is a number
  const [isupdate, setIsupdate] = useState(false);
  // UseEffect which will bind the data.
  // useEffect(() => {
  //   setData(Data);
  // }, []);
  // to handle edit
  const handleEdit = (uniqueId) => {
    console.log("unique id", uniqueId);
    const { Todo, id } = data.find((item) => item.id === uniqueId);
    if (Todo) {
      setIsupdate(true);
      setId(id);
      setTodo(Todo);
    }
  };
  // to handle delete
  const handleDelete = (id) => {
    if (id >= 0) {
      const dt = data.filter((item) => item.id !== id); //will filter out the complete table and will return the table except the id we wanted to delete
      setData(dt);
    }
  };
  // to handlesave
  const handleSave = (e) => {
    let error = "";
    if (todo === "") error += "Todo cannot be blank";

    if (error === "") {
      e.preventDefault(); //to prevent all other events
      const dt = [...data];
      const newobject = {
        id: data.length + 1,
        Todo: todo,
      };
      dt.push(newobject);
      setData(dt);
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].Todo = todo;

    setData(dt);
    handleClear();
  };
  // to handleclear
  const handleClear = () => {
    setId(0);
    setTodo("");
    setIsupdate(false);
  };
  return (
    <div className="main-div">
      <h1 className="p-4 m-8 text-center text-pretty text-white font-bold text-4xl ">Write your to-do's here.</h1>
      <div className="flex justify-center items-center m-10">
        <div className="mr-2">
          <label>
            <input
              className="border p-2 rounded-lg w-full bg-gray-100 focus:border-blue-500 focus:outline-none text-lg"
              type="text"
              placeholder="Enter your today_s task"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              value={todo}
            />
          </label>
        </div>
        <div>
          {!isupdate ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={(e) => handleSave(e)}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          )}

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      {data.length>0 && (
        <table className=" bg-white border border-gray-200 mx-auto border-collapse">
          <thead>
            <tr>
              <td className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Sr.No.
              </td>
              {/* <td className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Id
            </td> */}
              <td className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Todo
              </td>
              <td className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Actions
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr className="hover:bg-gray-100" key={index}>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  {/* <td className="px-6 py-4 border-b border-gray-200">
                  {item.id}
                </td> */}
                  <td className="px-6 py-4 border-b border-gray-200">
                    {item.Todo}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
