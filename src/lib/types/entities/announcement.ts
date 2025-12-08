export interface AnnouncementAuthor {
  id: number;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  adminRole: string | null;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  images: string[] | null;
  createdById: number;
  createdBy?: AnnouncementAuthor;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface CreateAnnouncementDto {
  title: string;
  description: string;
  images?: string[];
}

export interface UpdateAnnouncementDto {
  title?: string;
  description?: string;
  images?: string[];
}

export interface AnnouncementQueryParams {
  page?: number;
  limit?: number;
}

// UI-friendly announcement format for display components
export interface AnnouncementDisplay {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  createdAt: string;
  title: string;
  body: string;
  image?: string;
}

// Transform API response to display format
export function toAnnouncementDisplay(announcement: Announcement): AnnouncementDisplay {
  const author = announcement.createdBy;
  const authorName = author
    ? `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'Unknown'
    : 'Unknown';

  return {
    id: String(announcement.id),
    author: {
      name: authorName,
      avatar: author?.avatarUrl || undefined,
      role: author?.adminRole || 'Admin',
    },
    createdAt: announcement.createdAt,
    title: announcement.title,
    body: announcement.description,
    image: announcement.images?.[0] || undefined,
  };
}

// Group announcements by admin role
export function groupAnnouncementsByRole(announcements: AnnouncementDisplay[]): Map<string, AnnouncementDisplay[]> {
  const grouped = new Map<string, AnnouncementDisplay[]>();

  for (const announcement of announcements) {
    const role = announcement.author.role;
    if (!grouped.has(role)) {
      grouped.set(role, []);
    }
    grouped.get(role)!.push(announcement);
  }

  return grouped;
}
