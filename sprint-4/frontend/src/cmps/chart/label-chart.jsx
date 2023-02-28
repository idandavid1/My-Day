import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


export function LabelChart ({ board }) {

    const data = {
        labels: getLabelTitles(),
        datasets: [
          {
            label: 'board labels',
            data: getData(),
            backgroundColor: getLabelColors(),
            borderColor: getLabelColors(),
            borderWidth: 1,
          },
        ],
      }

      function getLabelTitles() {
        return board.labels.map(label => {
            if(label.title) return label.title
            return 'empty'
        })
      }

      function getLabelColors() {
        return board.labels.map(label => label.color)
      }

      function getData() {
        const labelTitles =board.labels.map(label => label.title)
        const data = new Array(labelTitles.length).fill(0)
        board.groups.forEach(group => group.tasks.forEach(task => {
            data[labelTitles.indexOf(task.status)]++
            data[labelTitles.indexOf(task.priority)]++
        }))

        return data
      }

    return (
        <section className='label-chart'>
            <Pie data={data} />
        </section>
    )
}