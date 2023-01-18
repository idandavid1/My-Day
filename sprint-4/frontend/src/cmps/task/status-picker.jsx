

export function StatusPicker({ info, onUpdate}) {
    boards = use
    const label = info.labels.find(label => label.title === info.status)
    const color = label.color ? label.color : 'blue'
    return <section className="status-picker" style={{backgroundColor: color}}>
        <div>{info.status}</div>
    </section>
}