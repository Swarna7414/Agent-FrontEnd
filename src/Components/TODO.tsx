import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { Task } from "./interfaces";
import { RxCross1 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiUndo } from "react-icons/ci";

const TODO:React.FC=()=>{

    const [tasks,settasks]=useState<Task[]>([]);
    const [input,setinput]=useState<string>("");
    const [editingid,seteditingid]=useState<number | null>(null);
    const [editedtask,seteditedtask]=useState<string>("");


    const Add=()=>{
        if(!input.trim()) return;
        const newobj : Task={
            id:Date.now(),
            task:input,
            completed:false
        }
        settasks(prev=>[...prev,newobj])
        setinput("");
    }

    const Remove = (id:number) =>{
        const updatedtasks=tasks.map(task=> task.id === id ? {...task, completed:!task.completed} : task)
        settasks(updatedtasks);
    }

    const Delete=(id:number)=>{
        const newones:Task[]= tasks.filter(task=> task.id !==id)
        settasks(newones);
    }

    const Edit=(id:number,newtask:string)=>{

        if(!newtask.trim()) return;

        settasks(tasks.map(task=> (task.id === id ? {...task, task:newtask} : task)));
        seteditingid(null)
    }

    return(
        <div className="min-h-screen flex justify-center items-start">
            <div className="bg-gray-200 w-1/2 px-5 py-8 mt-8 rounded-2xl flex flex-col">
                <div className="text-3xl font-semibold flex flex-row items-center justify-center space-x-2">
                    <FaTasks className="mt-1"/>
                    <h1>Task Manager</h1>
                </div>
                <div className="relative mt-5 ml-5">
                    <input type="text" className=" border-2 rounded px-3 py-2 w-150 ml-5" value={input} onChange={(e)=>{setinput(e.target.value)}}/>
                    <button className="text-2xl bg-blue-400 pt-0.5 px-3 py-2 rounded-md ml-3 hover:bg-blue-500 transform ease-in-out duration-300 cursor-pointer" onClick={Add}>+</button>
                </div>
                <div className="mt-13 ml-9 flex flex-col gap-2">
                    {tasks.length === 0 && <p className="ml-45">No tasks to display please add tasks</p>}
                    {tasks.map((item)=>(
                        <div className="border-2 w-165 px-2 py-2 rounded-md flex flex-row justify-between items-center">
                            
                            <p className={`${item.completed ? "line-through text-gray-500" : ""}`}>{item.task}</p>
                            <div className="flex flex-row justify-between items-center gap-4">
                                <p className="cursor-pointer hover:text-blue-600"><FaRegEdit/></p>
                                <p className="cursor-pointer" onClick={()=>Remove(item.id)}>{item.completed ? <CiUndo/> : <RxCross1 className="hover:text-red-500"/>}</p>
                                <p className="cursor-pointer hover:text-red-400" onClick={()=>{Delete(item.id)}}><MdDelete/></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default TODO;