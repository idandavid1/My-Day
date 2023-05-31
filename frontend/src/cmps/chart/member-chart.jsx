import React, { useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { utilService } from '../../services/util.service';
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { setDynamicModalObj } from '../../store/board.actions';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function MemberChart ({ board, dynamicModalObj }) {
  const elModalBtn = useRef()
  const [chartType, setChartType] = useState('pie')
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
        const colorArr = utilService.getColors()
        return board.members.map((_, idx) => colorArr[idx % colorArr.length])
      }

      function getData() {
        const membersId = board.members.map(member => member._id)
        const data = new Array(membersId.length).fill(0)
        board.groups.forEach(group => group.tasks.forEach(task => task.memberIds.forEach(memberId => {
            data[membersId.indexOf(memberId)]++
        })))

        return data
      }

      function onToggleTypeModal() {
        const isOpen = dynamicModalObj.chartType === 'member' && dynamicModalObj?.type === 'chart-type' ? !dynamicModalObj.isOpen : true
        const { x, y } = elModalBtn.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 110), y: (y + 20) }, type: 'chart-type', chartType: 'member', setChartType  })
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
        <section className='member-chart'>
            <div className='chart-header'>
              <div className='header-content'>
                <h2>Chart member</h2>
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