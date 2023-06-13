export interface Entry {
    id: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    responsibleIs?: string;
    informerIs: string;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished' | 'deleted';