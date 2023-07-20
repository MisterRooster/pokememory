import MemoryCard from './MemoryCard';

export default function CardGrid() {
  const cards = [];
  for (let i = 0; i < 16; i++) {
    cards.push(<MemoryCard key={i} />);
  }

  return (
    <div className='grid grid-cols-cards gap-5'>
      { cards }
    </div>
  );
}