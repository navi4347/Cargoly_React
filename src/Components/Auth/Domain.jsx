import DomainLogin from '../Domain/DomainLogin';
import '../Style.css'; 

const Domain = () => {
  return (
    <div>
    <div className='Domain'>
      <div className='dleft'></div>
      <div className='dright'> 
      <DomainLogin />
      </div>
      </div>
      </div>
  )
}

export default Domain