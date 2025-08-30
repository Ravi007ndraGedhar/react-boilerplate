import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/store/slice/todosSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Pencil, Trash2, Plus } from 'lucide-react';

export function Todos() {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.todo);
    const [title, setTitle] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAdd = () => {
        if (title.trim()) {
            if (editingId) {
                dispatch(updateTodo({ id: editingId, title }));
                setEditingId(null);
            } else {
                dispatch(addTodo(title));
            }
            setTitle('');
        }
    };

    const handleEdit = (id: number, currentTitle: string) => {
        setEditingId(id);
        setTitle(currentTitle);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Todo List</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-2">
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo"
                    />
                    <Button onClick={handleAdd} className="flex items-center gap-2">
                        {editingId ? (
                            <>
                                <Pencil size={16} /> Update
                            </>
                        ) : (
                            <>
                                <Plus size={16} /> Add
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Status */}
            {status === 'loading' && (
                <div className="flex justify-center">
                    <Loader2 className="animate-spin w-6 h-6" />
                </div>
            )}
            {status === 'failed' && <p className="text-red-500">{error}</p>}

            {/* Todo Items */}
            <div className="space-y-3">
                {items.map((todo) => (
                    <Card key={todo.id} className="flex items-center justify-between p-3">
                        <span className="text-lg">{todo.title}</span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(todo.id, todo.title)}
                                className="flex items-center gap-1"
                            >
                                <Pencil size={16} />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => dispatch(deleteTodo(todo.id))}
                                className="flex items-center gap-1"
                            >
                                <Trash2 size={16} />
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

