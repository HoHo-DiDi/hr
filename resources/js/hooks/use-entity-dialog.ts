import { useState } from 'react';

type DialogState<T> =
    | { mode: 'create' }
    | { mode: 'edit'; item: T }
    | { mode: 'delete'; item: T }
    | null;
export function useEntityDialog<T>() {
    const [activeState, setActiveState] = useState<DialogState<T>>(null);
    const create = () => setActiveState({ mode: 'create' });
    const edit = (item: T) => setActiveState({ mode: 'edit', item });
    const destroy = (item: T) => setActiveState({ mode: 'delete', item });
    const close = () => setActiveState(null);
    const isOpen = activeState !== null;
    const item =
        activeState && activeState.mode !== 'create' ? activeState.item : null;
    const mode = activeState ? activeState.mode : null;

    return {
        create,
        edit,
        destroy,
        close,
        isOpen,
        item,
        mode,
    };
}
