import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ItemCard from './ItemCard';

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

export default function SortableList({ category, items }) {
    // const prioritized = items?.sort((a, b) => (a.priority || 10) - (b.priority || 10))
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
console.log({active})
      setActiveId(active.id);
      setVisible(prioritized.filter(i => `${i}` !== `${active.id}`))
    }

    function handleDragEnd(event) {
      const {active, over} = event;

      if (active.id !== over.id) {
        setPrioritized((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }

      setActiveId(null);
    }

    useEffect(() => console.log('[SortableList]',{prioritized}),[prioritized])
    useEffect(() => console.log('[SortableList]',{visible}),[visible])

    useEffect(() => {
        if (!!items) {
            const ids = items.map(({id})=>id)
            setPrioritized(ids);
        }
    }, [items])

    useEffect(() => {
        if (!activeId && !!prioritized) {
            setVisible(prioritized)
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
