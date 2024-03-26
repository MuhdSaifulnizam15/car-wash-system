import { PaperClipIcon } from '@heroicons/react/20/solid'

import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Header from 'components/Header'

import useAuth from 'hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  console.log('user', user)
;
  return (
    <div>
      <main>
        <Navbar current="Profile" />
        <Header title="Profile" />
        <div className="mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 overflow-auto">
            <div className="mt-10 sm:mt-0 overflow-auto">
              <div className="mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8 bg-white">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Staff Profile
                    </h3>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          First name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {user?.first_name}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Last Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {user?.last_name}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {user?.email}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Role
                        </dt>
                        <dd className="mt-1 text-sm capitalize text-gray-900 sm:col-span-2 sm:mt-0">
                          {user?.role}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Profile