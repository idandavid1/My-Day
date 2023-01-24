// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level, 
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities

// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios

// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task


// <BoardDetails> => <BoardGroup v-for / map>
// <BoardGroup> => <TaskPreview v-for / map>
// <TaskDetails> (supports edit) - initially can be loaded in seperate route 
// (later on we can place it in a modal and nested route)




const activity = {
    "id": makeId(),
    "txt": "Changed Color",
    "createdAt": Date.now(),
    "byMember": userService.getLoggedinUser(),
    "task": task
}

// Store - saveTask
function storeSaveTask(task, activity) {
    
    board = boardService.saveTask(boardId, groupId, task, activity)
    // commit(ACTION) // dispatch(ACTION)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    // return board
    // return task
}


const board = {
    "_id": "b101",
    "title": "Robot dev proj",
    "archivedAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#61bd33"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u102",
            "fullname": "Idan David",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u103",
            "fullname": "Ofek Tarablus",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u104",
            "fullname": "Ofer Tarablus",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that",
                    "archivedAt": 1589983468418,
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "status": "in-progress", // monday
                    "priority": "high", 
                    "description": "description",
                    "memberIds": ["u101", "u102", "u103"],
                    "labelIds": ["l101", "l102"],
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                }
            ],
        }
    ],
    "activities": [
        {
            "id": "a101",
            "action": "status",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            },
            "from": {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            }, 
            "to": {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        }
    ],

    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
}
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{ //optional
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }]
}

// <LabelPicker info={} onUpdate={} />
// <MemberPicker info={} onUpdate={} />
// <DatePicker info={} onUpdate={} />

// <DynamicPicker info={} onUpdate={} >


// For Monday Mostly:
// Dynamic Components: 

// <TaskPreview> => <tr> 
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>
// </tr>

function updateTask(cmpType, data) {
    // Switch by cmpType
    // task.members = data
    // task.status = data

    // dispatch to store: updateTask(task, activity)
}


const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus: 'pending',
        statuses: [{}, {}]
    }
}

const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers: ['m1', 'm2'],
        members: ['m1', 'm2', 'm3']
    }
}

const cmp3 = {
    type: 'date-picker',
    info: {
        selectedDate: '2022-09-07',
    }
}






// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusCmp info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }
