import { FcPieChart, FcDoughnutChart, FcBarChart } from 'react-icons/fc'
import { setDynamicModalObj } from '../../store/board.actions'

export function ChartTypeModal({ dynamicModalObj }) {

    function onSetChartType(chartType) {
        dynamicModalObj.setChartType(chartType)
        dynamicModalObj.isOpen = false
        setDynamicModalObj({...dynamicModalObj})
    }

    return (
        <section className="chart-type-modal">
            <div onClick={() => onSetChartType('pie')}>
                <FcPieChart />
                <span>Pie</span>
            </div>
            <div onClick={() => onSetChartType('doughnut')}>
                <FcDoughnutChart />
                <span>Doughnut</span>
            </div>
            <div onClick={() => onSetChartType('bar')}>
                <FcBarChart />
                <span>Bar</span>
            </div>
        </section>
    )
}