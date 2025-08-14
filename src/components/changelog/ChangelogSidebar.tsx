import { ChangelogEntry } from '@/data/changelog';

interface ChangelogSidebarProps {
  entries: ChangelogEntry[];
  activeVersion: string;
}

const ChangelogSidebar = ({ entries, activeVersion }: ChangelogSidebarProps) => {
  return (
    <nav className="sticky top-24 h-fit w-full">
      <h3 className="font-heading text-lg font-semibold mb-4">Releases</h3>
      <ul className="space-y-2">
        {entries.map(entry => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                activeVersion === entry.id
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-white'
              }`}
            >
              {entry.version}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ChangelogSidebar;