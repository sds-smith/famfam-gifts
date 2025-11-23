
import Link from '@mui/material/Link';
import ItemCardBase from './ItemCardBase';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Item } from './Item';

export default function ItemCard({item}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: item.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div  ref={setNodeRef} > 
      { item.url 
        ? (
            <Link 
              href={item.url} 
              target='_blank' 
              rel='no-referrer'
              style={{textDecoration: 'none'}}
            >
              <ItemCardBase
                item={item}
              />
            </Link>
        ) : (
          <ItemCardBase
            item={item}
          />
        )}
    </div>
  )
}