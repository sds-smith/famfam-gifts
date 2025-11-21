
import Link from '@mui/material/Link';
import ItemCardBase from './ItemCardBase';

export default function ItemCard({item}) {

  return (
    <>
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
    </>
  )
}