import { useEffect, useState } from 'react';
import api from '../api/api';

let cachedSettings: any = null;
let pendingPromise: Promise<any> | null = null;

export default function useSettings() {
  const [settings, setSettings] = useState<any>(cachedSettings);
  const [loading, setLoading] = useState<boolean>(!cachedSettings);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (cachedSettings) return;

    if (pendingPromise) {
      setLoading(true);
      pendingPromise
        .then((s) => {
          setSettings(s);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          console.error('useSettings:', err);
        });
      return;
    }

    setLoading(true);
    pendingPromise = api
      .get('/settings')
      .then((res) => {
        const s = res?.data?.settings ?? null;
        cachedSettings = s;
        setSettings(s);
        setLoading(false);
        pendingPromise = null;
        return s;
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        pendingPromise = null;
        console.error('useSettings:', err);
        return null;
      });
  }, []);

  return { settings, loading, error } as const;
}
