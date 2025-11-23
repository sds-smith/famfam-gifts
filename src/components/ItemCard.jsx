
import Link from '@mui/material/Link';
import ItemCardBase from './ItemCardBase';
import { Item } from './Item';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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