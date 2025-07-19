
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2 } from 'lucide-react'

interface TaskCardProps {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  onComplete: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export function TaskCard({
  id,
  title,
  description,
  category,
  completed,
  onComplete,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const handleCheckChange = (checked: boolean) => {
    onComplete(id, checked)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Personal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card className={`transition-all hover:shadow-md ${completed ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox
              checked={completed}
              onCheckedChange={handleCheckChange}
              className="mt-1"
            />
            <div className="flex-1">
              <CardTitle className={`text-lg ${completed ? 'line-through text-muted-foreground' : ''}`}>
                {title}
              </CardTitle>
              {description && (
                <CardDescription className={completed ? 'line-through' : ''}>
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getCategoryColor(category)}>
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(id)}
            disabled={completed}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
