import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ItemCard from './ItemCard';
import { useAuthContext } from "../context/AuthContext";
import { updateUser } from "../utils/firebase.utils";

import {
  DndContext, 
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function SortableList({ category, items, itemsByCategory }) {
    const { currentUser } = useAuthContext();

    const [activeId, setActiveId] = useState(null);
    const [prioritized, setPrioritized] = useState([]);
    const [visible, setVisible] = useState([]);

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    function handleDragStart(event) {
      const {active} = event;

      setActiveId(active.id);
      const ids = category !== 'All Items' ? prioritized.filter(id => itemsByCategory[category].some((item) => `${item.id}` === `${id}`)) : prioritized;
      setVisible(ids.filter(i => `${i}` !== `${active.id}`))
    }

    function handleDragEnd(event) {
      const {active, over} = event;

      if (active.id !== over.id) {
        let sortedIds;
        setPrioritized((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          sortedIds = arrayMove(items, oldIndex, newIndex);
          return sortedIds;
        });
        const sortedItems = sortedIds.map(id => items.find(item => `${item.id}` === `${id}`));
        console.log({sortedItems})
        updateUser(currentUser.uid, sortedItems);
      }

      setActiveId(null);
    }

    useEffect(() => {
        if (!!items) {
            const ids = items.map(({id})=>id)
            setPrioritized(ids);
        }
    }, [items])

    useEffect(() => {
        if (!activeId && !!prioritized) {
            const ids = category !== 'All Items' ? prioritized.filter(id => itemsByCategory[category].some((item) => `${item.id}` === `${id}`)) : prioritized;
            setVisible(ids)
        }
    }, [activeId, prioritized])

    return (
        <div style={{marginTop: '2rem'}}>
            <Typography variant="h5">{category}</Typography>
            <Stack spacing={4} align='start'>
                    <DndContext 
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext 
                          items={prioritized}
                          strategy={verticalListSortingStrategy}
                        >
                            <Stack spacing={4}>
                                { visible?.map(id => (
                                    <ItemCard key={id} item={items.find(item => item.id === id)} />
                                ))}
                            </Stack>
                        </SortableContext>
                        <DragOverlay>
                          {activeId ? <ItemCard id={activeId} item={items.find(item => item.id === activeId)} /> : null}
                        </DragOverlay>
                    </DndContext>
            </Stack>
        </div>
    )
}
