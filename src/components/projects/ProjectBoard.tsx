import { useState, memo, useMemo, useCallback } from 'react';
import { Plus, MoreVertical, Trash2, Edit2, Calendar, User, Tag, Clock, CheckCircle2, Circle, AlertCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../Footer';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
}

// Memoized Task Card Component
const TaskCard = memo(({ 
  task, 
  priorityColors, 
  index, 
  onClick,
  onDragStart
}: { 
  task: Task; 
  priorityColors: Record<string, string>; 
  index: number; 
  onClick: () => void;
  onDragStart: (task: Task) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, x: -100, scale: 0.8 }}
    transition={{ duration: 0.25, delay: index * 0.03 }}
    layout
    onClick={onClick}
    draggable
    onDragStart={() => onDragStart(task)}
    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all touch-manipulation"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-start justify-between mb-3">
      <h4 className="font-semibold text-gray-900 flex-1 text-sm md:text-base">{task.title}</h4>
      <span className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ml-2 ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
    </div>
    
    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{task.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-3">
      {task.tags.map(tag => (
        <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between text-xs text-gray-600 gap-2">
      <div className="flex items-center gap-1 min-w-0">
        <User className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">{task.assignee}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Calendar className="w-3 h-3" />
        <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  </motion.div>
));

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new marketing site',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Chen',
    dueDate: '2026-01-20',
    tags: ['Design', 'Marketing']
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication to the API',
    status: 'todo',
    priority: 'high',
    assignee: 'Mike Johnson',
    dueDate: '2026-01-22',
    tags: ['Backend', 'Security']
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with examples',
    status: 'review',
    priority: 'medium',
    assignee: 'Emily Davis',
    dueDate: '2026-01-18',
    tags: ['Documentation']
  },
  {
    id: '4',
    title: 'Fix mobile responsiveness',
    description: 'Ensure all pages work correctly on mobile devices',
    status: 'done',
    priority: 'medium',
    assignee: 'Alex Rivera',
    dueDate: '2026-01-15',
    tags: ['Frontend', 'Mobile']
  },
  {
    id: '5',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'todo',
    priority: 'low',
    assignee: 'Chris Lee',
    dueDate: '2026-01-25',
    tags: ['DevOps']
  }
];

export function ProjectBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [editMode, setEditMode] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'in-progress' | 'review' | 'done',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: '',
    dueDate: '',
    tags: [] as string[]
  });

  const columns = [
    { id: 'todo', title: 'To Do', icon: Circle, color: 'gray' },
    { id: 'in-progress', title: 'In Progress', icon: Clock, color: 'blue' },
    { id: 'review', title: 'Review', icon: AlertCircle, color: 'yellow' },
    { id: 'done', title: 'Done', icon: CheckCircle2, color: 'green' }
  ];

  const getIconColor = (color: string) => {
    switch(color) {
      case 'gray': return 'text-gray-600';
      case 'blue': return 'text-blue-600';
      case 'yellow': return 'text-yellow-600';
      case 'green': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    setShowNewTask(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  const handleDeleteAndClose = (id: string) => {
    handleDeleteTask(id);
    setSelectedTask(null);
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      setTasks(tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };

  const handleUpdateTask = () => {
    if (!selectedTask) return;
    setTasks(tasks.map(task =>
      task.id === selectedTask.id ? selectedTask : task
    ));
    setEditMode(false);
  };

  const startEditing = () => {
    setEditMode(true);
  };

  const getTasksByStatus = useCallback((status: Task['status']) => {
    let filtered = tasks.filter(task => task.status === status);
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }
    
    return filtered;
  }, [tasks, searchQuery, filterPriority]);

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }), [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" style={{ fontFamily: 'Sora, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">Project Dashboard</h1>
              <p className="text-gray-700 font-semibold text-sm md:text-base">Manage your tasks and track progress</p>
            </div>
            <button
              onClick={() => setShowNewTask(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap justify-center md:justify-start"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="flex-1 relative min-w-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-3 md:px-4 py-2 md:py-3 pl-10 md:pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 text-sm md:text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 text-sm md:text-base"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4 rounded-xl border border-slate-300">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs md:text-sm text-gray-700 font-semibold">Total Tasks</div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4 rounded-xl border border-slate-300">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.todo}</div>
              <div className="text-xs md:text-sm text-gray-700 font-semibold">To Do</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-xl border border-blue-300">
              <div className="text-xl md:text-2xl font-bold text-blue-700">{stats.inProgress}</div>
              <div className="text-xs md:text-sm text-blue-700 font-semibold">In Progress</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 md:p-4 rounded-xl border border-green-300">
              <div className="text-xl md:text-2xl font-bold text-green-700">{stats.done}</div>
              <div className="text-xs md:text-sm text-green-700 font-semibold">Completed</div>
            </div>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {columns.map(column => {
            const columnTasks = getTasksByStatus(column.id as Task['status']);
            const Icon = column.icon;
            
            return (
              <div 
                key={column.id} 
                className={`bg-white rounded-2xl p-3 md:p-4 shadow-sm transition-all ${
                  draggedTask && draggedTask.status !== column.id ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id as Task['status'])}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className={`${getIconColor(column.color)} flex-shrink-0`} />
                    <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">{column.title}</h3>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0">
                    {columnTasks.length}
                  </span>
                </div>

                <AnimatePresence mode="popLayout">
                  <div className="space-y-3">
                    {columnTasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        priorityColors={priorityColors}
                        index={index}
                        onClick={() => setSelectedTask(task)}
                        onDragStart={handleDragStart}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Task Modal */}
      <AnimatePresence>
        {showNewTask && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
            onClick={() => setShowNewTask(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl max-w-2xl w-full p-4 md:p-8 max-h-[90vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Create New Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 md:h-24 text-gray-900 text-sm md:text-base"
                  placeholder="Enter task description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'todo' | 'in-progress' | 'review' | 'done' })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Assignee</label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                    placeholder="Assign to..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewTask(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-gray-900 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all text-sm md:text-base"
                >
                  Create Task
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
            onClick={() => { setSelectedTask(null); setEditMode(false); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl max-w-2xl w-full p-4 md:p-8 max-h-[90vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
            <div className="flex items-start justify-between mb-4 md:mb-6 gap-2">
              <div className="flex-1 min-w-0">
                {editMode ? (
                  <input
                    type="text"
                    value={selectedTask.title}
                    onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    className="text-xl md:text-2xl font-bold mb-2 w-full px-2 md:px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                ) : (
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 break-words">{selectedTask.title}</h2>
                )}
                <span className={`px-3 py-1 rounded-lg text-xs md:text-sm font-semibold inline-block ${priorityColors[selectedTask.priority]}`}>
                  {selectedTask.priority} priority
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {editMode ? (
                  <>
                    <button
                      onClick={() => { handleUpdateTask(); }}
                      className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors touch-manipulation"
                      title="Save changes"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
                      title="Cancel"
                    >
                      <Circle className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={startEditing}
                    className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                    title="Edit task"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteAndClose(selectedTask.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                  title="Delete task"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Description</h3>
                {editMode ? (
                  <textarea
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 md:h-24 text-gray-900 text-sm md:text-base"
                  />
                ) : (
                  <p className="text-gray-700 text-sm md:text-base">{selectedTask.description}</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Priority</h3>
                {editMode ? (
                  <select
                    value={selectedTask.priority}
                    onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value as Task['priority'] })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold inline-block ${priorityColors[selectedTask.priority]}`}>
                    {selectedTask.priority}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Status</h3>
                <select
                  value={selectedTask.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as Task['status'];
                    setSelectedTask({ ...selectedTask, status: newStatus });
                    handleStatusChange(selectedTask.id, newStatus);
                  }}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-900 text-sm md:text-base">
                    <User className="w-4 h-4" />
                    Assignee
                  </h3>
                  {editMode ? (
                    <input
                      type="text"
                      value={selectedTask.assignee}
                      onChange={(e) => setSelectedTask({ ...selectedTask, assignee: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm md:text-base">{selectedTask.assignee}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-900 text-sm md:text-base">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </h3>
                  {editMode ? (
                    <input
                      type="date"
                      value={selectedTask.dueDate}
                      onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm md:text-base">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-900 text-sm md:text-base">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs md:text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}