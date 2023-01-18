

export function StatusPicker({ info, onUpdate}) {
    const label = info.labels.find(label => label.title === info.status)
    const color = label.color ? label.color : 'blue'
    return <section className="status-picker" style={{backgroundColor: color}}>
        <div>{info.status}</div>
    </section>
}