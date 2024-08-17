
import { LinkBox } from '@chakra-ui/react';
import ItemCardBase from './ItemCardBase';

export default function ItemCard({item}) {

  return (
    <>
      { item.url 
        ? (
          <LinkBox>
            <ItemCardBase
              item={item}
            />
          </LinkBox>
        ) : (
          <ItemCardBase
            item={item}
          />
        )}
    </>
  )
}