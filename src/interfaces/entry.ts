export interface Entry {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    responsibleIs?: string;
    informerIs: string;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';