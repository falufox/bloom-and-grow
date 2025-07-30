import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CheckCircle2, Circle, Calendar, Wrench, Thermometer, Droplets } from 'lucide-react';
import { clsx } from 'clsx';

interface PrepTask {
  id: string;
  task: string;
  description: string;
  completed: boolean;
  bedId: string;
  category: 'soil' | 'irrigation' | 'structure' | 'timing';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export const Prepping: React.FC = () => {
  const [tasks, setTasks] = useState<PrepTask[]>([
    {
      id: '1',
      task: 'Test soil pH',
      description: 'Check if soil pH is between 6.0-7.0 for optimal flower growth',
      completed: true,
      bedId: 'bed-1',
      category: 'soil',
      priority: 'high',
      estimatedTime: '30 min'
    },
    {
      id: '2',
      task: 'Add compost amendment',
      description: 'Mix 2-3 inches of compost into top 6 inches of soil',
      completed: false,
      bedId: 'bed-1',
      category: 'soil',
      priority: 'high',
      estimatedTime: '2 hours'
    },
    {
      id: '3',
      task: 'Install drip irrigation',
      description: 'Set up drip lines for consistent watering',
      completed: false,
      bedId: 'bed-1',
      category: 'irrigation',
      priority: 'medium',
      estimatedTime: '1 hour'
    },
    {
      id: '4',
      task: 'Check last frost date',
      description: 'Confirm planting timing for tender varieties',
      completed: false,
      bedId: 'bed-2',
      category: 'timing',
      priority: 'high',
      estimatedTime: '15 min'
    }
  ]);

  const [selectedBed, setSelectedBed] = useState<string>('all');

  const beds = [
    { id: 'bed-1', name: 'Bed 1 - Sunflowers & Zinnias', plantingDate: '2024-04-15' },
    { id: 'bed-2', name: 'Bed 2 - Cosmos', plantingDate: '2024-04-20' },
    { id: 'bed-3', name: 'Bed 3 - Dahlias', plantingDate: '2024-05-01' }
  ];

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = selectedBed === 'all' 
    ? tasks 
    : tasks.filter(task => task.bedId === selectedBed);

  const categoryIcons = {
    soil: Thermometer,
    irrigation: Droplets,
    structure: Wrench,
    timing: Calendar
  };

  const categoryColors = {
    soil: 'bg-amber-100 text-amber-700',
    irrigation: 'bg-blue-100 text-blue-700',
    structure: 'bg-green-100 text-green-700',
    timing: 'bg-purple-100 text-purple-700'
  };

  const priorityColors = {
    high: 'border-l-red-400',
    medium: 'border-l-yellow-400',
    low: 'border-l-green-400'
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Bed Preparation</h1>
        <p className="text-gray-600">Get your beds ready for optimal flower growth</p>
      </div>

      {/* Bed Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBed('all')}
              className={clsx(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                selectedBed === 'all'
                  ? 'bg-midnight-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              All Beds
            </button>
            {beds.map(bed => (
              <button
                key={bed.id}
                onClick={() => setSelectedBed(bed.id)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedBed === bed.id
                    ? 'bg-midnight-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {bed.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prep Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">
              {tasks.filter(t => t.completed).length}/{tasks.length}
            </div>
            <div className="text-gray-600">Tasks Completed</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-midnight-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">
              {tasks.filter(t => t.priority === 'high' && !t.completed).length}
            </div>
            <div className="text-gray-600">High Priority Tasks</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">
              {tasks.reduce((total, task) => {
                if (!task.completed) {
                  const time = parseFloat(task.estimatedTime);
                  return total + (isNaN(time) ? 0 : time);
                }
                return total;
              }, 0).toFixed(1)}h
            </div>
            <div className="text-gray-600">Estimated Time Left</div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Preparation Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map(task => {
              const CategoryIcon = categoryIcons[task.category];
              return (
                <div
                  key={task.id}
                  className={clsx(
                    'p-4 border-l-4 bg-white rounded-lg shadow-sm',
                    priorityColors[task.priority],
                    task.completed && 'opacity-60'
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={clsx(
                          'font-semibold text-midnight-blue',
                          task.completed && 'line-through'
                        )}>
                          {task.task}
                        </h3>
                        <span className={clsx(
                          'px-2 py-1 rounded-full text-xs font-medium flex items-center',
                          categoryColors[task.category]
                        )}>
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {task.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Bed: {beds.find(b => b.id === task.bedId)?.name}</span>
                          <span>Time: {task.estimatedTime}</span>
                          <span className={clsx(
                            'px-2 py-1 rounded text-xs font-medium',
                            task.priority === 'high' && 'bg-red-100 text-red-700',
                            task.priority === 'medium' && 'bg-yellow-100 text-yellow-700',
                            task.priority === 'low' && 'bg-green-100 text-green-700'
                          )}>
                            {task.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Preparation Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="w-5 h-5 mr-2" />
              Soil Preparation Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-champagne rounded-lg">
                <div className="font-medium text-midnight-blue mb-1">1. Test Your Soil</div>
                <div className="text-gray-600">Check pH, nutrients, and drainage before amending</div>
              </div>
              <div className="p-3 bg-champagne rounded-lg">
                <div className="font-medium text-midnight-blue mb-1">2. Add Organic Matter</div>
                <div className="text-gray-600">Mix in 2-3 inches of compost or well-aged manure</div>
              </div>
              <div className="p-3 bg-champagne rounded-lg">
                <div className="font-medium text-midnight-blue mb-1">3. Adjust pH if Needed</div>
                <div className="text-gray-600">Most flowers prefer slightly acidic to neutral soil (6.0-7.0)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Timing Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-champagne rounded-lg">
                <div className="font-medium text-midnight-blue mb-1">6-8 Weeks Before Planting</div>
                <div className="text-gray-600">Test soil, order amendments, plan layout</div>
              </div>
              <div className="p-3 bg-champagne rounded-lg">
                <div className="font-medium text-midnight-blue mb-1">2-4 Weeks Before Planting</div>
                <div className="text-gray-600">Add compost, install irrigation, prepare structures</div>
              </div>
              <div className="p-3 bg-champagne rounded-lg">
                <div className="font-medium text-midnight-blue mb-1">1 Week Before Planting</div>
                <div className="text-gray-600">Final soil prep, check weather, gather supplies</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};