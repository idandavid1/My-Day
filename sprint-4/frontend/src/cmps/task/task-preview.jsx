



export function TaskPreview({ task }) {
    //GET FROM STORE
    const cmpsOrder = [
        "status-picker",
        "member-picker",
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
        <section>
            <h5>{task.txt}</h5>
            {cmpsOrder.map((cmp, idx) => {
                return (
                    <DynamicCmp
                        cmp={cmp}
                        key={idx}
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
            return <StatusCmp info={info} onUpdate={onUpdate} />
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