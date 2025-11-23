
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ItemCard from './ItemCard';

export default function List({ category, items }) {

    return (
        <div style={{marginTop: '2rem'}}>
            <Typography variant="h5">{category}</Typography>
            <Stack spacing={4} align='start'>
                <Stack spacing={4}>
                    { items?.map(item => (
                        <ItemCard key={item.name} item={item} />
                    ))}
                </Stack>
            </Stack>
        </div>
      )
}
