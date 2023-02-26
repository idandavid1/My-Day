export function StatisticGroup({ cmpType, group, board }) {
    function getStatisticsStatus(cmp) {
        const labels = group.tasks.map(task => {
            return board.labels.find(label => label.title === task[cmp])
        })
        const mapLabel = labels.reduce((acc, label) => {
            if (acc[label.color]) acc[label.color]++
            else acc[label.color] = 1
            return acc
        }, {})
        const result = []
        for (let key in mapLabel) {
            result.push({ background: key, width: `${mapLabel[key] / labels.length * 100}%` })
        }
        return result
    }

    function getStatisticsNumber() {
        const sumOfNumbers = group.tasks.reduce((acc, task) => {
            if (task.number) return acc + task.number
            return acc
        }, 0)
        return sumOfNumbers
    }

    function getStatisticsResult() {
        switch (cmpType) {
            case 'member-picker':
                return []
            case 'status-picker':
                return <GetStatisticsLabel statisticLabels={getStatisticsStatus('status')} />
            case 'priority-picker':
                return <GetStatisticsLabel statisticLabels={getStatisticsStatus('priority')} />
            case 'date-picker':
                return []
            case 'number-picker':
                return <GetStatisticsNumber statisticNumber={getStatisticsNumber()} />
            default: return []
        }
    }
    return (
        <>
            {getStatisticsResult()}
        </>
    )
}

function GetStatisticsLabel({ statisticLabels }) {
    return (
        statisticLabels.map((label, idx) => {
            return <span key={idx} style={label} ></span>
        })
    )
}

function GetStatisticsNumber({ statisticNumber }) {
    return (
        <div className="statistic-number flex column align-center">
            <span className="number">{statisticNumber}</span>
            <span className="sum">sum</span>
        </div>
    )
}