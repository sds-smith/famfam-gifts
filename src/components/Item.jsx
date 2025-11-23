import {forwardRef} from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Link from '@mui/material/Link';
import ItemCard from './ItemCard';

export const Item = forwardRef(({id, item, ...props}, ref) => {
  return (
    <div >
        <DragIndicatorIcon {...props} ref={ref}/>
    </div>
  )
});