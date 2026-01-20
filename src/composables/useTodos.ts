import { ref } from 'vue';
import type { CategoryUnion } from '../constants/category-options';
import { actions } from 'astro:actions';

export interface TodoItem {
    checked: boolean;
    name: string;
    id: number;
    category: CategoryUnion;
    isClassifying?: boolean;
}

export function useTodos(initialTodos: TodoItem[]) {
    const todos = ref<TodoItem[]>(initialTodos);

    async function addTodo(name: string) {
        if (!name.trim()) {
            return;
        }

        const newTodo: TodoItem = {
            id: Date.now(),
            name: name.trim(),
            checked: false,
            category: 'Other',
            isClassifying: true
        };
        todos.value.push(newTodo);
        const todoId = newTodo.id;

        // Get classification from server
        const { data: classification, error: classifyError } = await actions.classifyItem({ name: newTodo.name });

        // Find the todo in the reactive array to update it
        const todoInArray = todos.value.find(t => t.id === todoId);
        if (todoInArray) {
            if (!classifyError && classification) {
                todoInArray.category = classification;
            }
            todoInArray.isClassifying = false;
        }

        const { error: addTodoError } = await actions.addTodo({
            id: newTodo.id,
            name: newTodo.name,
            category: todoInArray?.category ?? newTodo.category
        });
        if (addTodoError) console.log('Error adding todo:', addTodoError);
    }

    async function handleDelete(id: number) {
        todos.value = todos.value.filter(todo => todo.id !== id);
        const { error } = await actions.deleteTodo({ id });
        if (error) console.log('Error deleting todo:', error);
    }

    async function handleCategoryChanged(id: number, category: CategoryUnion) {
        const todo = todos.value.find(todo => todo.id === id);
        if (!todo) {
            return;
        }
        todo.category = category;
        const { error } = await actions.updateTodoCategory({ id, category });
        if (error) console.log('Error updating todo category:', error);
        const { error: trainError } = await actions.trainClassifier({ name: todo.name, category });
        if (trainError) {
            console.log('Error training classifier:', trainError);
        }
    }

    async function handleCheckChanged(id: number, checked: boolean) {
        const todo = todos.value.find(todo => todo.id === id);
        if (!todo) {
            return;
        }
        todo.checked = checked;
        const { error } = await actions.updateTodoChecked({ id, checked });
        if (error) console.log('Error updating todo checked status:', error);
    }

    async function onClearCompleted() {
        const completedTodoIds = todos.value.filter(todo => todo.checked).map(todo => todo.id);
        todos.value = todos.value.filter(todo => !todo.checked);
        const { error } = await actions.clearCompletedTodos({ ids: completedTodoIds });
        if (error) console.log('Error clearing completed todos:', error);
    }

    return {
        todos,
        addTodo,
        handleDelete,
        handleCategoryChanged,
        handleCheckChanged,
        onClearCompleted
    };
}
