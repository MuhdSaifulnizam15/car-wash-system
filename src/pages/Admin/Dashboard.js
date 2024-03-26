import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Header from 'components/Header'

const Dashboard = () => {
  return (
    <div>
      <div className="min-h-full">
        <Navbar current="Dashboard" />

        <Header />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard;