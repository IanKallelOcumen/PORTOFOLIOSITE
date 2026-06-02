import { motion } from 'motion/react';

export function SourcingDemo() {
  const suppliers = [
    { name: 'Shenzhen Tech', status: 'Verified' },
    { name: 'Manila Fab', status: 'Verified' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-black rounded-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-8">Global Suppliers</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-[#eee] text-left">
            <th className="p-4 font-semibold">Company</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <motion.tr
              key={supplier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-[#eee] hover:bg-gray-50 transition-colors"
            >
              <td className="p-4 font-semibold">{supplier.name}</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  {supplier.status}
                </span>
              </td>
              <td className="p-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Connect
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
