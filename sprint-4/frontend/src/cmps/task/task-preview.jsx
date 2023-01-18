import { useEffect, useState } from "react";
import { TaskService } from "../../services/task.service";
import { DatePicker } from "./date-picker";
import { MemberPicker } from "./member-picker";
import { PriorityPicker } from "./priority-picker";
import { StatusPicker } from "./status-picker";

export function TaskPreview({ task }) {
    //GET FROM STORE
    const cmpsOrder = [
        "member-picker",
        "status-picker",
        "date-picker",
        "priority-picker",
    ]


    function updateTask(cmpType, data) {
        // Switch by cmpType
        // task.members = data
        // task.status = data

        // dispatch to store: updateTask(task, activity)
    }
    return (
        <section className="task-preview">
            <input type="checkbox" />
            <div className="task-title picker">
                <span>{task.title}</span>
            </div>
            {cmpsOrder.map((cmp, idx) => {
                return (
                    <DynamicCmp
                        cmp={cmp}
                        key={idx}
                        info={task}
                        onUpdate={(data) => {
                            console.log("Updating: ", cmp, "with data:", data)
                            // make a copy, update the task
                            // Call action: updateTask(task)
                        }}
                    />
                );
            })}
        </section>
    );
}

function DynamicCmp({ cmp, info, onUpdate }) {
    switch (cmp) {
        case "status-picker":
            return <StatusPicker info={info} onUpdate={onUpdate} />
        case "member-picker":
            return <MemberPicker info={info} onUpdate={onUpdate} />
        case "date-picker":
            return <DatePicker info={info} onUpdate={onUpdate} />
        case "priority-picker":
            return <PriorityPicker info={info} onUpdate={onUpdate} />
        default:
            return <p>UNKNOWN {cmp}</p>;
    }
}