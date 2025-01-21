import React, { useRef, useState, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
    const [todoList, setTodoList] = useState(
        localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    );

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === '') {
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggle = (id) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className="bg-white place-self-center rounded-xl p-7 w-11/12 max-w-md flex flex-col min-h-[550px] shadow-lg">
            {/* Header */}
            <div className="flex items-center mt-7 gap-5">
                <img className="w-9" src={todo_icon} alt="Todo Icon" />
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>

            {/* Input Field */}
            <div className="flex flex-wrap items-center my-7 rounded-full p-2 gap-2 ">
                <input
                    ref={inputRef}
                    className="border-0 rounded-full outline-double outline-gray-400 h-14 px-4 flex-1 placeholder:text-slate-600 min-w-[150px]"
                    type="text"
                    placeholder="Add your Task"
                />
                <button
                    onClick={add}
                    className="border-none bg-orange-600 h-14 px-6 text-lg font-medium rounded-full text-white cursor-pointer hover:bg-orange-700 flex-shrink-0"
                >
                    Add +
                </button>
            </div>


            {/* Todo List */}
            <div>
                {todoList.map((item, index) => (
                    <TodoItems
                        key={index}
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
