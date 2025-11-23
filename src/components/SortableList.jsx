import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ItemCard from './ItemCard';
import { Item } from "./Item";

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

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    // function handleDragStart(event) {
    //   const {active} = event;

    //   setActiveId(active.id);
    // }

    function handleDragEnd(event) {
      const {active, over} = event;

      if (active.id !== over.id) {
        setPrioritized((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }

    //   setActiveId(null);
    }

    useEffect(() => console.log('[SortableList]',{prioritized}),[prioritized])

    useEffect(() => {
        if (!!items) setPrioritized(items.slice(0,3).map(({id})=>id))
    }, [items])

    return (
        <div style={{marginTop: '2rem'}}>
            <Typography variant="h5">{category}</Typography>
            <Stack spacing={4} align='start'>
                    <DndContext 
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        // onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext 
                          items={prioritized}
                          strategy={verticalListSortingStrategy}
                        >
                            <Stack spacing={4}>
                                { prioritized?.map(id => (
                                    <ItemCard key={id} item={items.find(item => item.id === id)} />
                                ))}
                            </Stack>
                        </SortableContext>
                        {/* <DragOverlay>
                          {activeId ? <Item id={activeId} /> : null}
                        </DragOverlay> */}
                    </DndContext>
            </Stack>
        </div>
      )
}
