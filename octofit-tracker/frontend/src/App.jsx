import { Route, Routes } from 'react-router-dom';

function Dashboard() {
  return (
    <main className="container py-5">
      <h1 className="mb-3">OctoFit Tracker</h1>
      <p className="lead mb-0">Your activity, teams, and progress in one place.</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}