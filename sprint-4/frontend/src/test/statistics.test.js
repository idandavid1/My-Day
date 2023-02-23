import { render, screen } from '@testing-library/react'
import { StatisticGroup } from '../cmps/board/statistics-group'

describe('StatisticGroup', () => {
    const mockBoard = {
        "_id": "b101",
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#00c875"
            },
            {
                "id": "l102",
                "title": "Progress",
            "color": "#fdab3d"
        },
        {
            "id": "l103",
            "title": "Stuck",
            "color": "#e2445c"
        },
        {
            "id": "l104",
            "title": "Low",
            "color": "#ffcb00"
        },
        {
            "id": "l105",
            "title": "Medium",
            "color": "#a25ddc"
        },
        {
            "id": "l106",
            "title": "High",
            "color": "#e2445c"
        },
        {
            "id": "l107",
            "title": "",
            "color": "#c4c4c4"
        },
    ],
    "members": [
        {
            "id": "m101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673788222/cld-sample.jpg"
        },
    ],
    "groups": [{
        "id": "g101",
        "title": "Group 1",
        "archivedAt": 1589983468418,
        "tasks": [
            {
                "id": "c101",
                "title": "Replace logo",
                "status": "Stuck",
                "priority": "Medium",
                "memberIds": ["m101", "m102", "m103"],
                "dueDate": 1615621,
                "number": 10,
            },
            {
                "id": "c102",
                "title": "Add Samples",
                "status": "Done",
                "priority": "Low",
                "memberIds": ["m101"],
                "dueDate": 16156211111,
                "number": 20,
            },
        ],
        "color": '#66ccff'
        },
        ],
        "activities": [],
        "cmpsOrder": ["member-picker", "status-picker", "date-picker", 'priority-picker']
    }
    const {getStatistics} = render(<StatisticGroup cmpType={'number-picker'} group={mockBoard.groups[0]} board={mockBoard} />)

    console.log(getStatistics)
    expect(getStatistics).toBe(30)
    // const divWrapper = screen.getByTestId("div");
    // expect(findByTestId.caller).toBe(" 30sum");
    // expect(findByTestId('text-grid-item')).toHaveTextContent('test table dat')

        // expect(getByText('text passed as prop')).toBeDefined()
    // const divWrapper = screen.getByRole('div')
    // expect(screen.getByText(divWrapper, '30')).toBeTruthy()
    
    // it('test number statistic', () => {
    //     const {container} = render(<StatisticGroup cmpType={'number-picker'} group={mockBoard.groups[0]} board={mockBoard} />)
    //     expect(container.querySelector('.number')).toHaveTextContent('30')
    // })
    
    // it('test status statistic', () => {
    //     const {container} = render(<StatisticGroup cmpType={'status-picker'} group={mockBoard.groups[0]} board={mockBoard} />)
    //     expect(container.querySelectorAll('span').length).toEqual(2)
    // })
})


