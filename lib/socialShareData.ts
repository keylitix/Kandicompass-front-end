import { CORE_BACKEND_URL, CORE_FRONTEND_URL } from '@/helper/path';

const getThreadById = async (slug: string) => {
  const res = await fetch(`${CORE_BACKEND_URL}threads/getById/${slug}`);
  return res && res.json();
};

const getBeadById = async (slug: string) => {
  const res = await fetch(`${CORE_BACKEND_URL}beads/getById/${slug}`);
  return res && res.json();
};

export async function getShareContent(
  type: string,
  slug?: string,
  from?: string,
) {
  switch (type) {
    case 'thread': {
      const fetchThread = await getThreadById(slug || '');
      const thread = fetchThread.data[0];
      return {
        title: thread.threadName || 'Untitled Thread',
        description: thread.description || 'No description available.',
        imageURL: thread.qrCode
          ? CORE_BACKEND_URL + thread.qrCode
          : `${CORE_BACKEND_URL}/default-thread.png`,
        link: `${CORE_FRONTEND_URL}dashboard/thread/${slug}`,
      };
    }
    case 'beads': {
      const fetchBead = await getBeadById(slug || '');
      const bead = fetchBead.data[0];
      return {
        title: bead.beadName || 'Untitled Thread',
        description: bead.description || 'No description available.',
        imageURL: bead.qrCode
          ? CORE_BACKEND_URL + bead.qrCode
          : `${CORE_BACKEND_URL}/default-thread.png`,
        link: `${CORE_FRONTEND_URL}dashboard/beads/${slug}`,
      };
    }

    default:
      return {
        title: 'Shared Content',
        description: 'View this shared content.',
        imageURL: `${CORE_BACKEND_URL}/default-share.png`,
        link: CORE_FRONTEND_URL,
      };
  }
}
