export type SavedWorkspaceAgent = {
  id: string;
  name: string;
  description: string;
  avatarId: string;
};

// Browser storage is untrusted. Restore only valid records and known local avatars.
export function parseWorkspaceAgents(
  raw: string | null,
  avatarIds: string[],
): SavedWorkspaceAgent[] {
  if (!raw) return [];
  try {
    const records: unknown = JSON.parse(raw);
    if (!Array.isArray(records)) return [];
    const seen = new Set(avatarIds);
    return records.filter((record): record is SavedWorkspaceAgent => {
      if (!record || typeof record !== "object") return false;
      const { id, name, description, avatarId } = record;
      if (
        typeof id !== "string" ||
        !id ||
        id.length > 100 ||
        seen.has(id) ||
        typeof name !== "string" ||
        !name.trim() ||
        name.length > 100 ||
        typeof description !== "string" ||
        description.length > 1000 ||
        typeof avatarId !== "string" ||
        !avatarIds.includes(avatarId)
      )
        return false;
      seen.add(id);
      return true;
    });
  } catch {
    return [];
  }
}
