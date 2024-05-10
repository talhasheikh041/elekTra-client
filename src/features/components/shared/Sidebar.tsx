import { ArrowLeftRight, BarChart3, Coins, LayoutDashboardIcon, LineChart, PieChart, Puzzle, ShoppingBag, Timer, Users } from 'lucide-react'

const Sidebar = () => {
   return (
      <div className='flex flex-col min-w-64 bg-white p-4 custom-scroll'>
         <h1 className='text-4xl font-bold'>Logo.</h1>
         <div className='mt-6'>
            <p className='tracking-[3px] uppercase text-gray-500 text-sm'>Dashboard</p>
            <ul className='mt-3 ps-3'>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <LayoutDashboardIcon size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Dashboard</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <ShoppingBag size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Product</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <Users size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Customers</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <ArrowLeftRight size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Transaction</a>
               </li>
            </ul>
         </div>

         <div className='mt-6'>
            <p className='tracking-[3px] uppercase text-gray-500 text-sm'>Charts</p>
            <ul className='mt-3 ps-3'>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <BarChart3 size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Bar</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <PieChart size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Pie</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <LineChart size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Line</a>
               </li>
            </ul>
         </div>

         <div className='mt-6'>
            <p className='tracking-[3px] uppercase text-gray-500 text-sm'>Apps</p>
            <ul className='mt-3 ps-3'>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <Timer size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Stopwatch</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <Puzzle size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Coupon</a>
               </li>
               <li className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'>
                  <span>
                     <Coins size='18px' color='black' />
                  </span>
                  <a className='tracking-wide'>Toss</a>
               </li>
            </ul>
         </div>
      </div>
   )
}
export default Sidebar
