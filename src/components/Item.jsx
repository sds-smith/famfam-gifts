import {forwardRef} from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const Item = forwardRef(({id, item, ...props}, ref) => {
  return (
    <div style={{touchAction: 'none'}} >
        <DragIndicatorIcon {...props} ref={ref}/>
    </div>
  )
});