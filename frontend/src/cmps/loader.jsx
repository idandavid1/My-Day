const loader = require('../assets/img/loader.gif')

export function Loader() {


  return <div className="loader-container">
    <img className="loader" src={loader} alt="Loading..." />
  </div>
}