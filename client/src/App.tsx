import { NotesProvider } from './context/NotesContext';
import { AppLayout } from './components/layout/AppLayout';
import { Sidebar } from './components/sidebar/Sidebar';
import { NoteEditor } from './components/editor/NoteEditor';

export function App() {
  return (
    <NotesProvider>
      <AppLayout sidebar={<Sidebar />}>
        <NoteEditor />
      </AppLayout>
    </NotesProvider>
  );
}
