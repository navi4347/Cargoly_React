import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './AdminStyle.css';

const CarrierBuy = () => {
  return (
    <div className='container'>
<div className="save">
<form>
        <TextField id="standard-basic1" className="data" label="Standard" variant="standard" />
        <TextField id="standard-basic2" className="data" label="Standard" variant="standard" />
        <TextField id="standard-basic3" className="data" label="Standard" variant="standard" />
        <Button variant="contained"  className="data" type="submit">
          Save
        </Button>
        <Button variant="contained"  className="data" color="error">
          Cancel
        </Button>
      </form>
    </div>
    </div>

  );
};

export default CarrierBuy;
