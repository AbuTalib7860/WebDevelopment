import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS=()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd= () =>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }

  const toggleFinished=()=>{
    setFinished(!finished)
  }

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo);

    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete=(e, id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value);
  }

  const handleCheckBox = (e) => { 
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id ===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
   }

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto rounded-xl my-5 p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl">Todos - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Add A Todo</h2>
          <div className="flex gap-5">
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1"/>
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 p-5 py-2 font-bold text-sm text-white rounded-full">
            Add
          </button>
          </div>
        </div>
        <input id="show" className="my-4" onChange={toggleFinished} type="checkbox" checked={finished} /> 
        <label className="mx-2" htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-35 w-[90%] mx-auto my-3"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Todos to display</div>}
          {todos.map(item=>{

          return (finished || !item.isCompleted) && <div className="todo flex justify-between my-3" key={item.id}>
            <div className="flex gap-5">
            <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>
              {item.todo}
            </div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 font-bold text-sm text-white rounded-md mx-1">Edit</button>
              <button onClick={(e)=>handleDelete(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 font-bold text-sm text-white rounded-md mx-1">Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
