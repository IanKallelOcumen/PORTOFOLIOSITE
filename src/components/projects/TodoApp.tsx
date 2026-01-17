import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { Plus, Trash2, Check, Circle, Filter, Search, Calendar, Tag, Bell, Repeat, Moon, Sun, MoreVertical, Edit2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '../Footer';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  dueDate?: string;
  category: string;
  tags: string[];
  recurring?: 'daily' | 'weekly' | 'monthly';
  notes?: string;
  subtasks?: { id: string; text: string; completed: boolean }[];
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos-advanced');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [darkMode, setDarkMode] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Personal');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'category'>('date');

  const categories = ['All', 'Personal', 'Work', 'Shopping', 'Health', 'Learning'];
  const allTags = Array.from(new Set(todos.flatMap(t => t.tags)));

  useEffect(() => {
    localStorage.setItem('todos-advanced', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      priority,
      createdAt: new Date(),
      dueDate: dueDate || undefined,
      category,
      tags,
      notes: notes || undefined,
      subtasks: []
    };

    setTodos([newTodo, ...todos]);
    resetForm();
  };

  const resetForm = () => {
    setInputValue('');
    setDueDate('');
    setTags([]);
    setNotes('');
    setShowAddModal(false);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
  };

  const addSubtask = (todoId: string, subtaskText: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        const subtasks = todo.subtasks || [];
        return {
          ...todo,
          subtasks: [...subtasks, { id: Date.now().toString(), text: subtaskText, completed: false }]
        };
      }
      return todo;
    }));
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId && todo.subtasks) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return todo;
    }));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      if (filter === 'overdue') return isOverdue(todo.dueDate) && !todo.completed;
      return true;
    })
    .filter(todo => selectedCategory === 'All' || todo.category === selectedCategory)
    .filter(todo => 
      todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    overdue: todos.filter(t => isOverdue(t.dueDate) && !t.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
  };

  const priorityColors = {
    low: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
    medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
    high: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
    urgent: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' }
  };

  const bgColor = darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  const cardBg = darkMode ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`} style={{ fontFamily: 'Sora, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${textColor}`}>TaskFlow Pro</h1>
            <p className={mutedColor}>Advanced task management with insights</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 ${cardBg} border rounded-xl hover:scale-105 transition-all`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-purple-500/50"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </motion.button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Circle, color: 'purple' },
            { label: 'Active', value: stats.active, icon: Clock, color: 'blue' },
            { label: 'Completed', value: stats.completed, icon: Check, color: 'green' },
            { label: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'red' },
            { label: 'Progress', value: `${stats.completionRate}%`, icon: TrendingUp, color: 'orange' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${cardBg} border rounded-2xl p-6`}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <div className={`text-3xl font-bold ${textColor} mb-1`}>{stat.value}</div>
              <div className={`text-sm ${mutedColor}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className={`${cardBg} border rounded-2xl p-6 mb-6`}>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedColor} w-5 h-5`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className={`px-4 py-3 ${darkMode ? 'bg-[#2a1a4a] border-purple-500/30 text-white' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer transition-all hover:border-purple-400`}
              style={darkMode ? { 
                colorScheme: 'dark',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a855f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              } : {}}
            >
              <option value="all" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>All Tasks</option>
              <option value="active" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Active</option>
              <option value="completed" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Completed</option>
              <option value="overdue" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Overdue</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-3 ${darkMode ? 'bg-[#2a1a4a] border-purple-500/30 text-white' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer transition-all hover:border-purple-400`}
              style={darkMode ? { 
                colorScheme: 'dark',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a855f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              } : {}}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className={`px-4 py-3 ${darkMode ? 'bg-[#2a1a4a] border-purple-500/30 text-white' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer transition-all hover:border-purple-400`}
              style={darkMode ? { 
                colorScheme: 'dark',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a855f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              } : {}}
            >
              <option value="date" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Sort by Date</option>
              <option value="priority" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Sort by Priority</option>
              <option value="category" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Sort by Category</option>
            </select>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${cardBg} border rounded-2xl p-12 text-center`}
              >
                <Calendar className={`w-16 h-16 ${mutedColor} mx-auto mb-4`} />
                <p className={mutedColor}>No tasks found. Start adding some!</p>
              </motion.div>
            ) : (
              filteredTodos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${cardBg} border rounded-2xl p-6 hover:border-purple-400/50 transition-all ${
                    todo.completed ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : `border-gray-400 hover:${priorityColors[todo.priority].border}`
                      }`}
                    >
                      {todo.completed && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through' : ''} ${textColor}`}>
                            {todo.text}
                          </h3>
                          {todo.notes && (
                            <p className={`text-sm ${mutedColor} mt-1`}>{todo.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${priorityColors[todo.priority].bg} ${priorityColors[todo.priority].text} border ${priorityColors[todo.priority].border}`}>
                            {todo.priority}
                          </span>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className={`p-2 ${mutedColor} hover:text-red-500 transition-colors`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className={`flex items-center gap-1.5 text-sm ${mutedColor}`}>
                          <Tag className="w-4 h-4" />
                          {todo.category}
                        </div>
                        {todo.dueDate && (
                          <div className={`flex items-center gap-1.5 text-sm ${
                            isOverdue(todo.dueDate) ? 'text-red-500' : mutedColor
                          }`}>
                            <Calendar className="w-4 h-4" />
                            {new Date(todo.dueDate).toLocaleDateString()}
                          </div>
                        )}
                        {todo.tags.length > 0 && (
                          <div className="flex gap-2">
                            {todo.tags.map((tag, i) => (
                              <span key={i} className={`px-2 py-1 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'} rounded text-xs`}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {todo.subtasks && todo.subtasks.length > 0 && (
                        <div className="space-y-2 mt-3 pt-3 border-t border-white/10">
                          {todo.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex items-center gap-2">
                              <button
                                onClick={() => toggleSubtask(todo.id, subtask.id)}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  subtask.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                                }`}
                              >
                                {subtask.completed && <Check className="w-3 h-3 text-white" />}
                              </button>
                              <span className={`text-sm ${subtask.completed ? 'line-through' : ''} ${mutedColor}`}>
                                {subtask.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {stats.completed > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={clearCompleted}
              className={`${mutedColor} hover:text-red-500 transition-colors text-sm font-medium`}
            >
              Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-200'} border rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8`}
            >
              <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${textColor}`}>Create New Task</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter task title..."
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    autoFocus
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add additional notes..."
                    rows={3}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as typeof priority)}
                      className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2a1a4a] border-purple-500/30 text-white' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer`}
                      style={darkMode ? { colorScheme: 'dark' } : {}}
                    >
                      <option value="low" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Low Priority</option>
                      <option value="medium" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Medium Priority</option>
                      <option value="high" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>High Priority</option>
                      <option value="urgent" className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2a1a4a] border-purple-500/30 text-white' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer`}
                      style={darkMode ? { colorScheme: 'dark' } : {}}
                    >
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat} className={darkMode ? 'bg-[#2a1a4a] text-white' : ''}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2a1a4a] border-purple-500/30 text-white' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    style={darkMode ? { colorScheme: 'dark' } : {}}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && tagInput.trim()) {
                          setTags([...tags, tagInput.trim()]);
                          setTagInput('');
                        }
                      }}
                      placeholder="Add tags (press Enter)"
                      className={`flex-1 px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300'} border rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span key={i} className={`px-3 py-1 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'} rounded-lg text-sm flex items-center gap-2`}>
                        #{tag}
                        <button onClick={() => setTags(tags.filter((_, idx) => idx !== i))}>
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={resetForm}
                    className={`flex-1 px-6 py-3 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-300'} border rounded-xl font-semibold hover:bg-white/20 transition-colors ${textColor}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTodo}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}