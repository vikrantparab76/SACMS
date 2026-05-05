import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderTree as FolderIcon } from 'lucide-react';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { SearchChip } from '@/components/search/SearchChip';
import { Button } from '@/components/ui/button';

const exampleChips = ['AP Stats', 'One-Variable Data', 'Histogram', 'Mean vs Median'];

export default function SearchLanding() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleChipClick = (chip: string) => {
    navigate(`/search?q=${encodeURIComponent(chip)}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Learnosity Assessment Library
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find, preview, and reuse assessments across courses
          </p>
          
          <GlobalSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            size="large"
            className="mb-6"
          />
          
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {exampleChips.map((chip) => (
              <SearchChip
                key={chip}
                label={chip}
                onClick={() => handleChipClick(chip)}
              />
            ))}
          </div>
          
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/browse')}
              className="gap-2"
            >
              <FolderIcon className="w-4 h-4" />
              Browse by Curriculum Structure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
