export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm font-bold text-green-600 pt-2">Team Name</p>
        <h1 className="text-2xl font-bold">Manage team</h1>
        <br></br>
          <button className="px-4 py-2 rounded-md bg-green-600 text-white font-medium">
        Add Teammates
      </button>
      </div>
    </div>
  );
}
