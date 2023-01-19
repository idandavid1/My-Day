
export const groupService = {
    getEmptyGroup
}

function getEmptyGroup() {
    return {
        "title": 'New Group',
        "archivedAt": Date.now(),
        "tasks": [],
        "color":'#ffcb00'
    }
}

