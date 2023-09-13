import React, { useState } from 'react';
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './RightPanel.module.scss';

function RightPanel() {
    const [todoTasks, setTodoTasks] = useState([{
        uuid: crypto.randomUUID(),
        title: "Design - App",
        desc: "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern",
    },]);
    const [inProgressTasks, setInProgressTasks] = useState([{
        uuid: crypto.randomUUID(),
        title: "Frontend",
        desc: "As a Content Annotator, I should be able add tags in colleges, So that colleges can improve",
    }, {
        uuid: crypto.randomUUID(),
        title: "Backend",
        desc: "Create API for search colleges, exams, scholarships, career_pathways",
    }]);
    const [completedTasks, setCompletedTasks] = useState([{
        uuid: crypto.randomUUID(),
        title: "ToDo Application",
        desc: "A web based application to track progress of different tasks",
    }]);
    const [draggedTask, setDraggedTask] = useState({});
    const defaultTitle = "Give your task a title";
    const defaultDesc = "Description...";

    const onTitleChangeHandler = (taskList, index, newTitle) => {
        if (taskList === "todo") {
            const tempTodo = JSON.parse(JSON.stringify(todoTasks));
            tempTodo[index].title = newTitle.trim() === "" ? defaultTitle : newTitle.trim();
            setTodoTasks(tempTodo);
            toast.success("Title updated!");
        } else if (taskList === "inProgress") {
            const tempInProg = JSON.parse(JSON.stringify(inProgressTasks));
            tempInProg[index].title = newTitle.trim();
            setInProgressTasks(tempInProg);
            toast.success("Title updated!");
        } else if (taskList === "completed") {
            const tempComp = JSON.parse(JSON.stringify(completedTasks));
            tempComp[index].title = newTitle.trim();
            setCompletedTasks(tempComp); 
            toast.success("Title updated!");
        } else {
            toast.error("Error updating title.");
        }
    }

    const onTitleFocusHandler = (event) => {
        if (event.target.innerHTML === defaultTitle) {
            event.target.innerHTML = "";
        }
    }

    const onAddTaskHandler = (taskList) => {
        if (taskList === "todo") {
            const tempTodo = JSON.parse(JSON.stringify(todoTasks));
            tempTodo.unshift({
                uuid: crypto.randomUUID(),
                title: "",
                desc: "",
            });
            setTodoTasks(tempTodo);
            toast.success("New task added under To-Do!");
        } else if (taskList === "inProgress") {
            const tempInProg = JSON.parse(JSON.stringify(inProgressTasks));
            tempInProg.unshift({
                uuid: crypto.randomUUID(),
                title: "",
                desc: "",
            });
            setInProgressTasks(tempInProg);
            toast.success("New task added under In-Progress!");
        } else if (taskList === "completed") {
            const tempComp = JSON.parse(JSON.stringify(completedTasks));
            tempComp.unshift({
                uuid: crypto.randomUUID(),
                title: "",
                desc: "",
            });
            setCompletedTasks(tempComp);
            toast.success("New task added under Completed!");
        } else {
            toast.error("Error while adding new task.");
        }
    }

    const onDescChangeHandler = (taskList, index, newDesc) => {
        if (taskList === "todo") {
            const tempTodo = JSON.parse(JSON.stringify(todoTasks));
            tempTodo[index].desc = newDesc.trim();
            setTodoTasks(tempTodo);
            toast.success("Task description updated!");
        } else if (taskList === "inProgress") {
            const tempInProg = JSON.parse(JSON.stringify(inProgressTasks));
            tempInProg[index].desc = newDesc.trim();
            setInProgressTasks(tempInProg);
            toast.success("Task description updated!");
        } else if (taskList === "completed") {
            const tempComp = JSON.parse(JSON.stringify(completedTasks));
            tempComp[index].desc = newDesc.trim();
            setCompletedTasks(tempComp);
            toast.success("Task description updated!");
        } else {
            toast.error("Error in updating task description.");
        }
    }

    const onDescFocusHandler = (event) => {
        if (event.target.innerHTML === defaultDesc) {
            event.target.innerHTML = "";
        }
    }

    const onTodoDragHandler = (e, task) => {
        e.dataTransfer.setData("todo", task.uuid);
        setDraggedTask(task);
    }

    const onInProgressDragHandler = (e, task) => {
        e.dataTransfer.setData("inProgress", task.uuid);
        setDraggedTask(task);
    }

    const onCompletedDragHandler = (e, task) => {
        e.dataTransfer.setData("completed", task.uuid);
        setDraggedTask(task);
    }

    const onToDoDropHandler = (e) => {
        if (draggedTask.uuid === e.dataTransfer.getData("inProgress")) {
            setInProgressTasks(prev => prev.filter(item => item.uuid !== draggedTask.uuid));
            const tempTodo = JSON.parse(JSON.stringify(todoTasks));
            tempTodo.unshift(draggedTask);
            setTodoTasks(tempTodo);
            setDraggedTask({});
            toast.success("Task added under To-Do!");
        } else if (draggedTask.uuid === e.dataTransfer.getData("completed")) {
            setCompletedTasks(prev => prev.filter(item => item.uuid !== draggedTask.uuid));
            const tempTodo = JSON.parse(JSON.stringify(todoTasks));
            tempTodo.unshift(draggedTask);
            setTodoTasks(tempTodo);
            setDraggedTask({});
            toast.success("Task added under To-Do!");
        }
    }

    const onInProgressDropHandler = (e) => {
        if (draggedTask.uuid === e.dataTransfer.getData("todo")) {
            setTodoTasks(prev => prev.filter(item => item.uuid !== draggedTask.uuid));
            const tempInProg = JSON.parse(JSON.stringify(inProgressTasks));
            tempInProg.unshift(draggedTask);
            setInProgressTasks(tempInProg);
            setDraggedTask({});
            toast.success("Task added under In-Progress!");
        } else if (draggedTask.uuid === e.dataTransfer.getData("completed")) {
            setCompletedTasks(prev => prev.filter(item => item.uuid !== draggedTask.uuid));
            const tempInProg = JSON.parse(JSON.stringify(inProgressTasks));
            tempInProg.unshift(draggedTask);
            setInProgressTasks(tempInProg);
            setDraggedTask({});
            toast.success("Task added under In-Progress!");
        }
    }

    const onCompletedDropHandler = (e) => {
        if (draggedTask.uuid === e.dataTransfer.getData("inProgress")) {
            setInProgressTasks(prev => prev.filter(item => item.uuid !== draggedTask.uuid));
            const tempComp = JSON.parse(JSON.stringify(completedTasks));
            tempComp.unshift(draggedTask);
            setCompletedTasks(tempComp);
            setDraggedTask({});
            toast.success("Task added under Completed!");
        } else if (draggedTask.uuid === e.dataTransfer.getData("todo")) {
            setTodoTasks(prev => prev.filter(item => item.uuid !== draggedTask.uuid));
            const tempComp = JSON.parse(JSON.stringify(completedTasks));
            tempComp.unshift(draggedTask);
            setCompletedTasks(tempComp);
            setDraggedTask({});
            toast.success("Task added under Completed!");
        }
    }

    return (
        <div className={styles["wrapper-container"]}>
            <ToastContainer />
            <div className={styles["header-container"]} >
                <div className={styles["heading-projects"]}>
                    Projects
                </div>
                <div className={styles["filter-img-text-container"]} >
                    <span>
                        <Image src="/filter.svg" alt="add task logo" width={20} height={20} />
                    </span>
                    <span className={styles["heading-filter"]}>
                        Filter
                    </span>
                </div>
            </div>
            <div className={styles["task-container"]}>
                <div
                    className={styles["task-status-container"]}
                    droppable
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => { onToDoDropHandler(e); }}
                >
                    <div className={styles["status-count-container"]}>
                        <span className={styles["status-heading"]} >
                            To Do
                        </span>
                        <div className={styles["count-number"]} >
                            {todoTasks?.length}
                        </div>
                    </div>
                    <button
                        className={styles["add-new-button"]}
                        onClick={() => { onAddTaskHandler("todo") }}
                    >
                        <Image src="/plus.svg" alt="add task logo" width={12} height={12} />
                    </button>
                    {todoTasks.map((task, index) => (
                        <div
                            key={`unique${index}`}
                            className={styles["ind-task-container"]}
                            draggable
                            onDragStart={(e) => { onTodoDragHandler(e, task); }}
                        >
                            <div
                                className={styles["task-title"]}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(event) => { onTitleChangeHandler("todo", index, event?.target?.innerHTML) }}
                                onFocus={(event) => { onTitleFocusHandler(event); }}
                            >
                                {task.title?.length > 0 ? task.title : defaultTitle}
                            </div>
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                className={styles["task-description"]}
                                onBlur={(event) => { onDescChangeHandler("todo", index, event?.target?.innerHTML) }}
                                onFocus={(event) => { onDescFocusHandler(event); }}
                            >
                                {task.desc ? task.desc : defaultDesc}
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={styles["task-status-container"]}
                    droppable
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => { onInProgressDropHandler(e); }}
                >
                    <div className={styles["status-count-container"]}>
                        <span className={styles["status-heading"]} >
                            In Progress
                        </span>
                        <div className={styles["count-number"]} >
                            {inProgressTasks?.length}
                        </div>
                    </div>
                    <button
                        className={styles["add-new-button"]}
                        onClick={() => { onAddTaskHandler("inProgress") }}
                    >
                        <Image src="/plus.svg" alt="add task logo" width={12} height={12} />
                    </button>
                    {inProgressTasks.map((task, index) => (
                        <div
                            key={`unique${index}`}
                            className={styles["ind-task-container"]}
                            draggable
                            onDragStart={(e) => { onInProgressDragHandler(e, task); }}
                        >
                            <div
                                className={styles["task-title"]}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(event) => { onTitleChangeHandler("inProgress", index, event?.target?.innerHTML) }}
                                onFocus={(event) => { onTitleFocusHandler(event); }}
                            >
                                {task.title ? task.title : defaultTitle}
                            </div>
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                className={styles["task-description"]}
                                onBlur={(event) => { onDescChangeHandler("inProgress", index, event?.target?.innerHTML) }}
                                onFocus={(event) => { onDescFocusHandler(event); }}
                            >
                                {task.desc ? task.desc : defaultDesc}
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={styles["task-status-container"]}
                    droppable
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => { onCompletedDropHandler(e); }}
                >
                    <div className={styles["status-count-container"]}>
                        <span className={styles["status-heading"]} >
                            Completed
                        </span>
                        <div className={styles["count-number"]} >
                            {completedTasks?.length}
                        </div>
                    </div>
                    <button
                        className={styles["add-new-button"]}
                        onClick={() => { onAddTaskHandler("completed") }}
                    >
                        <Image src="/plus.svg" alt="add task logo" width={12} height={12} />
                    </button>
                    {completedTasks.map((task, index) => (
                        <div
                            key={`unique${index}`}
                            className={styles["ind-task-container"]}
                            draggable
                            onDragStart={(e) => { onCompletedDragHandler(e, task); }}
                        >
                            <div
                                className={styles["task-title"]}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(event) => { onTitleChangeHandler("completed", index, event?.target?.innerHTML) }}
                                onFocus={(event) => { onTitleFocusHandler(event); }}
                            >
                                {task.title ? task.title : defaultTitle}
                            </div>
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                className={styles["task-description"]}
                                onBlur={(event) => { onDescChangeHandler("completed", index, event?.target?.innerHTML) }}
                                onFocus={(event) => { onDescFocusHandler(event); }}
                            >
                                {task.desc ? task.desc : defaultDesc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightPanel;
