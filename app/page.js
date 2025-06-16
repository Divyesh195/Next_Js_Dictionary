import AddWord from "@/components/AddWord";
import SearchBar from "@/components/Searchbar";
import WordsList from "@/components/WordList";


export default function Home() {
  return (
    <div className=" h-screen p-0 m-0 ">
      <SearchBar />
      <AddWord />
      <WordsList />
    </div>
  );
}
