
import ItemCardBase from './ItemCardBase';

export default function ItemCard({item}) {

  return (
    <>
      { item.url 
        ? (
            <ItemCardBase
              item={item}
            />
        ) : (
          <ItemCardBase
            item={item}
          />
        )}
    </>
  )
}