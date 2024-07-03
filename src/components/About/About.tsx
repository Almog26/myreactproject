export const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="max-w-3xl bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">About Our Service</h2>
        <p className="mb-4">
          Welcome to our business! We provide a platform where users can register, create, and manage their own cards. Our service allows users to easily display and manage their business cards, providing a convenient way to showcase their services and contact information.
        </p>
        <h3 className="text-2xl font-semibold mb-4">User Registration</h3>
        <p className="mb-4">
          Users can register on our platform by providing their basic information such as email and password. Once registered, users can log in to access their personalized dashboard.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Displaying Cards</h3>
        <p className="mb-4">
          After logging in, users can create and manage their business cards. The cards are stored on our server and displayed in a responsive and user-friendly format. Users can update their cards with new information or delete them if they are no longer needed.
        </p>
        <p className="mb-4">
          Our platform ensures that all cards are displayed with high-quality images and details, making it easy for potential clients to view and contact the business owners.
        </p>
      </div>
    </div>
  )
}
