'use client';

import { useState } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

export default function Loading() {
  const [loading, setLoading] = useState(true);
  return (
    <PacmanLoader
      className="m-auto"
      color="yellow"
      loading={loading}
      size={25}
    />
  );
}
