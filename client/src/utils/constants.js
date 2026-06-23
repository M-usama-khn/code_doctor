export const PAGE_TITLES = {
  dashboard: 'Dashboard Overview',
  upload: 'Upload Source Code',
  analysis: 'Analysis Center',
  smells: 'Smell Report',
  security: 'Security Analysis',
  complexity: 'Complexity Analysis',
  ai: 'AI Suggestions',
  reports: 'Reports',
  search: 'Search',
  admin: 'Admin Panel',
  profile: 'My Profile',
};

export const NAV_ITEMS = [
  { section: 'Main', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie', path: '/dashboard' },
    { id: 'upload', label: 'Upload Code', icon: 'fa-cloud-arrow-up', path: '/upload' },
    { id: 'analysis', label: 'Analysis', icon: 'fa-chart-bar', path: '/analysis', badge: '3' },
  ]},
  { section: 'Detection', items: [
    { id: 'smells', label: 'Smell Report', icon: 'fa-bug', path: '/smells' },
    { id: 'security', label: 'Security', icon: 'fa-shield-halved', path: '/security' },
    { id: 'complexity', label: 'Complexity', icon: 'fa-wave-square', path: '/complexity' },
    { id: 'ai', label: 'AI Suggestions', icon: 'fa-brain', path: '/ai' },
  ]},
  { section: 'Manage', items: [
    { id: 'reports', label: 'Reports', icon: 'fa-file-lines', path: '/reports' },
    { id: 'search', label: 'Search', icon: 'fa-magnifying-glass', path: '/search' },
    { id: 'admin', label: 'Admin', icon: 'fa-sliders', path: '/admin' },
    { id: 'profile', label: 'Profile', icon: 'fa-user-circle', path: '/profile' },
  ]},
];

export const ALLOWED_EXTENSIONS = ['.py', '.js', '.java'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const LANGUAGES = [
  { id: 'python', label: 'Python (.py)', ext: '.py' },
  { id: 'javascript', label: 'JavaScript (.js)', ext: '.js' },
  { id: 'java', label: 'Java (.java)', ext: '.java' },
];

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
