import { render, screen } from '@testing-library/react';
import Todo from '../Todos/Todo';

test('renders content and finds it', () => {
  const todo = {
    _id: '1',
    text: 'Test Todo',
    done: false,
  };

  render(
    <Todo
      todo={todo}
      onClickComplete={() => console.log('clicked complete')}
      onClickDelete={() => console.log('cliked delete')}
    />
  );

  const text = screen.getByText('Test Todo');
  expect(text).toBeDefined();

  const button = screen.getByText('Delete');
  expect(button).toBeDefined();
});
