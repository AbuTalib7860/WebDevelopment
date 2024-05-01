

export default function Navbar() {
  return (
    <nav className="flex justify-around bg-indigo-900 text-white py-1">
        <div className="logo">
            <span className="font-bold text-xl mx-8">Todo</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
        </ul>
    </nav>
  )
}
