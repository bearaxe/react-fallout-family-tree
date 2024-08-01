import DwellerTable from '@/components/DwellerTable';

export default function Home() {
  return (
    <div class="home">
      <input class="search-bar" v-model="query" type="text" placeholder="Search" />
      <DwellerTable />
    </div>
  );
}
