import React, { useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { setDynamicModalObj } from '../../store/board.actions';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export function LabelChart ({ board, dynamicModalObj }) {
  const elModalBtn = useRef()
  const [chartType, setChartType] = useState('pie')
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

      function onToggleTypeModal() {
        const isOpen = dynamicModalObj.chartType === 'label' && dynamicModalObj?.type === 'chart-type' ? !dynamicModalObj.isOpen : true
        const { x, y } = elModalBtn.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 110), y: (y + 20) }, type: 'chart-type', chartType: 'label', setChartType  })
      }

      function getChart(chartType) {
        switch (chartType) {
          case 'pie':
              return <Pie data={data} />
          case 'bar':
              return <Bar data={data} />
          case 'doughnut':
              return <Doughnut data={data} />
          default: return
        }
      }

    return (
        <section className='label-chart'>
          <div className='chart-header'>
            <div className='header-content'>
              <h2>Chart label</h2>
              <span className='icon-container' ref={elModalBtn} onClick={onToggleTypeModal}>
                <BiDotsHorizontalRounded />
              </span>
            </div>
          </div>
          <div className='chart-content'>
            {getChart(chartType)}
          </div>
        </section>

    )
}