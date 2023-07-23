import { faker } from "@faker-js/faker";

const getCollections = () => {
  const collections = [];
  for (let i = 0; i < 12; ++i) {
    collections.push({
      id: i,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    });
  }
  return collections;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-500 text-white p-4">Navbar Content</nav>

      <main className="flex items-stretch grow bg-red-200 p-4 h-1 overflow-y-auto">
        <div className="flex w-full bg-red-300 overflow-y-auto">
          <div className="flex flex-col space-y-5 w-full overflow-y-auto">
            {getCollections().map((item) => (
              <div key={item.id}>
                <div className="flex flex-col space-y-3 border-b">
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 p-2 text-center">
        <span className="text-sm">{`Made with <3 in Bangalore`}</span>
      </footer>
    </div>
  );
};

export default App;
