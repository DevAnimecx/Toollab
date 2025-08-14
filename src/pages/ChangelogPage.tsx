import { useState, useMemo, useEffect } from 'react';
import { changelogData, UpdateCategory } from '@/data/changelog';
import ChangelogCard from '@/components/changelog/ChangelogCard';
import ChangelogSidebar from '@/components/changelog/ChangelogSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Seo from '@/components/Seo';
import { getChangelogReleaseSchema } from '@/lib/schema';

const categories: UpdateCategory[] = ['New', 'Improved', 'Fixed', 'Security'];

const ChangelogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<UpdateCategory[]>([]);
  const [activeVersion, setActiveVersion] = useState(changelogData[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveVersion(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    changelogData.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const filteredChangelog = useMemo(() => {
    return changelogData.filter(entry => {
      const matchesSearch =
        entry.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.intro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.updates.some(update =>
          update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          update.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategories.length === 0 ||
        entry.updates.some(update => selectedCategories.includes(update.category));

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  const toggleCategory = (category: UpdateCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const latestEntry = changelogData[0];
  const schema = getChangelogReleaseSchema(latestEntry);

  return (
    <>
      <Seo
        title="Changelog - Toollab Updates & Releases"
        description="Stay up-to-date with the latest features, improvements, and bug fixes for Toollab. See what's new in our suite of 70+ online tools."
        keywords="toollab changelog, updates, release notes, new features, bug fixes"
        canonicalPath="/changelog"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Toollab Changelog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            All the latest updates, improvements, and new tools.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <aside className="hidden md:block md:col-span-1">
            <ChangelogSidebar entries={changelogData} activeVersion={activeVersion} />
          </aside>

          <main className="md:col-span-3 space-y-8">
            <div className="sticky top-16 bg-background/80 backdrop-blur-lg z-40 py-4 rounded-lg">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search updates..."
                  className="pl-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategories.includes(cat) ? 'default' : 'secondary'}
                    onClick={() => toggleCategory(cat)}
                    size="sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              {filteredChangelog.map(entry => (
                <ChangelogCard key={entry.id} entry={entry} />
              ))}
              {filteredChangelog.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No updates found matching your criteria.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ChangelogPage;