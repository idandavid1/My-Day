import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { utilService } from '../../services/util.service';
ChartJS.register(ArcElement, Tooltip, Legend);

export function MemberChart ({ board }) {

    const data = {
        labels: getMembersName(),
        datasets: [
          {
            label: 'board members',
            data: getData(),
            backgroundColor: getRandomColors(),
          },
        ],
      }

      function getMembersName() {
        return board.members.map(member => member.fullname)
      }

      function getRandomColors() {
        return board.members.map(() => utilService.getRandomColor())
      }

      function getData() {
        const membersId = board.members.map(member => member._id)
        const data = new Array(membersId.length).fill(0)
        board.groups.forEach(group => group.tasks.forEach(task => task.memberIds.forEach(memberId => {
            data[membersId.indexOf(memberId)]++
        })))

        return data
      }

    return (
        <section className='label-chart'>
            <Pie data={data} />
        </section>
    )
}