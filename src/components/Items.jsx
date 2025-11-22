
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ItemCard from './ItemCard';

export default function Items({ category, items }) {
    const prioritized = items?.sort((a, b) => (a.priority || 10) - (b.priority || 10))
    return (
        <div style={{marginTop: '2rem'}}>
            <Typography variant="h5">{category}</Typography>
            <Stack spacing={4} align='start'>
                <Stack spacing={4}>
                    { prioritized?.map(item => (
                        <ItemCard key={item.name} item={item} />
                    ))}
                </Stack>
            </Stack>
        </div>
      )
}
