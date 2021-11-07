import '../App.css';

const Card = (props: any) => {
  return (
      <div className="card">
        <div className="no-flex-wrapper card-img-wrapper">
          <img className="service-logo" src={props.serviceLogo}></img>
        </div>
        <div className="flex-wrapper flex-stack card-content-wrapper">
          <div className="flex-wrapper">
            <p className="h2">{props.serviceName}</p>
          </div>
          <div className="flex-wrapper">
            <p className="p">{props.serviceDescription}</p>
          </div>
          <div className="flex-wrapper">
            {(function() {
              if (props.status == "connected") {
                return (<button className="cancel button --full-width">- Disconnect</button>)
              } else {
                return (<button className="submit button --full-width">+ Connect</button>)
              }
            })()}
          </div>
        </div>
      </div>
  )
}

export default Card;
