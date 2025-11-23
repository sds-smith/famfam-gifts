
import Link from '@mui/material/Link';
import ItemCardBase from './ItemCardBase';
import {useSortable} from '@dnd-kit/sortable';

export default function ItemCard({item}) {
  const {
    setNodeRef,
  } = useSortable({id: item?.id});

  if (!item) return null;
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