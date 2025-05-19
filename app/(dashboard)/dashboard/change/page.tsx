'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Pencil,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  MessageSquare,
  FileText,
  Gem,
 
  Diamond,
  Sparkles,
  BellRing,
} from 'lucide-react'
import { JSX, useState } from 'react'

// Define types
type Priority = 'High' | 'Critical' | 'Medium' | 'Low'
type Category = 'Engagement' | 'Repair' | 'Custom Design' | 'Appraisal'
type Status = 'pending' | 'approved' | 'rejected'

type Request = {
  id: number
  requester: string
  role: string
  priority: Priority
  category: Category
  description: string
  extra: string
  date: string
  estimate: string
  comments: number
}

const requests: Request[] = [
  {
    id: 1,
    requester: 'Emma Rodriguez',
    role: 'VIP Client • Platinum Tier',
    priority: 'High',
    category: 'Engagement',
    description:
      'Custom engagement ring design with 2.5 carat center diamond. Looking for a platinum setting with vintage-inspired details and side stones.',
    extra:
      'Reference: Family heirloom design from 1920s. Must accommodate existing wedding band. Budget up to $25,000. Need initial sketches by anniversary date.',
    date: '15 June 2025',
    estimate: '3 weeks',
    comments: 4,
  },
  {
    id: 2,
    requester: 'David Chen',
    role: 'Jewelry Repair • Regular Customer',
    priority: 'Critical',
    category: 'Repair',
    description:
      'Emergency repair needed for broken prongs on grandmother\'s diamond ring. One stone is loose and at risk of falling out. Sentimental value - must preserve original setting.',
    extra:
      'Ring is 18k yellow gold with 1.2 carat center stone. Previous repair work done in 2010. Need completed before wedding on June 20th.',
    date: '10 June 2025',
    estimate: '5 days',
    comments: 7,
  },
  {
    id: 3,
    requester: 'Sophia Patel',
    role: 'New Client • Anniversary Gift',
    priority: 'Medium',
    category: 'Custom Design',
    description:
      'Matching pendant and earrings set with sapphires and diamonds. Want something modern but timeless, coordinating with existing tennis bracelet.',
    extra:
      'Birthstones needed: September (sapphire) and April (diamond). Prefer white gold. Budget $8,000-$10,000. Open to designer suggestions.',
    date: '18 June 2025',
    estimate: '2 weeks',
    comments: 2,
  },
]

const categoryIcons: Record<Category, JSX.Element> = {
  'Engagement': <BellRing className="w-4 h-4 mr-2" />,
  'Repair': <Gem className="w-4 h-4 mr-2" />,
  'Custom Design': <Sparkles className="w-4 h-4 mr-2" />,
  'Appraisal': <Diamond className="w-4 h-4 mr-2" />,
}

const priorityColors: Record<Priority, string> = {
  High: 'text-rose-500',
  Critical: 'text-purple-500',
  Medium: 'text-amber-500',
  Low: 'text-sky-500',
}

export default function JewelryRequestCards() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [statuses, setStatuses] = useState<Record<number, Status>>(
    requests.reduce((acc, req) => ({ ...acc, [req.id]: 'pending' }), {})
  )

  const statusIcons: Record<Status, JSX.Element> = {
    pending: <Clock className="w-4 h-4 mr-1.5" />,
    approved: <CheckCircle className="w-4 h-4 mr-1.5" />,
    rejected: <XCircle className="w-4 h-4 mr-1.5" />,
  }

  const statusColors: Record<Status, string> = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    rejected: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {requests.map((req) => (
        <Card
          key={req.id}
          className="relative w-full bg-[#100327] border border-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden group"
          style={{
            borderImage: "linear-gradient(90deg, #FF005D 0%, #00D1FF 100%) 1",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <CardHeader className="pb-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-white">
                JR-{req.id.toString().padStart(3, '0')}
              </CardTitle>
              <Badge className={`${statusColors[statuses[req.id]]} text-xs px-3 py-1 rounded-full flex items-center`}>
                {statusIcons[statuses[req.id]]}
                {statuses[req.id].charAt(0).toUpperCase() + statuses[req.id].slice(1)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2 bg-gray-800 rounded-lg flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-white">{req.requester}</h3>
                <p className="text-sm text-gray-400">{req.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-5">
              <Badge variant="outline" className="bg-gray-800/50 border-gray-700 px-3 py-1 rounded-lg">
                <AlertCircle className={`w-4 h-4 mr-2 ${priorityColors[req.priority]}`} />
                <span className="text-gray-300">{req.priority} Priority</span>
              </Badge>
              <Badge variant="outline" className="bg-gray-800/50 border-gray-700 px-3 py-1 rounded-lg">
                {categoryIcons[req.category]}
                <span className="text-gray-300">{req.category}</span>
              </Badge>
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-400">Description</h4>
                <button
                  onClick={() => setExpanded(expanded === req.id ? null : req.id)}
                  className="text-xs flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  {expanded === req.id ? 'Show less' : 'Show more'}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${expanded === req.id ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <ScrollArea className={`${expanded === req.id ? 'h-40' : 'h-20'} pr-2 text-sm text-gray-300 font-light transition-all duration-200`}>
                <p>
                  {req.description}
                  {expanded === req.id && <><br /><br />{req.extra}</>}
                </p>
              </ScrollArea>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Due: {req.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300 px-3 py-1 rounded-lg">
                  Est: {req.estimate}
                </Badge>
                <button className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{req.comments}</span>
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap justify-between items-center gap-3 pt-0 pb-1">
            <div className="group-hover:flex hidden gap-2 flex-wrap transition-all duration-200">
              <Button
                variant="outline"
                className="border border-rose-500/50 bg-gray-900 hover:bg-rose-500/10 h-9 text-rose-500 transition-all min-w-[100px]"
                onClick={() => setStatuses((prev) => ({ ...prev, [req.id]: 'rejected' }))}
              >
                Reject
              </Button>
              <Button
                variant="outline"
                className="border border-emerald-500/50 bg-gray-900 hover:bg-emerald-500/10 h-9 text-emerald-500 transition-all min-w-[100px]"
                onClick={() => setStatuses((prev) => ({ ...prev, [req.id]: 'approved' }))}
              >
                Approve
              </Button>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-primary hover:bg-gray-800 h-9 w-9 p-0"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-primary hover:bg-gray-800 h-9 w-9 p-0"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}