'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Memo, CreateMemoInput, UpdateMemoInput } from '@/lib/types';

export function useMemos() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemos = useCallback(async () => {
    const { data, error } = await supabase
      .from('cm_memos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setMemos(data as Memo[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMemos();

    const channel = supabase
      .channel('cm_memos_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'cm_memos' },
        (payload) => {
          setMemos((prev) => {
            if (prev.some((m) => m.id === (payload.new as Memo).id)) return prev;
            return [payload.new as Memo, ...prev];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'cm_memos' },
        (payload) => {
          setMemos((prev) =>
            prev.map((m) => (m.id === payload.new.id ? (payload.new as Memo) : m))
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'cm_memos' },
        (payload) => {
          setMemos((prev) => prev.filter((m) => m.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMemos]);

  const createMemo = async (input: CreateMemoInput, authorName: string) => {
    const { data, error } = await supabase.from('cm_memos').insert({
      ...input,
      author_name: authorName,
    }).select().single();
    if (error) throw new Error(error.message);
    if (data) setMemos((prev) => [data as Memo, ...prev]);
  };

  const updateMemo = async (id: string, input: UpdateMemoInput) => {
    const { data, error } = await supabase
      .from('cm_memos')
      .update(input)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (data) setMemos((prev) => prev.map((m) => (m.id === id ? (data as Memo) : m)));
  };

  const deleteMemo = async (id: string) => {
    const { error } = await supabase.from('cm_memos').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setMemos((prev) => prev.filter((m) => m.id !== id));
  };

  return { memos, loading, error, createMemo, updateMemo, deleteMemo };
}
